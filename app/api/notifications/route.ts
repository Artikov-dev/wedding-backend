import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

const getUserIdFromRequest = (request: NextRequest): string | null => {
  let userId = request.headers.get('x-user-id');

  if (!userId) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (token) {
      const decoded = verifyToken(token);
      if (decoded?.userId) {
        userId = decoded.userId;
      }
    }
  }

  return userId;
};

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20');
    const isRead = request.nextUrl.searchParams.get('isRead');

    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (isRead !== null) {
      where.isRead = isRead === 'true';
    }

    // Get notifications
    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { userId, isRead: false } }),
    ]);

    return successResponse(
      {
        notifications,
        unreadCount,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Notifications retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve notifications');
  }
}
