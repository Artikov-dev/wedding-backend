import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createOTP } from '@/lib/auth';
import { forgotPasswordSchema } from '@/lib/validations';
import { sendOTPEmail } from '@/lib/email';
import { parseRequestBody, successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);

    const validationResult = forgotPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { email } = validationResult.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse('No account found with this email address', 404, 'Not found');
    }

    try {
      const otp = await createOTP(user.id, 'password_reset');
      await sendOTPEmail(email, otp, 'password_reset');
    } catch (emailError) {
      console.error('[FORGOT_PASSWORD] Email send failed:', emailError);
      return errorResponse('Failed to send OTP email. Please check your email address or try again later.', 400, 'Email error');
    }

    return successResponse(null, 'OTP has been sent to your email');
  } catch (error) {
    return handleApiError(error, 'Failed to process forgot password request');
  }
}
