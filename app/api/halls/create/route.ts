import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createHallSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId || userRole !== 'HALL_OWNER') {
      return errorResponse('Only hall owners can create halls', 403, 'Forbidden');
    }

    const body = await request.json();

    // Validate input
    const validationResult = createHallSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { name, description, category, capacity, pricePerPlate, advancePercentage, imageUrl, amenities } = validationResult.data;

    // Check if user already has a hall profile
    const existingHall = await prisma.hallProfile.findUnique({
      where: { userId },
    });

    if (existingHall) {
      return errorResponse('You already have a hall profile', 409, 'Hall already exists');
    }

    // Create hall
    const hall = await prisma.hallProfile.create({
      data: {
        userId,
        name,
        description,
        category: category || 'STANDARD',
        capacity,
        pricePerPlate,
        advancePercentage: advancePercentage || 25,
        imageUrl,
      },
    });

    // Add amenities if provided
    if (amenities && amenities.length > 0) {
      await prisma.hallAmenity.createMany({
        data: amenities.map(amenity => ({
          hallId: hall.id,
          name: amenity.name,
          description: amenity.description,
        })),
      });
    }

    return successResponse(
      hall,
      'Hall created successfully. Pending admin approval.',
      201
    );
  } catch (error) {
    return handleApiError(error, 'Failed to create hall');
  }
}
