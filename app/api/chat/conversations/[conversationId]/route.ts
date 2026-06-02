import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { conversationId } = await params;

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50');

    const skip = (page - 1) * limit;

    // Verify user is participant
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || !conversation.participantIds.includes(userId)) {
      return errorResponse('Conversation not found or access denied', 404, 'Not found');
    }

    // Get messages
    const [messages, total] = await Promise.all([
      prisma.chatMessage.findMany({
        where: { conversationId },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImage: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'asc' },
      }),
      prisma.chatMessage.count({ where: { conversationId } }),
    ]);

    // Mark messages as read for current user
    await prisma.chatMessage.updateMany({
      where: {
        conversationId,
        senderId: { not: userId },
        isRead: false,
      },
      data: { isRead: true },
    });

    return successResponse(
      {
        messages,
        conversation,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Messages retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve messages');
  }
}
