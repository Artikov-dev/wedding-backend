import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { startConversationSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    // Get conversations where user is a participant
    const conversations = await prisma.conversation.findMany({
      where: {
        participantIds: {
          has: userId,
        },
      },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
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
        },
      },
      skip,
      take: limit,
      orderBy: { lastMessageAt: 'desc' },
    });

    const total = await prisma.conversation.count({
      where: {
        participantIds: {
          has: userId,
        },
      },
    });

    return successResponse(
      {
        conversations,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Conversations retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve conversations');
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const body = await request.json();

    // Validate input
    const validationResult = startConversationSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { participantIds } = validationResult.data;

    // Ensure current user is included
    const allParticipants = [...new Set([userId, ...participantIds])];

    // Check if conversation already exists
    const existing = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          equals: allParticipants.sort(),
        },
      },
    });

    if (existing) {
      return successResponse(existing, 'Conversation already exists');
    }

    // Create conversation
    const conversation = await prisma.conversation.create({
      data: {
        participantIds: allParticipants,
      },
    });

    return successResponse(conversation, 'Conversation created successfully', 201);
  } catch (error) {
    return handleApiError(error, 'Failed to create conversation');
  }
}
