/**
 * Hall Calendar Management API
 * GET /api/halls/[hallId]/calendar - Get hall calendar
 * POST /api/halls/[hallId]/calendar - Add calendar entry
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { addCalendarSchema, paginationSchema } from '@/lib/validations';

/**
 * GET - Get hall calendar entries
 * @query startDate - Filter from date
 * @query endDate - Filter to date
 * @query page - Pagination
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ hallId: string }> }
) {
  try {
    const { hallId } = await params;

    // Check if hall exists
    const hall = await prisma.hallProfile.findUnique({
      where: { id: hallId },
    });

    if (!hall) {
      return errorResponse('Not found', 404, 'Hall not found');
    }

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '30');

    const skip = (page - 1) * limit;

    const where: any = { hallId };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    const [calendars, total] = await Promise.all([
      prisma.hallCalendar.findMany({
        where,
        orderBy: { date: 'asc' },
        take: limit,
        skip,
      }),
      prisma.hallCalendar.count({ where }),
    ]);

    return successResponse(
      {
        data: calendars,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      'Calendar entries retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST - Add calendar entry
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ hallId: string }> }
) {
  try {
    const { hallId } = await params;
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    // Check if hall exists and user is owner or admin
    const hall = await prisma.hallProfile.findUnique({
      where: { id: hallId },
    });

    if (!hall) {
      return errorResponse('Not found', 404, 'Hall not found');
    }

    if (userRole !== 'ADMIN' && hall.userId !== userId) {
      return errorResponse('Forbidden', 403, 'Only hall owner or admin can manage calendar');
    }

    const body = await request.json();
    const validationResult = addCalendarSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    const { date, isAvailable, notes } = validationResult.data;

    // Check if entry already exists
    const existingEntry = await prisma.hallCalendar.findFirst({
      where: {
        hallId,
        date: new Date(date),
      },
    });

    if (existingEntry) {
      return errorResponse(
        'Bad request',
        400,
        'Calendar entry already exists for this date'
      );
    }

    const calendarEntry = await prisma.hallCalendar.create({
      data: {
        hallId,
        date: new Date(date),
        isAvailable,
        notes,
      },
    });

    return successResponse(calendarEntry, 'Calendar entry added successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
