import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ hallId: string }> }
) {
  try {
    const { hallId } = await params;

    // Get hall with all details
    const hall = await prisma.hallProfile.findUnique({
      where: { id: hallId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
          },
        },
        amenities: true,
        services: true,
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
            favorites: true,
          },
        },
      },
    });

    if (!hall) {
      return errorResponse('Hall not found', 404, 'Not found');
    }

    return successResponse(hall, 'Hall retrieved successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve hall');
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ hallId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { hallId } = await params;

    // Verify ownership
    const hall = await prisma.hallProfile.findUnique({
      where: { id: hallId },
    });

    if (!hall || hall.userId !== userId) {
      return errorResponse('You do not have permission to update this hall', 403, 'Forbidden');
    }

    const body = await request.json();

    // Update hall
    const updatedHall = await prisma.hallProfile.update({
      where: { id: hallId },
      data: {
        ...body,
      },
      include: {
        amenities: true,
        services: true,
      },
    });

    return successResponse(updatedHall, 'Hall updated successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to update hall');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ hallId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { hallId } = await params;

    // Verify ownership
    const hall = await prisma.hallProfile.findUnique({
      where: { id: hallId },
    });

    if (!hall || hall.userId !== userId) {
      return errorResponse('You do not have permission to delete this hall', 403, 'Forbidden');
    }

    // Delete hall (cascades will delete related records)
    await prisma.hallProfile.delete({
      where: { id: hallId },
    });

    return successResponse(null, 'Hall deleted successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to delete hall');
  }
}
