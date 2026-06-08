import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { query } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ hallId: string }> }
) {
  try {
    const { hallId } = await params;

    const hall = await prisma.hallProfile.findUnique({ where: { id: hallId } });
    if (!hall) {
      return errorResponse('Hall not found', 404, 'Not found');
    }

    const result = await query<{ eventDate: string }>(
      `SELECT DISTINCT TO_CHAR("eventDate", 'YYYY-MM-DD') AS "eventDate"
       FROM "Booking"
       WHERE "hallId" = $1
         AND "status" IN ('CONFIRMED', 'PENDING')
       ORDER BY "eventDate"`,
      [hallId]
    );

    const bookedDates = result.rows.map((row) => row.eventDate);

    return successResponse({ bookedDates }, 'Booked dates retrieved successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve booked dates');
  }
}
