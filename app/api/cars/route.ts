/**
 * Car Management API
 * GET /api/cars - List all cars
 * POST /api/cars - Create new car (admin only)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { createCarSchema } from '@/lib/validations';

/**
 * GET - List all cars
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'AVAILABLE';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    const where: any = {};

    if (status && ['AVAILABLE', 'UNAVAILABLE', 'INACTIVE'].includes(status)) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { model: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.car.count({ where }),
    ]);

    return successResponse(
      {
        data: cars,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      'Cars retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST - Create new car (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    // Only admins can create cars
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can create cars');
    }

    const body = await request.json();
    const validationResult = createCarSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const car = await prisma.car.create({
      data: {
        ...validationResult.data,
        createdBy: userId,
      },
    });

    return successResponse(car, 'Car created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
