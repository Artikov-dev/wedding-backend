import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    // Get favorites
    const [favorites, total] = await Promise.all([
      prisma.favorite.findMany({
        where: { userId },
        include: {
          hall: {
            include: {
              amenities: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.favorite.count({ where: { userId } }),
    ]);

    return successResponse(
      {
        favorites: favorites.map(fav => fav.hall),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Favorites retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve favorites');
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const body = await request.json();
    const { hallId } = body;

    if (!hallId) {
      return errorResponse('hallId is required', 400, 'Validation error');
    }

    // Verify hall exists
    const hall = await prisma.hallProfile.findUnique({
      where: { id: hallId },
    });

    if (!hall) {
      return errorResponse('Hall not found', 404, 'Hall does not exist');
    }

    // Check if already favorited
    const existing = await prisma.favorite.findFirst({
      where: {
        userId,
        hallId,
      },
    });

    if (existing) {
      return errorResponse('Already marked as favorite', 409, 'Already exists');
    }

    // Add to favorites
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        hallId,
      },
    });

    return successResponse(favorite, 'Added to favorites', 201);
  } catch (error) {
    return handleApiError(error, 'Failed to add favorite');
  }
}
