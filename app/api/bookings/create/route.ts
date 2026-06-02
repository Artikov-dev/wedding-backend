import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createBookingSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

function generateBookingNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `BK${timestamp}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const body = await request.json();

    // Validate input
    const validationResult = createBookingSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { hallId, eventDate, eventTime, numberOfGuests, notes, services } = validationResult.data;

    // Verify hall exists and is approved
    const hall = await prisma.hallProfile.findUnique({
      where: { id: hallId },
    });

    if (!hall) {
      return errorResponse('Hall not found', 404, 'Hall does not exist');
    }

    if (hall.approvalStatus !== 'APPROVED') {
      return errorResponse('This hall is not approved for bookings', 403, 'Hall not available');
    }

    // Check capacity
    if (numberOfGuests > hall.capacity) {
      return errorResponse(
        `Hall capacity is ${hall.capacity}, but you requested ${numberOfGuests} guests`,
        400,
        'Exceeds capacity'
      );
    }

    // Check for conflicting bookings
    const eventDateTime = new Date(eventDate);
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        hallId,
        eventDate: {
          equals: eventDateTime,
        },
        status: {
          notIn: ['CANCELLED'],
        },
      },
    });

    if (conflictingBooking) {
      return errorResponse(
        'This hall is already booked for the selected date',
        409,
        'Date not available'
      );
    }

    // Calculate amounts
    const totalAmount = numberOfGuests * hall.pricePerPlate;
    const advanceAmount = totalAmount * (hall.advancePercentage / 100);
    const finalAmount = totalAmount - advanceAmount;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        hallId,
        userId,
        eventDate: eventDateTime,
        eventTime,
        numberOfGuests,
        notes,
        totalAmount,
        advanceAmount,
        finalAmount,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
    });

    // Add services if provided
    if (services && services.length > 0) {
      for (const service of services) {
        const serviceProvider = await prisma.serviceProvider.findUnique({
          where: { id: service.serviceProviderId },
        });

        if (serviceProvider) {
          await prisma.serviceBooking.create({
            data: {
              bookingId: booking.id,
              serviceProviderId: service.serviceProviderId,
              quantity: service.quantity || 1,
              price: serviceProvider.pricing * (service.quantity || 1),
            },
          });
        }
      }
    }

    // Create notification for hall owner
    await prisma.notification.create({
      data: {
        userId: hall.userId,
        type: 'BOOKING_CONFIRMED',
        title: 'New Booking Request',
        message: `New booking request for ${new Date(eventDate).toLocaleDateString()} from ${hall.pricePerPlate * numberOfGuests}`,
        relatedId: booking.id,
      },
    });

    return successResponse(
      booking,
      'Booking created successfully. Please complete the advance payment to confirm.',
      201
    );
  } catch (error) {
    return handleApiError(error, 'Failed to create booking');
  }
}
