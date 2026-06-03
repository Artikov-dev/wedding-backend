/**
 * Owner Assignment API
 * POST /api/admin/assign-owner - Assign owner to hall
 * DELETE /api/admin/assign-owner - Remove owner from hall
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { assignOwnerSchema } from '@/lib/validations';

/**
 * POST - Assign owner to hall
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    // Only ADMIN can assign owners
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can assign owners');
    }

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User not authenticated');
    }

    const body = await request.json();
    const validationResult = assignOwnerSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const { hallId, ownerId } = validationResult.data;

    // Check if hall exists
    const hall = await prisma.hallProfile.findUnique({
      where: { id: hallId },
    });

    if (!hall) {
      return errorResponse('Not found', 404, 'Hall not found');
    }

    // Check if owner exists and is a HALL_OWNER
    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!owner || owner.role !== 'HALL_OWNER') {
      return errorResponse('Bad request', 400, 'Invalid owner');
    }

    // Check if assignment already exists
    const existingAssignment = await prisma.hallOwner.findFirst({
      where: { hallId, ownerId },
    });

    if (existingAssignment) {
      return errorResponse(
        'Bad request',
        400,
        'Owner is already assigned to this hall'
      );
    }

    // Create assignment
    const assignment = await prisma.hallOwner.create({
      data: {
        hallId,
        ownerId,
        assignedBy: userId,
        assignedAt: new Date(),
      },
      include: {
        hall: {
          select: { id: true, name: true },
        },
        owner: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    return successResponse(assignment, 'Owner assigned successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE - Remove owner from hall
 */
export async function DELETE(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');

    // Only ADMIN can remove owners
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can remove owners');
    }

    const searchParams = request.nextUrl.searchParams;
    const hallId = searchParams.get('hallId');
    const ownerId = searchParams.get('ownerId');

    if (!hallId || !ownerId) {
      return errorResponse(
        'Bad request',
        400,
        'hallId and ownerId query parameters required'
      );
    }

    // Find and delete assignment
    const assignment = await prisma.hallOwner.findFirst({
      where: { hallId, ownerId },
    });

    if (!assignment) {
      return errorResponse('Not found', 404, 'Assignment not found');
    }

    await prisma.hallOwner.delete({
      where: { id: assignment.id },
    });

    return successResponse(null, 'Owner removed successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
