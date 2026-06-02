import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { addHallAmenitySchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ hallId: string }> }
) {
  try {
    const { hallId } = await params;

    const amenities = await prisma.hallAmenity.findMany({
      where: { hallId },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(amenities, 'Amenities retrieved successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve amenities');
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ hallId: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { hallId } = await params;

    // Verify ownership
    const hall = await prisma.hallProfile.findUnique({
      where: { id: hallId },
    });

    if (!hall || hall.userId !== userId) {
      return errorResponse('You do not have permission to add amenities to this hall', 403, 'Forbidden');
    }

    const body = await request.json();

    // Validate input
    const validationResult = addHallAmenitySchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { name, description } = validationResult.data;

    // Create amenity
    const amenity = await prisma.hallAmenity.create({
      data: {
        hallId,
        name,
        description,
      },
    });

    return successResponse(amenity, 'Amenity added successfully', 201);
  } catch (error) {
    return handleApiError(error, 'Failed to add amenity');
  }
}
