import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole !== 'ADMIN') {
      return errorResponse('Forbidden', 403, 'Admins only');
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const approvalStatus = searchParams.get('approvalStatus') || undefined;
    const search = searchParams.get('search') || undefined;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (approvalStatus) where.approvalStatus = approvalStatus;
    if (search) where.name = { contains: search };

    const [halls, total] = await Promise.all([
      prisma.hallProfile.findMany({
        where,
        select: {
          id: true,
          userId: true,
          name: true,
          description: true,
          category: true,
          capacity: true,
          pricePerPlate: true,
          advancePercentage: true,
          imageUrl: true,
          approvalStatus: true,
          ratings: true,
          totalReviews: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.hallProfile.count({ where }),
    ]);

    // Attach owner info for each hall
    const ownerIds = [...new Set(halls.map((h: any) => h.userId).filter(Boolean))];
    const owners = ownerIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: ownerIds } },
          select: { id: true, firstName: true, lastName: true, email: true, phone: true, role: true },
        })
      : [];

    const ownerMap = new Map(owners.map((o: any) => [o.id, o]));

    const result = halls.map((hall: any) => ({
      ...hall,
      owner: ownerMap.get(hall.userId) || null,
    }));

    return successResponse(
      {
        halls: result,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Halls retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve halls');
  }
}
