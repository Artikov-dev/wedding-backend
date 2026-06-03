/**
 * Hall Calendar Detail API
 * PUT /api/halls/[hallId]/calendar/[date] - Update calendar entry
 * DELETE /api/halls/[hallId]/calendar/[date] - Delete calendar entry
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';
import { updateCalendarSchema } from '@/lib/validations';

/**
 * PUT - Update calendar entry
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ hallId: string; date: string }> }
) {
  try {
    const { hallId, date } = await params;
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
    const validationResult = updateCalendarSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0].message,
        400,
        'Validation failed'
      );
    }

    // Decode the date (it will be URL encoded)
    const decodedDate = decodeURIComponent(date);
    const calendarDate = new Date(decodedDate);

    // Find and update the entry
    const calendarEntry = await prisma.hallCalendar.findFirst({
      where: {
        hallId,
        date: calendarDate,
      },
    });

    if (!calendarEntry) {
      return errorResponse('Not found', 404, 'Calendar entry not found');
    }

    const updated = await prisma.hallCalendar.update({
      where: { id: calendarEntry.id },
      data: {
        ...validationResult.data,
        updatedAt: new Date(),
      },
    });

    return successResponse(updated, 'Calendar entry updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE - Delete calendar entry
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ hallId: string; date: string }> }
) {
  try {
    const { hallId, date } = await params;
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

    // Decode the date (it will be URL encoded)
    const decodedDate = decodeURIComponent(date);
    const calendarDate = new Date(decodedDate);

    // Find and delete the entry
    const calendarEntry = await prisma.hallCalendar.findFirst({
      where: {
        hallId,
        date: calendarDate,
      },
    });

    if (!calendarEntry) {
      return errorResponse('Not found', 404, 'Calendar entry not found');
    }

    await prisma.hallCalendar.delete({
      where: { id: calendarEntry.id },
    });

    return successResponse(null, 'Calendar entry deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
