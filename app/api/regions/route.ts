/**
 * Region Management API
 * GET /api/regions - List all regions
 * POST /api/regions - Create region (admin only)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { createRegionSchema } from '@/lib/validations';

/**
 * GET - List all regions
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (!includeInactive) {
      where.isActive = true;
    }

    const [regions, total] = await Promise.all([
      prisma.region.findMany({
        where,
        orderBy: { name: 'asc' },
        take: limit,
        skip,
      }),
      prisma.region.count({ where }),
    ]);

    return successResponse(
      {
        data: regions,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      'Regions retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST - Create new region
 */
export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');

    // Only admins can create regions
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can create regions');
    }

    const body = await request.json();
    const validationResult = createRegionSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const region = await prisma.region.create({
      data: {
        ...validationResult.data,
        isActive: true,
      },
    });

    return successResponse(region, 'Region created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
