/**
 * Hall Approval - Approve API
 * PATCH /api/admin/hall-approvals/[id]/approve
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { approveHallRequestSchema } from '@/lib/validations';

/**
 * PATCH - Approve hall approval request
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    // Only ADMIN can approve
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can approve halls');
    }

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User not authenticated');
    }

    const body = await request.json();
    const validationResult = approveHallRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    // Get the approval request
    const approval = await prisma.hallApprovalRequest.findUnique({
      where: { id },
    });

    if (!approval) {
      return errorResponse('Not found', 404, 'Approval request not found');
    }

    if (approval.status !== 'PENDING') {
      return errorResponse(
        'Bad request',
        400,
        `Cannot approve a ${approval.status} request`
      );
    }

    // Update approval request and hall status
    const [updatedApproval, updatedHall] = await Promise.all([
      prisma.hallApprovalRequest.update({
        where: { id },
        data: {
          status: 'APPROVED',
          approvedBy: userId,
          approvedAt: new Date(),
          adminComment: validationResult.data.adminComment,
        },
        include: {
          hall: true,
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      prisma.hallProfile.update({
        where: { id: approval.hallId },
        data: { approvalStatus: 'APPROVED' },
      }),
    ]);

    return successResponse(updatedApproval, 'Hall approved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
