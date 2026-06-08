import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const adminRole = request.headers.get('x-user-role');
    if (adminRole !== 'ADMIN') {
      return errorResponse('Forbidden', 403, 'Admins only');
    }

    const { userId: targetId } = await params;

    const user = await prisma.user.findUnique({
      where: { id: targetId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        profileImage: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return errorResponse('User not found', 404, 'Not found');
    }

    // If hall owner — attach hall info
    let hallProfile = null;
    if (user.role === 'HALL_OWNER') {
      hallProfile = await prisma.hallProfile.findUnique({
        where: { userId: targetId },
        select: {
          id: true,
          name: true,
          capacity: true,
          pricePerPlate: true,
          approvalStatus: true,
          ratings: true,
          totalReviews: true,
          createdAt: true,
        },
      });
    }

    return successResponse({ ...user, hallProfile }, 'User retrieved successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve user');
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const adminRole = request.headers.get('x-user-role');
    if (adminRole !== 'ADMIN') {
      return errorResponse('Forbidden', 403, 'Admins only');
    }

    const { userId: targetId } = await params;
    const body = await request.json();

    const existing = await prisma.user.findUnique({ where: { id: targetId } });
    if (!existing) {
      return errorResponse('User not found', 404, 'Not found');
    }

    const allowedFields = ['firstName', 'lastName', 'phone', 'role', 'status'];
    const updateData: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return errorResponse('No valid fields to update', 400, 'Validation error');
    }

    const updated = await prisma.user.update({
      where: { id: targetId },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    return successResponse(updated, 'User updated successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to update user');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const adminId = request.headers.get('x-user-id');
    const adminRole = request.headers.get('x-user-role');
    if (adminRole !== 'ADMIN') {
      return errorResponse('Forbidden', 403, 'Admins only');
    }

    const { userId: targetId } = await params;

    if (targetId === adminId) {
      return errorResponse('Cannot delete your own account', 400, 'Bad request');
    }

    const existing = await prisma.user.findUnique({ where: { id: targetId } });
    if (!existing) {
      return errorResponse('User not found', 404, 'Not found');
    }

    await prisma.user.delete({ where: { id: targetId } });

    return successResponse(null, 'User deleted successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to delete user');
  }
}
