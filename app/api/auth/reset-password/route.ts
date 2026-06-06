import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, verifyOTP } from '@/lib/auth';
import { resetPasswordSchema } from '@/lib/validations';
import { parseRequestBody, successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);

    const validationResult = resetPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { email, code, newPassword } = validationResult.data;

    // Resolve userId from email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return errorResponse('User not found', 404, 'User does not exist');
    }

    const isValid = await verifyOTP(user.id, code, 'password_reset');
    if (!isValid) {
      return errorResponse('Invalid or expired OTP', 401, 'OTP verification failed');
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await prisma.oTP.delete({ where: { userId: user.id } });

    return successResponse(
      { message: 'Password reset successfully' },
      'Password reset successful',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Failed to reset password');
  }
}
