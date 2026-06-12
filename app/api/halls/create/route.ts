import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createHallSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId || (userRole !== 'HALL_OWNER' && userRole !== 'ADMIN')) {
      return errorResponse('Only hall owners or admins can create halls', 403, 'Forbidden');
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

    const { name, description, category, capacity, pricePerPlate, advancePercentage, city, address, phone, imageUrl, amenities } = validationResult.data;

    // Admin can create hall for any user via ownerId body param; owner uses own id
    const hallOwnerId = (userRole === 'ADMIN' && body.ownerId) ? body.ownerId : userId;

    // Create hall — admin-created halls are auto-approved (owners CAN have multiple halls)
    const hall = await prisma.hallProfile.create({
      data: {
        userId: hallOwnerId,
        name,
        description: description || '',
        category: category || 'STANDARD',
        capacity,
        pricePerPlate,
        advancePercentage: advancePercentage || 25,
        city: city || null,
        address: address || null,
        phone: phone || null,
        imageUrl: imageUrl || null,
        approvalStatus: userRole === 'ADMIN' ? 'APPROVED' : 'PENDING',
        isActive: true,
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
