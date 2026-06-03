/**
 * Hall Approval - Reject API
 * PATCH /api/admin/hall-approvals/[id]/reject
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { rejectHallRequestSchema } from '@/lib/validations';

/**
 * PATCH - Reject hall approval request
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    // Only ADMIN can reject
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can reject halls');
    }

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User not authenticated');
    }

    const body = await request.json();
    const validationResult = rejectHallRequestSchema.safeParse(body);

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
        `Cannot reject a ${approval.status} request`
      );
    }

    // Update approval request and hall status
    const [updatedApproval, updatedHall] = await Promise.all([
      prisma.hallApprovalRequest.update({
        where: { id },
        data: {
          status: 'REJECTED',
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
        data: { approvalStatus: 'REJECTED' },
      }),
    ]);

    return successResponse(updatedApproval, 'Hall rejected successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
