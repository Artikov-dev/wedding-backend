/**
 * Car Detail API
 * GET /api/cars/[id] - Get specific car
 * PUT /api/cars/[id] - Update car (admin only)
 * DELETE /api/cars/[id] - Delete car (admin only)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { updateCarSchema } from '@/lib/validations';

/**
 * GET - Get specific car
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      return errorResponse('Not found', 404, 'Car not found');
    }

    return successResponse(car, 'Car retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT - Update car
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userRole = request.headers.get('x-user-role');

    // Only admins can update cars
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can update cars');
    }

    const body = await request.json();
    const validationResult = updateCarSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      return errorResponse('Not found', 404, 'Car not found');
    }

    const updated = await prisma.car.update({
      where: { id },
      data: {
        ...validationResult.data,
        updatedAt: new Date(),
      },
    });

    return successResponse(updated, 'Car updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE - Delete car
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userRole = request.headers.get('x-user-role');

    // Only admins can delete cars
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can delete cars');
    }

    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      return errorResponse('Not found', 404, 'Car not found');
    }

    await prisma.car.delete({
      where: { id },
    });

    return successResponse(null, 'Car deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
