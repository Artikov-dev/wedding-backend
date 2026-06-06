/**
 * Owner Dashboard API
 * GET /api/owner/dashboard - Owner dashboard metrics
 * GET /api/owner/revenue - Owner revenue data
 * GET /api/owner/analytics - Owner detailed analytics
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';

/**
 * GET - Owner dashboard overview
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User not authenticated');
    }

    if (!hasRole(userRole || '', ['HALL_OWNER'])) {
      return errorResponse('Forbidden', 403, 'Only hall owners can access dashboard');
    }

    const searchParams = request.nextUrl.searchParams;
    const metricsType = searchParams.get('type') || 'overview'; // overview, revenue, analytics

    // Get owner's halls
    const halls = await prisma.hallProfile.findMany({
      where: { userId },
      select: { id: true, name: true, capacity: true, pricePerPlate: true, ratings: true },
    });

    const hallIds = halls.map((h) => h.id);

    if (hallIds.length === 0) {
      return successResponse(
        {
          totalHalls: 0,
          totalBookings: 0,
          activeBookings: 0,
          totalRevenue: 0,
          monthlyRevenue: 0,
          averageRating: 0,
          halls: [],
        },
        'Owner dashboard retrieved successfully'
      );
    }

    // Get metrics based on type
    if (metricsType === 'overview') {
      // Calculate totals
      const bookings = await prisma.booking.findMany({
        where: { hallId: { in: hallIds } },
        select: {
          id: true,
          status: true,
          totalAmount: true,
          eventDate: true,
        },
      });

      const payments = await prisma.payment.findMany({
        where: {
          booking: {
            hallId: { in: hallIds },
          },
        },
        select: {
          amount: true,
          status: true,
          createdAt: true,
        },
      });

      const totalRevenue = payments
        .filter((p) => p.status === 'COMPLETED')
        .reduce((sum, p) => sum + Number(p.amount), 0);

      const thisMonth = new Date();
      thisMonth.setDate(1);
      thisMonth.setHours(0, 0, 0, 0);

      const monthlyRevenue = payments
        .filter((p) => p.status === 'COMPLETED' && new Date(p.createdAt) >= thisMonth)
        .reduce((sum, p) => sum + Number(p.amount), 0);

      const activeBookings = bookings.filter((b) => b.status === 'CONFIRMED').length;

      const dashboard = {
        totalHalls: halls.length,
        totalBookings: bookings.length,
        activeBookings,
        totalRevenue: Number(totalRevenue),
        monthlyRevenue: Number(monthlyRevenue),
        averageRating:
          halls.length > 0
            ? halls.reduce((sum, h) => sum + Number(h.ratings || 0), 0) / halls.length
            : 0,
        halls,
      };

      return successResponse(dashboard, 'Owner dashboard retrieved successfully');
    }

    if (metricsType === 'revenue') {
      const payments = await prisma.payment.findMany({
        where: {
          booking: {
            hallId: { in: hallIds },
          },
        },
        select: {
          amount: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });

      const revenueData = {
        total: 0,
        completed: 0,
        pending: 0,
        failed: 0,
        monthly: [] as any,
      };

      // Group by month
      const monthlyMap: Record<string, number> = {};

      payments.forEach((p) => {
        const amount = Number(p.amount);
        revenueData.total += amount;

        if (p.status === 'COMPLETED') {
          revenueData.completed += amount;
        } else if (p.status === 'PENDING') {
          revenueData.pending += amount;
        } else if (p.status === 'FAILED') {
          revenueData.failed += amount;
        }

        const month = new Date(p.createdAt).toISOString().slice(0, 7);
        monthlyMap[month] = (monthlyMap[month] || 0) + (p.status === 'COMPLETED' ? amount : 0);
      });

      revenueData.monthly = Object.entries(monthlyMap)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => a.month.localeCompare(b.month));

      return successResponse(revenueData, 'Owner revenue data retrieved successfully');
    }

    // Default: analytics
    const bookings = await prisma.booking.findMany({
      where: { hallId: { in: hallIds } },
      select: { status: true, totalAmount: true, eventDate: true },
    });

    const analytics = {
      totalBookings: bookings.length,
      confirmedBookings: bookings.filter((b) => b.status === 'CONFIRMED').length,
      completedBookings: bookings.filter((b) => b.status === 'COMPLETED').length,
      cancelledBookings: bookings.filter((b) => b.status === 'CANCELLED').length,
      totalRevenue: bookings.reduce((sum, b) => sum + Number(b.totalAmount), 0),
      averageBookingValue:
        bookings.length > 0
          ? bookings.reduce((sum, b) => sum + Number(b.totalAmount), 0) / bookings.length
          : 0,
      upcomingBookings: bookings.filter(
        (b) => b.status === 'CONFIRMED' && new Date(b.eventDate) > new Date()
      ).length,
    };

    return successResponse(analytics, 'Owner analytics retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
