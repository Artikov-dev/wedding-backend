import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { bookingFilterSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const searchParams = request.nextUrl.searchParams;

    const queryParams = {
      status: (searchParams.get('status') as any) || undefined,
      paymentStatus: (searchParams.get('paymentStatus') as any) || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    };

    // Validate input
    const validationResult = bookingFilterSchema.safeParse(queryParams);
    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation error'
      );
    }

    const { status, paymentStatus, startDate, endDate, page, limit } = validationResult.data;

    // Build where clause based on user role
    const where: any = {};

    if (userRole === 'ADMIN') {
      // Admin sees all bookings — no filter
    } else if (userRole === 'CUSTOMER') {
      where.userId = userId;
    } else if (userRole === 'HALL_OWNER') {
      where.hall = { userId };
    } else {
      // Default: user sees own bookings
      where.userId = userId;
    }

    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    if (startDate || endDate) {
      where.eventDate = {};
      if (startDate) where.eventDate.gte = startDate;
      if (endDate) where.eventDate.lte = endDate;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get bookings
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          hall: {
            select: {
              id: true,
              name: true,
              pricePerPlate: true,
              imageUrl: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  phone: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          serviceBookings: {
            include: {
              serviceProvider: {
                select: {
                  id: true,
                  name: true,
                  serviceType: true,
                  pricing: true,
                },
              },
            },
          },
          payments: {
            select: {
              id: true,
              amount: true,
              status: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
          },
        },
        skip,
        take: limit,
        orderBy: { eventDate: 'desc' },
      }),
      prisma.booking.count({ where }),
    ]);

    return successResponse(
      {
        bookings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Bookings retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve bookings');
  }
}
