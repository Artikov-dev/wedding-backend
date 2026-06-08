import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        profileImage: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    if (!user) {
      return errorResponse('User not found', 404, 'Not found');
    }

    return successResponse(user, 'Profile retrieved successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve profile');
  }
}
