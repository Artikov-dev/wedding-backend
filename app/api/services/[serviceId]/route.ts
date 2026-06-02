import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { updateServiceProviderSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await params;

    const service = await prisma.serviceProvider.findUnique({
      where: { id: serviceId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            profileImage: true,
          },
        },
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
          },
        },
      },
    });

    if (!service) {
      return errorResponse('Service not found', 404, 'Not found');
    }

    return successResponse(service, 'Service retrieved successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve service');
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { serviceId } = await params;

    // Verify ownership
    const service = await prisma.serviceProvider.findUnique({
      where: { id: serviceId },
    });

    if (!service || service.userId !== userId) {
      return errorResponse('Permission denied', 403, 'Forbidden');
    }

    const body = await request.json();

    // Validate input
    const validationResult = updateServiceProviderSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    // Update service
    const updated = await prisma.serviceProvider.update({
      where: { id: serviceId },
      data: validationResult.data,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return successResponse(updated, 'Service updated successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to update service');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { serviceId } = await params;

    // Verify ownership
    const service = await prisma.serviceProvider.findUnique({
      where: { id: serviceId },
    });

    if (!service || service.userId !== userId) {
      return errorResponse('Permission denied', 403, 'Forbidden');
    }

    await prisma.serviceProvider.delete({
      where: { id: serviceId },
    });

    return successResponse(null, 'Service deleted successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to delete service');
  }
}
