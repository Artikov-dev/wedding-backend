import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;

    // Build where clause based on user role
    const where: any = {};

    if (userRole === 'CUSTOMER') {
      where.userId = userId;
    } else if (userRole === 'HALL_OWNER') {
      where.booking = {
        hall: {
          userId,
        },
      };
    }

    if (status) {
      where.status = status;
    }

    // Get payments
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          booking: {
            include: {
              hall: {
                select: {
                  name: true,
                  pricePerPlate: true,
                },
              },
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          invoice: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.payment.count({ where }),
    ]);

    return successResponse(
      {
        payments,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Payments retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve payments');
  }
}
