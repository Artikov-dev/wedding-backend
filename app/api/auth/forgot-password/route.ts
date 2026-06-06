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

    // SECURITY: Always return the same response to prevent email enumeration
    const genericResponse = successResponse(
      { message: 'If this email exists, an OTP has been sent' },
      'Password reset OTP sent'
    );

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return genericResponse;
    }

    // Create OTP and send email
    const otp = await createOTP(user.id, 'password_reset');
    await sendOTPEmail(email, otp, 'password_reset');

    // Return identical response — do NOT leak userId
    return genericResponse;
  } catch (error) {
    return handleApiError(error, 'Failed to process forgot password request');
  }
}
