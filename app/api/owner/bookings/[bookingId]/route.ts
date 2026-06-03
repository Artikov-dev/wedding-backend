/**
 * Owner Booking Detail API
 * GET /api/owner/bookings/[bookingId] - Get specific booking
 * PATCH /api/owner/bookings/[bookingId]/status - Update booking status
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { updateBookingStatusSchema } from '@/lib/validations';

/**
 * GET - Get specific booking for hall owner
 */
export async function GET(
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

    // Only hall owners can view
    if (!hasRole(userRole || '', ['HALL_OWNER'])) {
      return errorResponse('Forbidden', 403, 'Only hall owners can view bookings');
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        hall: {
          select: {
            id: true,
            name: true,
            description: true,
            capacity: true,
            pricePerPlate: true,
            imageUrl: true,
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
            serviceProvider: {
              select: {
                id: true,
                name: true,
                serviceType: true,
              },
            },
          },
        },
        payments: true,
        invitations: true,
      },
    });

    if (!booking) {
      return errorResponse('Not found', 404, 'Booking not found');
    }

    // Verify the hall belongs to the owner
    const hall = await prisma.hallProfile.findUnique({
      where: { id: booking.hallId },
    });

    if (hall?.userId !== userId) {
      return errorResponse('Forbidden', 403, 'Cannot view this booking');
    }

    return successResponse(booking, 'Booking retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
