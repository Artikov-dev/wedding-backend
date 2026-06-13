import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    
    if (userRole !== 'ADMIN') {
      return errorResponse('Faqat admin uchun', 403, 'Forbidden');
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Filter params
    const action = searchParams.get('action');
    const userId = searchParams.get('userId');

    let whereClause = '';
    const params: any[] = [];
    let paramIndex = 1;

    if (action) {
      whereClause += (whereClause ? ' AND ' : 'WHERE ') + `"action" = $${paramIndex}`;
      params.push(action);
      paramIndex++;
    }

    if (userId) {
      whereClause += (whereClause ? ' AND ' : 'WHERE ') + `"userId" = $${paramIndex}`;
      params.push(userId);
      paramIndex++;
    }

    const logsResult = await query(
      `SELECT l.*, u."firstName", u."lastName", u."email" 
       FROM "ActivityLog" l
       LEFT JOIN "User" u ON u.id = l."userId"
       ${whereClause}
       ORDER BY l."createdAt" DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    const countResult = await query(
      `SELECT COUNT(*) FROM "ActivityLog" ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count);

    return successResponse(
      {
        logs: logsResult.rows,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      },
      'Logs retrieved successfully'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve logs');
  }
}
