/**
 * Owner Detail API
 * GET /api/owners/[id] - Get specific owner
 * PUT /api/owners/[id] - Update owner
 * DELETE /api/owners/[id] - Delete owner
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { updateOwnerSchema } from '@/lib/validations';

/**
 * GET - Get specific owner
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    // Admin can view any owner, owner can view themselves
    if (userRole !== 'ADMIN' && userId !== id) {
      return errorResponse('Forbidden', 403, 'Cannot view other users');
    }

    const owner = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!owner) {
      return errorResponse('Not found', 404, 'Owner not found');
    }

    return successResponse(owner, 'Owner retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT - Update owner
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    // Admin can update any owner, owner can update themselves
    if (userRole !== 'ADMIN' && userId !== id) {
      return errorResponse('Forbidden', 403, 'Cannot update other users');
    }

    const body = await request.json();
    const validationResult = updateOwnerSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const updatedOwner = await prisma.user.update({
      where: { id },
      data: validationResult.data,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    return successResponse(updatedOwner, 'Owner updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE - Delete owner
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userRole = request.headers.get('x-user-role');

    // Only ADMIN can delete owners
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can delete owners');
    }

    // Check if owner has halls
    const hallsCount = await prisma.hallProfile.count({
      where: { userId: id },
    });

    if (hallsCount > 0) {
      return errorResponse(
        'Bad request',
        400,
        'Cannot delete owner with existing halls'
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return successResponse(null, 'Owner deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
