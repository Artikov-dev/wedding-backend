import { prisma } from '@/lib/db';
import { successResponse, handleApiError } from '@/lib/api-response';

export async function GET() {
  try {
    const [totalHalls, totalUsers, totalBookings, totalRegions, totalServices] = await Promise.all([
      prisma.hallProfile.count({ where: { approvalStatus: 'APPROVED' } }),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.booking.count({ where: { status: 'COMPLETED' } }),
      prisma.region.count(),
      prisma.serviceProvider.count(),
    ]);

    return successResponse(
      {
        halls: totalHalls,
        customers: totalUsers,
        completedBookings: totalBookings,
        regions: totalRegions,
        serviceProviders: totalServices,
      },
      'Platform statistics retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}
