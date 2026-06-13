import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { hallSearchSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const queryParams = {
      city: searchParams.get('city') || undefined,
      capacity: searchParams.get('capacity') || undefined,
      minPrice: searchParams.get('minPrice') || undefined,
      maxPrice: searchParams.get('maxPrice') || undefined,
      category: searchParams.get('category') || undefined,
      rating: searchParams.get('rating') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      search: searchParams.get('search') || undefined,
      ownerId: searchParams.get('ownerId') || undefined,
      approvalStatus: searchParams.get('approvalStatus') || undefined,
    };

    // Validate input
    const validationResult = hallSearchSchema.safeParse(queryParams);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { search, city, capacity, minPrice, maxPrice, category, rating, ownerId, approvalStatus, page, limit } = validationResult.data;

    // Build where clause — owner/admin can filter by approvalStatus; public only sees APPROVED
    const where: any = {};

    if (ownerId) {
      where.userId = ownerId;
      // owner sees their own halls regardless of approval status
    } else {
      where.approvalStatus = approvalStatus || 'APPROVED';
      where.isActive = true;
    }

    if (search) where.name = { contains: search };
    if (city) where.city = { contains: city };
    if (category) where.category = category;
    if (capacity) where.capacity = { gte: capacity };
    if (minPrice) where.pricePerPlate = { gte: minPrice };
    if (maxPrice) {
      where.pricePerPlate = where.pricePerPlate ? { ...where.pricePerPlate, lte: maxPrice } : { lte: maxPrice };
    }
    if (rating) where.ratings = { gte: rating };

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get halls
    const [halls, total] = await Promise.all([
      prisma.hallProfile.findMany({
        where,
        include: {
          amenities: true,
          images: {
            orderBy: { displayOrder: 'asc' },
          },
          _count: {
            select: { bookings: true, reviews: true },
          },
        },
        skip,
        take: limit,
        orderBy: { ratings: 'desc' },
      }),
      prisma.hallProfile.count({ where }),
    ]);

    return successResponse(
      {
        halls,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Halls retrieved successfully',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Failed to search halls');
  }
}
