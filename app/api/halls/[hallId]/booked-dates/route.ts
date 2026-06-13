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

    const result = await query<{ eventDate: string, firstName: string, lastName: string, guests: number }>(
      `SELECT 
         TO_CHAR(b."eventDate", 'YYYY-MM-DD') AS "eventDate",
         u."firstName",
         u."lastName",
         b."numberOfGuests" AS guests
       FROM "Booking" b
       LEFT JOIN "User" u ON b."userId" = u.id
       WHERE b."hallId" = $1
         AND b."status" IN ('CONFIRMED', 'PENDING')
       ORDER BY b."eventDate"`,
      [hallId]
    );

    const bookedDates = result.rows.map((row) => row.eventDate);
    const bookedDetails: Record<string, string> = {};
    result.rows.forEach(row => {
      const name = [row.firstName, row.lastName].filter(Boolean).join(' ') || 'Mijoz';
      bookedDetails[row.eventDate] = `Band qiluvchi: ${name} (${row.guests} kishi)`;
    });

    return successResponse({ bookedDates, bookedDetails }, 'Booked dates retrieved successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve booked dates');
  }
}
