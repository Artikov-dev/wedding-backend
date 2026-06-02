import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createReviewSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const body = await request.json();

    // Validate input
    const validationResult = createReviewSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { rating, comment, hallId, serviceProviderId } = validationResult.data;

    // Validate that either hallId or serviceProviderId is provided
    if (!hallId && !serviceProviderId) {
      return errorResponse(
        'Either hallId or serviceProviderId must be provided',
        400,
        'Validation error'
      );
    }

    // Check if hall/service provider exists
    if (hallId) {
      const hall = await prisma.hallProfile.findUnique({
        where: { id: hallId },
      });

      if (!hall) {
        return errorResponse('Hall not found', 404, 'Hall does not exist');
      }
    }

    if (serviceProviderId) {
      const serviceProvider = await prisma.serviceProvider.findUnique({
        where: { id: serviceProviderId },
      });

      if (!serviceProvider) {
        return errorResponse('Service provider not found', 404, 'Service provider does not exist');
      }
    }

    // Check if user has already reviewed
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        hallId: hallId || undefined,
        serviceProviderId: serviceProviderId || undefined,
      },
    });

    if (existingReview) {
      return errorResponse(
        'You have already reviewed this',
        409,
        'Duplicate review'
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId,
        hallId: hallId || null,
        serviceProviderId: serviceProviderId || null,
        rating,
        comment,
      },
    });

    // Update ratings for hall or service provider
    if (hallId) {
      const allReviews = await prisma.review.findMany({
        where: { hallId },
      });

      const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

      await prisma.hallProfile.update({
        where: { id: hallId },
        data: {
          ratings: averageRating,
          totalReviews: allReviews.length,
        },
      });

      // Create notification for hall owner
      const hall = await prisma.hallProfile.findUnique({
        where: { id: hallId },
      });

      if (hall) {
        await prisma.notification.create({
          data: {
            userId: hall.userId,
            type: 'REVIEW_POSTED',
            title: 'New Review',
            message: `${rating} star review posted for your hall`,
            relatedId: review.id,
          },
        });
      }
    }

    if (serviceProviderId) {
      const allReviews = await prisma.review.findMany({
        where: { serviceProviderId },
      });

      const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

      await prisma.serviceProvider.update({
        where: { id: serviceProviderId },
        data: {
          ratings: averageRating,
          totalReviews: allReviews.length,
        },
      });
    }

    return successResponse(review, 'Review posted successfully', 201);
  } catch (error) {
    return handleApiError(error, 'Failed to create review');
  }
}
