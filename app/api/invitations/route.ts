import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const status = request.nextUrl.searchParams.get('status');
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (status) where.status = status;

    // Get invitations
    const [invitations, total] = await Promise.all([
      prisma.invitation.findMany({
        where,
        include: {
          booking: {
            include: {
              hall: {
                select: {
                  name: true,
                  imageUrl: true,
                },
              },
            },
          },
          invitedBy: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.invitation.count({ where }),
    ]);

    return successResponse(
      {
        invitations,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Invitations retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve invitations');
  }
}
