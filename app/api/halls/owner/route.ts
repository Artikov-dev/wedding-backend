import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    if (userRole !== 'HALL_OWNER' && userRole !== 'ADMIN') {
      return errorResponse('Forbidden', 403, 'Only hall owners can access this endpoint');
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (userRole === 'HALL_OWNER') {
      where.userId = userId;
    }

    const [halls, total] = await Promise.all([
      prisma.hallProfile.findMany({
        where,
        include: {
          amenities: true,
          services: true,
          _count: {
            select: {
              bookings: true,
              reviews: true,
              favorites: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.hallProfile.count({ where }),
    ]);

    return successResponse(
      {
        halls,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Owner halls retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve hall');
  }
}
