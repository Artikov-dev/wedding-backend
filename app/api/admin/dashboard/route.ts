/**
 * Admin Dashboard API
 * GET /api/admin/dashboard - Admin dashboard metrics
 * GET /api/admin/analytics - Admin detailed analytics
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { hasRole } from '@/lib/auth-route';

/**
 * GET - Admin dashboard overview
 */
export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');

    if (!hasRole(userRole || '', ['ADMIN'])) {
      return errorResponse('Forbidden', 403, 'Only admins can access dashboard');
    }

    const searchParams = request.nextUrl.searchParams;
    const metricsType = searchParams.get('type') || 'overview'; // overview, analytics, trends

    if (metricsType === 'overview') {
      // Get total counts
      const [totalUsers, totalOwners, totalHalls, totalBookings] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: 'HALL_OWNER' } }),
        prisma.hallProfile.count(),
        prisma.booking.count(),
      ]);

      // Get revenue
      const payments = await prisma.payment.findMany({
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

      // Get booking stats
      const bookings = await prisma.booking.findMany({
        select: { status: true },
      });

      const activeBookings = bookings.filter((b) => b.status === 'CONFIRMED').length;

      // Get top rated halls
      const topRatedHalls = await prisma.hallProfile.findMany({
        select: { id: true, name: true, ratings: true, totalReviews: true },
        orderBy: { ratings: 'desc' },
        take: 5,
      });

      const dashboard = {
        totalUsers,
        totalOwners,
        totalHalls,
        totalBookings,
        activeBookings,
        totalRevenue: Number(totalRevenue),
        monthlyRevenue: Number(monthlyRevenue),
        topRatedHalls,
        averageBookingValue:
          totalBookings > 0
            ? payments.reduce((sum, p) => sum + Number(p.amount), 0) / totalBookings
            : 0,
      };

      return successResponse(dashboard, 'Admin dashboard retrieved successfully');
    }

    if (metricsType === 'analytics') {
      // Detailed analytics
      const [bookings, payments, users, halls] = await Promise.all([
        prisma.booking.findMany({
          select: { status: true, totalAmount: true, eventDate: true, createdAt: true },
        }),
        prisma.payment.findMany({
          select: { amount: true, status: true, createdAt: true },
        }),
        prisma.user.findMany({
          select: { id: true, role: true, createdAt: true },
        }),
        prisma.hallProfile.findMany({
          select: { id: true, name: true, ratings: true, approvalStatus: true },
        }),
      ]);

      const analytics = {
        bookings: {
          total: bookings.length,
          confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
          completed: bookings.filter((b) => b.status === 'COMPLETED').length,
          cancelled: bookings.filter((b) => b.status === 'CANCELLED').length,
          pending: bookings.filter((b) => b.status === 'PENDING').length,
          averageValue:
            bookings.length > 0
              ? bookings.reduce((sum, b) => sum + Number(b.totalAmount), 0) / bookings.length
              : 0,
        },
        payments: {
          total: payments.length,
          completed: payments.filter((p) => p.status === 'COMPLETED').length,
          pending: payments.filter((p) => p.status === 'PENDING').length,
          failed: payments.filter((p) => p.status === 'FAILED').length,
          totalAmount: payments.reduce((sum, p) => sum + Number(p.amount), 0),
        },
        users: {
          total: users.length,
          customers: users.filter((u) => u.role === 'CUSTOMER').length,
          owners: users.filter((u) => u.role === 'HALL_OWNER').length,
          serviceProviders: users.filter((u) => u.role === 'SERVICE_PROVIDER').length,
          admins: users.filter((u) => u.role === 'ADMIN').length,
        },
        halls: {
          total: halls.length,
          approved: halls.filter((h) => h.approvalStatus === 'APPROVED').length,
          pending: halls.filter((h) => h.approvalStatus === 'PENDING').length,
          rejected: halls.filter((h) => h.approvalStatus === 'REJECTED').length,
          averageRating:
            halls.length > 0
              ? halls.reduce((sum, h) => sum + Number(h.ratings || 0), 0) / halls.length
              : 0,
        },
      };

      return successResponse(analytics, 'Admin analytics retrieved successfully');
    }

    if (metricsType === 'trends') {
      // Booking trends - last 12 months
      const bookings = await prisma.booking.findMany({
        select: { createdAt: true, status: true, totalAmount: true },
      });

      const trends: Record<string, any> = {};
      const last12Months = [];

      for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthKey = date.toISOString().slice(0, 7);
        last12Months.push(monthKey);
        trends[monthKey] = {
          month: monthKey,
          bookings: 0,
          completedBookings: 0,
          revenue: 0,
        };
      }

      bookings.forEach((b) => {
        const monthKey = new Date(b.createdAt).toISOString().slice(0, 7);
        if (trends[monthKey]) {
          trends[monthKey].bookings++;
          if (b.status === 'COMPLETED') {
            trends[monthKey].completedBookings++;
            trends[monthKey].revenue += Number(b.totalAmount);
          }
        }
      });

      const trendData = last12Months.map((m) => trends[m]);

      return successResponse(trendData, 'Admin trends retrieved successfully');
    }

    return successResponse({}, 'Unknown metrics type');
  } catch (error) {
    return handleApiError(error);
  }
}
