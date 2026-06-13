import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { query } from '@/lib/db';
import { updateBookingSchema, updateBookingStatusSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { logActivity } from '@/lib/logger';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

async function getBookingWithHall(bookingId: string) {
  const result = await query<any>(
    `SELECT b.*, h."userId" AS "hallOwnerId"
     FROM "Booking" b
     LEFT JOIN "HallProfile" h ON h.id = b."hallId"
     WHERE b.id = $1
     LIMIT 1`,
    [bookingId]
  );
  return result.rows[0] ?? null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');
    const { bookingId } = await params;

    if (!isValidUUID(bookingId)) {
      return errorResponse('Yaroqsiz Buyurtma ID formati (UUID kutilmoqda)', 400, 'Invalid ID format');
    }

    const bookingWithHall = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { hall: true }
    });

    if (!bookingWithHall) {
      return errorResponse('Booking not found', 404, 'Not found');
    }

    const isAdmin = userRole === 'ADMIN';
    const isOwner = userRole === 'HALL_OWNER' && bookingWithHall.hall?.userId === userId;
    const isCustomer = bookingWithHall.userId === userId;

    if (!isAdmin && !isOwner && !isCustomer) {
      return errorResponse('You do not have permission to view this booking', 403, 'Forbidden');
    }

    const fullBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    const hall = await query<any>(
      `SELECT id, name, "pricePerPlate", "imageUrl", capacity, category FROM "HallProfile" WHERE id = $1 LIMIT 1`,
      [bookingWithHall.hallId]
    );

    return successResponse(
      { ...fullBooking, hall: hall.rows[0] ?? null },
      'Booking retrieved successfully'
    );
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
    const userRole = request.headers.get('x-user-role');
    const { bookingId } = await params;

    if (!isValidUUID(bookingId)) {
      return errorResponse('Yaroqsiz Buyurtma ID formati (UUID kutilmoqda)', 400, 'Invalid ID format');
    }

    const bookingWithHall = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { hall: true }
    });

    if (!bookingWithHall) {
      return errorResponse('Booking not found', 404, 'Not found');
    }

    const isAdmin = userRole === 'ADMIN';
    const isHallOwner = userRole === 'HALL_OWNER' && bookingWithHall.hall?.userId === userId;
    const isBookingOwner = bookingWithHall.userId === userId;

    if (!isAdmin && !isHallOwner && !isBookingOwner) {
      return errorResponse('You do not have permission to update this booking', 403, 'Forbidden');
    }

    const body = await request.json();

    if (body.status !== undefined) {
      const statusResult = updateBookingStatusSchema.safeParse({ status: body.status });
      if (!statusResult.success) {
        return errorResponse(statusResult.error.errors[0].message, 400, 'Validation error');
      }

      // CUSTOMER can only cancel their own booking
      if (isBookingOwner && !isAdmin && !isHallOwner && statusResult.data.status !== 'CANCELLED') {
        return errorResponse('Customer can only cancel bookings', 403, 'Faqat bron egasi bekor qila oladi, tasdiqlash imkoni yoq');
      }

      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: statusResult.data.status },
      });

      if (userId) {
        await logActivity({
          userId,
          action: 'BOOKING_STATUS_CHANGED',
          targetId: bookingId,
          oldValue: { status: bookingWithHall.status },
          newValue: { status: updatedBooking.status }
        });
      }

      const hall = await query<any>(
        `SELECT id, name, "pricePerPlate", "imageUrl", capacity, category FROM "HallProfile" WHERE id = $1 LIMIT 1`,
        [bookingWithHall.hallId]
      );

      return successResponse(
        { ...updatedBooking, hall: hall.rows[0] ?? null },
        'Booking status updated successfully'
      );
    }

    const validationResult = updateBookingSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: validationResult.data,
    });

    if (userId) {
      await logActivity({
        userId,
        action: 'BOOKING_UPDATED',
        targetId: bookingId,
        oldValue: bookingWithHall,
        newValue: updatedBooking
      });
    }

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
    const userRole = request.headers.get('x-user-role');
    const { bookingId } = await params;

    if (!isValidUUID(bookingId)) {
      return errorResponse('Yaroqsiz Buyurtma ID formati (UUID kutilmoqda)', 400, 'Invalid ID format');
    }

    const bookingWithHall = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { hall: true }
    });

    if (!bookingWithHall) {
      return errorResponse('Booking not found', 404, 'Not found');
    }

    const isAdmin = userRole === 'ADMIN';
    const isBookingOwner = bookingWithHall.userId === userId;
    const isHallOwner = userRole === 'HALL_OWNER' && bookingWithHall.hall?.userId === userId;

    if (!isAdmin && !isBookingOwner && !isHallOwner) {
      return errorResponse('You do not have permission to delete this booking', 403, 'Forbidden');
    }

    const cancelledBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
    });

    if (userId) {
      await logActivity({
        userId,
        action: 'BOOKING_CANCELLED',
        targetId: bookingId,
        oldValue: { status: bookingWithHall.status },
        newValue: { status: 'CANCELLED' }
      });
    }

    return successResponse(cancelledBooking, 'Booking cancelled successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to cancel booking');
  }
}
