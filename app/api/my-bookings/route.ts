/**
 * My Bookings API
 * GET /api/my-bookings - Get current user's bookings
 * GET /api/my-bookings/[bookingId] - Get specific booking details
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

/**
 * GET - List customer's bookings
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User not authenticated');
    }

    // Only customers can view their bookings
    if (userRole !== 'CUSTOMER') {
      return errorResponse('Forbidden', 403, 'Only customers can view their bookings');
    }

    const searchParams = request.nextUrl.searchParams;
    const status = (searchParams.get('status') as any) || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where: any = {
      userId,
    };

    if (status) {
      where.status = status;
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          hall: true,
          payments: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.booking.count({ where }),
    ]);

    return successResponse(
      {
        bookings,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      'Your bookings retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}
