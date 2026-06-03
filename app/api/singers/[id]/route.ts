/**
 * Singer Detail API
 * GET /api/singers/[id] - Get specific singer
 * PUT /api/singers/[id] - Update singer (admin only)
 * DELETE /api/singers/[id] - Delete singer (admin only)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { updateSingerSchema } from '@/lib/validations';

/**
 * GET - Get specific singer
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const singer = await prisma.singer.findUnique({
      where: { id },
    });

    if (!singer) {
      return errorResponse('Not found', 404, 'Singer not found');
    }

    return successResponse(singer, 'Singer retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT - Update singer
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userRole = request.headers.get('x-user-role');

    // Only admins can update singers
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can update singers');
    }

    const body = await request.json();
    const validationResult = updateSingerSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const singer = await prisma.singer.findUnique({
      where: { id },
    });

    if (!singer) {
      return errorResponse('Not found', 404, 'Singer not found');
    }

    const updated = await prisma.singer.update({
      where: { id },
      data: {
        ...validationResult.data,
        updatedAt: new Date(),
      },
    });

    return successResponse(updated, 'Singer updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE - Delete singer
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userRole = request.headers.get('x-user-role');

    // Only admins can delete singers
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can delete singers');
    }

    const singer = await prisma.singer.findUnique({
      where: { id },
    });

    if (!singer) {
      return errorResponse('Not found', 404, 'Singer not found');
    }

    await prisma.singer.delete({
      where: { id },
    });

    return successResponse(null, 'Singer deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
