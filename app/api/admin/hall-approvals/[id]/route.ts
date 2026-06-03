/**
 * Hall Approval Detail API
 * GET /api/admin/hall-approvals/[id] - Get specific approval request
 * PATCH /api/admin/hall-approvals/[id]/approve - Approve a hall
 * PATCH /api/admin/hall-approvals/[id]/reject - Reject a hall
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';

/**
 * GET - Get specific hall approval request
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userRole = request.headers.get('x-user-role');

    // Only ADMIN can view approvals
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can view approval requests');
    }

    const approval = await prisma.hallApprovalRequest.findUnique({
      where: { id },
      include: {
        hall: {
          select: {
            id: true,
            name: true,
            description: true,
            capacity: true,
            pricePerPlate: true,
            imageUrl: true,
            approvalStatus: true,
            amenities: {
              select: { id: true, name: true, description: true },
            },
          },
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        approvedByUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!approval) {
      return errorResponse('Not found', 404, 'Approval request not found');
    }

    return successResponse(approval, 'Approval request retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
