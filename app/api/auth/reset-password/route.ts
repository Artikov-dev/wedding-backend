import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, verifyOTP } from '@/lib/auth';
import { resetPasswordSchema } from '@/lib/validations';
import { parseRequestBody, successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);

    // Validate input
    const validationResult = resetPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { userId, code, newPassword } = validationResult.data;

    // Verify OTP
    const isValid = await verifyOTP(userId, code, 'password_reset');
    if (!isValid) {
      return errorResponse('Invalid or expired OTP', 401, 'OTP verification failed');
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Delete OTP
    await prisma.oTP.delete({
      where: { userId },
    });

    return successResponse(
      { message: 'Password reset successfully' },
      'Password reset successful',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Failed to reset password');
  }
}
