import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createServiceProviderSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId || userRole !== 'SERVICE_PROVIDER') {
      return errorResponse('Only service providers can create services', 403, 'Forbidden');
    }

    const body = await request.json();

    // Validate input
    const validationResult = createServiceProviderSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { name, description, serviceType, pricing, imageUrl } = validationResult.data;

    // Check if service already exists for this user
    const existing = await prisma.serviceProvider.findFirst({
      where: { userId },
    });

    if (existing) {
      return errorResponse(
        'You already have a service profile',
        409,
        'Service already exists'
      );
    }

    // Create service provider
    const serviceProvider = await prisma.serviceProvider.create({
      data: {
        userId,
        name,
        description,
        serviceType,
        pricing,
        imageUrl,
      },
    });

    return successResponse(
      serviceProvider,
      'Service created successfully',
      201
    );
  } catch (error) {
    return handleApiError(error, 'Failed to create service');
  }
}

export async function GET(request: NextRequest) {
  try {
    const serviceType = request.nextUrl.searchParams.get('serviceType');
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    const minRating = request.nextUrl.searchParams.get('minRating');

    const skip = (page - 1) * limit;

    const where: any = { status: 'AVAILABLE' };
    if (serviceType) where.serviceType = serviceType;
    if (minRating) where.ratings = { gte: parseFloat(minRating) };

    // Get services
    const [services, total] = await Promise.all([
      prisma.serviceProvider.findMany({
        where,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              phone: true,
              email: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { ratings: 'desc' },
      }),
      prisma.serviceProvider.count({ where }),
    ]);

    return successResponse(
      {
        services,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Services retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve services');
  }
}
