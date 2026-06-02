import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyRefreshToken, generateToken, generateRefreshToken } from '@/lib/auth';
import { refreshTokenSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = refreshTokenSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { refreshToken } = validationResult.data;

    // Verify refresh token
    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) {
      return errorResponse('Invalid refresh token', 401, 'Token expired');
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.status !== 'ACTIVE') {
      return errorResponse('User not found or inactive', 401, 'Invalid user');
    }

    // Generate new tokens
    const newToken = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const newRefreshToken = await generateRefreshToken(user.id);

    return successResponse(
      {
        token: newToken,
        refreshToken: newRefreshToken,
      },
      'Token refreshed successfully',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Failed to refresh token');
  }
}
