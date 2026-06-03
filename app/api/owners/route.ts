/**
 * Owner Management API
 * GET /api/owners - List all owners (admin only)
 * POST /api/owners - Create new owner (admin only)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { createOwnerSchema } from '@/lib/validations';
import { hashPassword } from '@/lib/auth';

/**
 * GET - List all owners
 */
export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');

    // Only ADMIN can list owners
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can list owners');
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    const where: any = {
      role: 'HALL_OWNER',
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const [owners, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return successResponse(
      {
        data: owners,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      'Owners retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST - Create new owner
 */
export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');

    // Only ADMIN can create owners
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can create owners');
    }

    const body = await request.json();
    const validationResult = createOwnerSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const { email, phone, firstName, lastName } = validationResult.data;

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return errorResponse(
        'Bad request',
        400,
        'User with this email or phone already exists'
      );
    }

    // Create owner with random password (they should reset it)
    const tempPassword = Math.random().toString(36).slice(-12);
    const hashedPassword = await hashPassword(tempPassword);

    const newOwner = await prisma.user.create({
      data: {
        email,
        phone,
        firstName,
        lastName,
        password: hashedPassword,
        role: 'HALL_OWNER',
        status: 'ACTIVE',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return successResponse(newOwner, 'Owner created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
