/**
 * My Booking Detail API
 * GET /api/my-bookings/[bookingId] - Get specific booking details
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

/**
 * GET - Get specific booking details for current user
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

    // Only customers can view their bookings
    if (userRole !== 'CUSTOMER') {
      return errorResponse('Forbidden', 403, 'Only customers can view their bookings');
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
            user: {
              select: {
                id: true,
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
            serviceProvider: {
              select: {
                id: true,
                name: true,
                serviceType: true,
                pricing: true,
              },
            },
          },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            paymentMethod: true,
            createdAt: true,
          },
        },
        invitations: {
          select: {
            id: true,
            guestEmail: true,
            status: true,
            guestCount: true,
          },
        },
      },
    });

    if (!booking) {
      return errorResponse('Not found', 404, 'Booking not found');
    }

    // Verify ownership
    if (booking.userId !== userId) {
      return errorResponse('Forbidden', 403, 'Cannot view other users bookings');
    }

    return successResponse(booking, 'Booking details retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
