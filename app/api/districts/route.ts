/**
 * District Management API
 * GET /api/districts - List all districts
 * POST /api/districts - Create district (admin only)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { createDistrictSchema } from '@/lib/validations';

/**
 * GET - List all districts
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const regionId = searchParams.get('regionId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const skip = (page - 1) * limit;

    const where: any = {};

    if (regionId) {
      where.regionId = regionId;
    }

    if (!includeInactive) {
      where.isActive = true;
    }

    const [districts, total] = await Promise.all([
      prisma.district.findMany({
        where,
        include: {
          region: {
            select: { id: true, name: true },
          },
        },
        orderBy: { name: 'asc' },
        take: limit,
        skip,
      }),
      prisma.district.count({ where }),
    ]);

    return successResponse(
      {
        data: districts,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      'Districts retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST - Create new district
 */
export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');

    // Only admins can create districts
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can create districts');
    }

    const body = await request.json();
    const validationResult = createDistrictSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const { regionId } = validationResult.data;

    // Verify region exists
    const region = await prisma.region.findUnique({
      where: { id: regionId },
    });

    if (!region) {
      return errorResponse('Not found', 404, 'Region not found');
    }

    const district = await prisma.district.create({
      data: {
        ...validationResult.data,
        isActive: true,
      },
      include: {
        region: {
          select: { id: true, name: true },
        },
      },
    });

    return successResponse(district, 'District created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
