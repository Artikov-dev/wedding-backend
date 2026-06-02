import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ hallId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { hallId } = await params;

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    // Delete favorite
    const favorite = await prisma.favorite.findFirst({
      where: {
        userId,
        hallId,
      },
    });

    if (!favorite) {
      return errorResponse('Favorite not found', 404, 'Not found');
    }

    await prisma.favorite.delete({
      where: { id: favorite.id },
    });

    return successResponse(null, 'Removed from favorites');
  } catch (error) {
    if (error instanceof Error && error.message.includes('NotFoundError')) {
      return errorResponse('Favorite not found', 404, 'Not found');
    }
    return handleApiError(error, 'Failed to remove favorite');
  }
}
