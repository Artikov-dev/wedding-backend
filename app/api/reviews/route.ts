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

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const hallId = searchParams.get('hallId') || undefined;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (userRole !== 'ADMIN') {
      where.userId = userId;
    }
    if (hallId) where.hallId = hallId;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          user: true,
          hall: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.review.count({ where }),
    ]);

    return successResponse(
      {
        reviews,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
      'Reviews retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve reviews');
  }
}
