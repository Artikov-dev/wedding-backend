import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createInvitationSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const body = await request.json();

    // Validate input
    const validationResult = createInvitationSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { bookingId, guestEmails, message, guestCount } = validationResult.data;

    // Verify booking exists and belongs to user
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { hall: true },
    });

    if (!booking || booking.userId !== userId) {
      return errorResponse(
        'Booking not found or permission denied',
        404,
        'Not found'
      );
    }

    // Create invitations
    const invitations = [];

    for (const email of guestEmails) {
      // Find user by email (or create if doesn't exist - optional flow)
      let invitedUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!invitedUser) {
        // For now, we'll create a pending invitation without a user
        // In production, you might handle this differently
        const invitation = {
          bookingId,
          guestEmail: email,
          invitedByUserId: userId,
          status: 'PENDING',
          guestCount: guestCount || 1,
          message,
        };
        invitations.push(invitation);
        continue;
      }

      // Create invitation for existing user
      const invitation = await prisma.invitation.create({
        data: {
          bookingId,
          userId: invitedUser.id,
          invitedByUserId: userId,
          guestCount: guestCount || 1,
          message,
        },
      });

      invitations.push(invitation);

      // Create notification for invited user
      await prisma.notification.create({
        data: {
          userId: invitedUser.id,
          type: 'INVITATION_RECEIVED',
          title: 'Wedding Invitation',
          message: `You have been invited to a wedding event: ${message || 'Join us for a celebration!'}`,
          relatedId: invitation.id,
        },
      });
    }

    return successResponse(
      {
        invitations,
        totalSent: guestEmails.length,
      },
      'Invitations sent successfully',
      201
    );
  } catch (error) {
    return handleApiError(error, 'Failed to send invitations');
  }
}
