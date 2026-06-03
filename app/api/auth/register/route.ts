import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, generateToken, generateRefreshToken, createOTP } from '@/lib/auth';
import { registerSchema } from '@/lib/validations';
import { parseRequestBody, successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);

    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { email, phone, password, firstName, lastName, role } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return errorResponse(
        'Email or phone already registered',
        409,
        'User already exists'
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        firstName,
        lastName,
        role: (role as any) || 'CUSTOMER',
      },
    });

    // Generate OTP for email verification
    const otp = await createOTP(user.id, 'email_verification');

    // Generate tokens
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = await generateRefreshToken(user.id);

    // TODO: Send OTP email
    console.log(`[Auth] OTP for ${email}: ${otp}`);

    return successResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
        refreshToken,
      },
      'User registered successfully',
      201
    );
  } catch (error) {
    return handleApiError(error, 'Failed to register user');
  }
}
