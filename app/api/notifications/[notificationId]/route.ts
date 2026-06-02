import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { notificationId } = await params;

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    // Verify ownership
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      return errorResponse('Notification not found or permission denied', 404, 'Not found');
    }

    // Mark as read
    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    return successResponse(updated, 'Notification marked as read');
  } catch (error) {
    return handleApiError(error, 'Failed to update notification');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { notificationId } = await params;

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    // Verify ownership
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      return errorResponse('Notification not found or permission denied', 404, 'Not found');
    }

    await prisma.notification.delete({
      where: { id: notificationId },
    });

    return successResponse(null, 'Notification deleted');
  } catch (error) {
    return handleApiError(error, 'Failed to delete notification');
  }
}
