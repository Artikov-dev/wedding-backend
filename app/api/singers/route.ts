/**
 * Singer Management API
 * GET /api/singers - List all singers
 * POST /api/singers - Create new singer (admin only)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { createSingerSchema } from '@/lib/validations';

/**
 * GET - List all singers
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
        { description: { contains: search } },
      ];
    }

    const [singers, total] = await Promise.all([
      prisma.singer.findMany({
        where,
        orderBy: { rating: 'desc' },
        take: limit,
        skip,
      }),
      prisma.singer.count({ where }),
    ]);

    return successResponse(
      {
        data: singers,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      'Singers retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST - Create new singer (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    // Only admins can create singers
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can create singers');
    }

    const body = await request.json();
    const validationResult = createSingerSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const singer = await prisma.singer.create({
      data: {
        ...validationResult.data,
        createdBy: userId,
      },
    });

    return successResponse(singer, 'Singer created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
