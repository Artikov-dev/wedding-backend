/**
 * Owner Bookings API
 * GET /api/owner/bookings - Get all bookings for owner's halls
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';

/**
 * GET - List all bookings for hall owner's halls
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User not authenticated');
    }

    // Only hall owners can view their bookings
    if (!hasRole(userRole || '', ['HALL_OWNER'])) {
      return errorResponse('Forbidden', 403, 'Only hall owners can view their bookings');
    }

    const searchParams = request.nextUrl.searchParams;
    const hallId = searchParams.get('hallId');
    const status = (searchParams.get('status') as any) || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    // Get owner's halls first
    const ownerHalls = await prisma.hallProfile.findMany({
      where: { userId },
      select: { id: true },
    });

    const hallIds = ownerHalls.map((h) => h.id);

    if (hallIds.length === 0) {
      return successResponse(
        {
          data: [],
          pagination: {
            total: 0,
            page,
            limit,
            pages: 0,
          },
        },
        'No bookings found'
      );
    }

    const where: any = {
      hallId: {
        in: hallIds,
      },
    };

    if (hallId) {
      // If specific hall requested, verify ownership
      const targetHall = ownerHalls.find((h) => h.id === hallId);
      if (!targetHall) {
        return errorResponse('Forbidden', 403, 'Hall not found or you do not own it');
      }
      where.hallId = hallId;
    }

    if (status) {
      where.status = status;
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          hall: {
            select: {
              id: true,
              name: true,
              pricePerPlate: true,
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
          payments: {
            select: {
              id: true,
              amount: true,
              status: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.booking.count({ where }),
    ]);

    return successResponse(
      {
        data: bookings,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      'Your hall bookings retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}
