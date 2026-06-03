import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyOTP } from '@/lib/auth';
import { verifyOtpSchema } from '@/lib/validations';
import { parseRequestBody, successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);

    // Validate input
    const validationResult = verifyOtpSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { userId, code, purpose } = validationResult.data;

    // Verify OTP
    const isValid = await verifyOTP(userId, code, purpose);
    if (!isValid) {
      return errorResponse('Invalid or expired OTP', 401, 'OTP verification failed');
    }

    // Update user based on purpose
    let updateData: any = {};
    if (purpose === 'email_verification') {
      updateData.isEmailVerified = true;
    } else if (purpose === 'phone_verification') {
      updateData.isPhoneVerified = true;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Delete OTP
    await prisma.oTP.delete({
      where: { userId },
    });

    return successResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
        },
      },
      'OTP verified successfully',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Failed to verify OTP');
  }
}
