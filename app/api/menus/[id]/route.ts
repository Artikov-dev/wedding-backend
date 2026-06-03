/**
 * Menu Detail API
 * GET /api/menus/[id] - Get specific menu
 * PUT /api/menus/[id] - Update menu
 * DELETE /api/menus/[id] - Delete menu
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { updateMenuSchema, addMenuItemSchema } from '@/lib/validations';

/**
 * GET - Get specific menu with items
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const menu = await prisma.menu.findUnique({
      where: { id },
      include: {
        hall: {
          select: { id: true, name: true },
        },
        items: true,
      },
    });

    if (!menu) {
      return errorResponse('Not found', 404, 'Menu not found');
    }

    return successResponse(menu, 'Menu retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT - Update menu
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User not authenticated');
    }

    const body = await request.json();
    const validationResult = updateMenuSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const menu = await prisma.menu.findUnique({
      where: { id },
    });

    if (!menu) {
      return errorResponse('Not found', 404, 'Menu not found');
    }

    // Check permission
    const hall = await prisma.hallProfile.findUnique({
      where: { id: menu.hallId },
    });

    if (userRole !== 'ADMIN' && hall?.userId !== userId) {
      return errorResponse('Forbidden', 403, 'Cannot update this menu');
    }

    const updated = await prisma.menu.update({
      where: { id },
      data: {
        ...validationResult.data,
        updatedAt: new Date(),
      },
      include: {
        hall: {
          select: { id: true, name: true },
        },
        items: true,
      },
    });

    return successResponse(updated, 'Menu updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE - Delete menu
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User not authenticated');
    }

    const menu = await prisma.menu.findUnique({
      where: { id },
    });

    if (!menu) {
      return errorResponse('Not found', 404, 'Menu not found');
    }

    // Check permission
    const hall = await prisma.hallProfile.findUnique({
      where: { id: menu.hallId },
    });

    if (userRole !== 'ADMIN' && hall?.userId !== userId) {
      return errorResponse('Forbidden', 403, 'Cannot delete this menu');
    }

    await prisma.menu.delete({
      where: { id },
    });

    return successResponse(null, 'Menu deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
