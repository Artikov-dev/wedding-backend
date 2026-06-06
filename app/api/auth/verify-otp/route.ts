import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyOTP } from '@/lib/auth';
import { verifyOtpSchema } from '@/lib/validations';
import { parseRequestBody, successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);

    const validationResult = verifyOtpSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { email, code, purpose } = validationResult.data;

    // Resolve userId from email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return errorResponse('User not found', 404, 'User does not exist');
    }

    // Default purpose for email verification flow
    const otpPurpose = purpose ?? 'email_verification';

    const isValid = await verifyOTP(user.id, code, otpPurpose);
    if (!isValid) {
      return errorResponse('Invalid or expired OTP', 401, 'OTP verification failed');
    }

    let updateData: any = {};
    if (otpPurpose === 'email_verification') {
      updateData.isEmailVerified = true;
    } else if (otpPurpose === 'phone_verification') {
      updateData.isPhoneVerified = true;
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    await prisma.oTP.delete({ where: { userId: user.id } });

    return successResponse(
      {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          isEmailVerified: updatedUser.isEmailVerified,
          isPhoneVerified: updatedUser.isPhoneVerified,
        },
      },
      'OTP verified successfully',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Failed to verify OTP');
  }
}
