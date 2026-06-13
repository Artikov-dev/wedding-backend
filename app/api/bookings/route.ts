import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { query } from '@/lib/db';
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
      limit: parseInt(searchParams.get('limit') || '20'),
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
    const targetUserId = searchParams.get('userId');

    if (userRole === 'ADMIN') {
      // Admin sees all bookings — no filter unless targetUserId is provided
      if (targetUserId) {
        where.userId = targetUserId;
      }
    } else if (userRole === 'CUSTOMER') {
      where.userId = userId;
    } else if (userRole === 'HALL_OWNER') {
      // Get hall IDs owned by this user, then filter bookings
      const ownerHalls = await query<{ id: string }>(
        `SELECT id FROM "HallProfile" WHERE "userId" = $1`,
        [userId]
      );
      const hallIds = ownerHalls.rows.map((h) => h.id);
      if (hallIds.length === 0) {
        return successResponse(
          { bookings: [], pagination: { page, limit, total: 0, pages: 0 } },
          'Bookings retrieved successfully'
        );
      }
      where.hallId = { in: hallIds };
    } else {
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
          hall: true,
          user: true,
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
