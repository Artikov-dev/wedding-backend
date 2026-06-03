/**
 * Owner Booking Status Update API
 * PATCH /api/owner/bookings/[bookingId]/status - Update booking status
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { updateBookingStatusSchema } from '@/lib/validations';

/**
 * PATCH - Update booking status
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await params;
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User not authenticated');
    }

    // Only hall owners can update bookings
    if (!hasRole(userRole || '', ['HALL_OWNER'])) {
      return errorResponse('Forbidden', 403, 'Only hall owners can update bookings');
    }

    const body = await request.json();
    const validationResult = updateBookingStatusSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    // Get booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return errorResponse('Not found', 404, 'Booking not found');
    }

    // Verify ownership
    const hall = await prisma.hallProfile.findUnique({
      where: { id: booking.hallId },
    });

    if (hall?.userId !== userId) {
      return errorResponse('Forbidden', 403, 'Cannot update this booking');
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: validationResult.data.status,
        updatedAt: new Date(),
      },
      include: {
        hall: {
          select: { id: true, name: true },
        },
        user: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    return successResponse(updatedBooking, 'Booking status updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
