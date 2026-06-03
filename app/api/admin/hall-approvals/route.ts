/**
 * Hall Approvals Management API
 * GET /api/admin/hall-approvals - List all hall approval requests
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';

/**
 * GET - List all hall approval requests
 * @query status - Filter by status (PENDING, APPROVED, REJECTED, REVISION_REQUESTED)
 * @query page - Pagination page
 * @query limit - Items per page
 */
export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');

    // Only ADMIN can view all approvals
    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can view approval requests');
    }

    const searchParams = request.nextUrl.searchParams;
    const status = (searchParams.get('status') as any) || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build where clause
    const where: any = {};
    if (status) where.status = status;

    const skip = (page - 1) * limit;

    // Get approvals with hall and owner details
    const [approvals, total] = await Promise.all([
      prisma.hallApprovalRequest.findMany({
        where,
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
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.hallApprovalRequest.count({ where }),
    ]);

    return successResponse(
      {
        data: approvals,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      'Hall approvals retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}
