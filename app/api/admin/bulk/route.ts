import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole !== 'ADMIN') {
      return errorResponse('Faqat admin ruxsat etilgan', 403, 'Forbidden');
    }

    const body = await request.json();
    const { resource, action, ids, value } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return errorResponse('ID lar kiritilmagan', 400, 'Bad Request');
    }

    let updatedCount = 0;

    if (resource === 'bookings' && action === 'update_status') {
      const result = await prisma.booking.updateMany({
        where: { id: { in: ids } },
        data: { status: value },
      });
      updatedCount = result.count;
    } else if (resource === 'halls' && action === 'update_approval') {
      const result = await prisma.hallProfile.updateMany({
        where: { id: { in: ids } },
        data: { approvalStatus: value },
      });
      updatedCount = result.count;
    } else {
      return errorResponse('Noma\'lum resurs yoki amal', 400, 'Bad Request');
    }

    return successResponse({ updatedCount }, `${updatedCount} ta yozuv muvaffaqiyatli yangilandi`);
  } catch (error) {
    return handleApiError(error, 'Bulk amalida xatolik yuz berdi');
  }
}
