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

    const userRole = request.headers.get('x-user-role');
    const isAdmin = userRole === 'ADMIN';

    if (!booking || (!isAdmin && booking.userId !== userId)) {
      return errorResponse(
        'Booking not found or permission denied',
        404,
        'Not found'
      );
    }

    // Create invitations
    const invitations = [];

    for (const email of guestEmails) {
      const invitedUser = await prisma.user.findUnique({ where: { email } });

      // Always save to DB — use guestEmail for unregistered guests
      const invitation = await prisma.invitation.create({
        data: {
          bookingId,
          userId: invitedUser?.id ?? null,
          invitedByUserId: userId,
          guestEmail: email,
          guestCount: guestCount || 1,
          message,
        },
      });

      invitations.push(invitation);

      if (invitedUser) {
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
