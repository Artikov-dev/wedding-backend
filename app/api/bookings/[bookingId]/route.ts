import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { updateBookingSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { bookingId } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        hall: {
          include: {
            amenities: true,
            services: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        serviceBookings: {
          include: {
            serviceProvider: true,
          },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
        },
        invitations: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!booking) {
      return errorResponse('Booking not found', 404, 'Not found');
    }

    // Verify access
    if (booking.userId !== userId && booking.hall.userId !== userId) {
      return errorResponse('You do not have permission to view this booking', 403, 'Forbidden');
    }

    return successResponse(booking, 'Booking retrieved successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve booking');
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { bookingId } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { hall: true },
    });

    if (!booking) {
      return errorResponse('Booking not found', 404, 'Not found');
    }

    // Verify permission - only booking creator or hall owner can update
    if (booking.userId !== userId && booking.hall.userId !== userId) {
      return errorResponse('You do not have permission to update this booking', 403, 'Forbidden');
    }

    const body = await request.json();

    const validationResult = updateBookingSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: validationResult.data,
      include: {
        hall: true,
        user: true,
        serviceBookings: {
          include: {
            serviceProvider: true,
          },
        },
      },
    });

    return successResponse(updatedBooking, 'Booking updated successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to update booking');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { bookingId } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { hall: true },
    });

    if (!booking) {
      return errorResponse('Booking not found', 404, 'Not found');
    }

    // Verify permission
    if (booking.userId !== userId && booking.hall.userId !== userId) {
      return errorResponse('You do not have permission to delete this booking', 403, 'Forbidden');
    }

    // Cancel booking instead of deleting
    const cancelledBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
    });

    return successResponse(cancelledBooking, 'Booking cancelled successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to cancel booking');
  }
}
