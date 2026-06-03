/**
 * Menu Management API
 * GET /api/menus - List all menus
 * POST /api/menus - Create new menu
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { createMenuSchema } from '@/lib/validations';

/**
 * GET - List all menus (public or filtered)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const hallId = searchParams.get('hallId');
    const status = searchParams.get('status') || 'ACTIVE';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where: any = {};

    if (hallId) {
      where.hallId = hallId;
    }

    if (status && ['ACTIVE', 'INACTIVE'].includes(status)) {
      where.status = status;
    }

    const [menus, total] = await Promise.all([
      prisma.menu.findMany({
        where,
        include: {
          hall: {
            select: { id: true, name: true },
          },
          items: {
            select: {
              id: true,
              itemName: true,
              description: true,
              category: true,
              isVegetarian: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.menu.count({ where }),
    ]);

    return successResponse(
      {
        data: menus,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      'Menus retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST - Create new menu
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User not authenticated');
    }

    const body = await request.json();
    const validationResult = createMenuSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const { hallId, items, ...menuData } = validationResult.data;

    // Check if hall exists and user is owner or admin
    const hall = await prisma.hallProfile.findUnique({
      where: { id: hallId },
    });

    if (!hall) {
      return errorResponse('Not found', 404, 'Hall not found');
    }

    if (userRole !== 'ADMIN' && hall.userId !== userId) {
      return errorResponse('Forbidden', 403, 'Only hall owner or admin can create menus');
    }

    // Create menu with items
    const menu = await prisma.menu.create({
      data: {
        ...menuData,
        hallId,
        items: items
          ? {
              createMany: {
                data: items.map((item) => ({
                  ...item,
                })),
              },
            }
          : undefined,
      },
      include: {
        hall: {
          select: { id: true, name: true },
        },
        items: true,
      },
    });

    return successResponse(menu, 'Menu created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
