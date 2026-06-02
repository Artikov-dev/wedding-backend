import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { updateInvitationStatusSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ invitationId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { invitationId } = await params;

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const body = await request.json();

    // Validate input
    const validationResult = updateInvitationStatusSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { status } = validationResult.data;

    // Get invitation
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
      include: { booking: true },
    });

    if (!invitation || invitation.userId !== userId) {
      return errorResponse(
        'Invitation not found or permission denied',
        404,
        'Not found'
      );
    }

    // Update invitation
    const updated = await prisma.invitation.update({
      where: { id: invitationId },
      data: { status },
      include: {
        booking: {
          include: {
            hall: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        invitedBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Create notification for inviter
    await prisma.notification.create({
      data: {
        userId: updated.invitedByUserId,
        type: 'INVITATION_RECEIVED',
        title: `Invitation ${status}`,
        message: `${updated.user?.firstName} has ${status.toLowerCase()} your wedding invitation`,
        relatedId: invitationId,
      },
    });

    return successResponse(updated, `Invitation ${status.toLowerCase()} successfully`);
  } catch (error) {
    return handleApiError(error, 'Failed to update invitation');
  }
}
