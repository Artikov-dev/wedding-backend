import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { sendMessageSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const body = await request.json();

    // Validate input
    const validationResult = sendMessageSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { conversationId, content } = validationResult.data;

    // Verify conversation exists and user is participant
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || !conversation.participantIds.includes(userId)) {
      return errorResponse('Conversation not found or access denied', 404, 'Not found');
    }

    // Create message
    const message = await prisma.chatMessage.create({
      data: {
        conversationId,
        senderId: userId,
        content,
      },
    });

    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
      },
    });

    const sender = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        firstName: true,
      },
    });

    // Create notification for other participants
    const otherParticipants = conversation.participantIds.filter((id: string) => id !== userId);
    await Promise.all(
      otherParticipants.map((participantId: string) =>
        prisma.notification.create({
          data: {
            userId: participantId,
            type: 'MESSAGE_RECEIVED',
            title: 'New Message',
            message: `You have a new message from ${sender?.firstName || 'Someone'}`,
            relatedId: message.id,
          },
        })
      )
    );

    return successResponse(message, 'Message sent successfully', 201);
  } catch (error) {
    return handleApiError(error, 'Failed to send message');
  }
}
