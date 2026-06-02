import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createOTP } from '@/lib/auth';
import { forgotPasswordSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = forgotPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { email } = validationResult.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists
      return successResponse(
        { message: 'If this email exists, an OTP has been sent' },
        'Password reset OTP sent'
      );
    }

    // Create OTP
    const otp = await createOTP(user.id, 'password_reset');

    // TODO: Send OTP email
    console.log(`[Auth] Password reset OTP for ${email}: ${otp}`);

    return successResponse(
      { userId: user.id },
      'Password reset OTP sent to email',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Failed to process forgot password request');
  }
}
