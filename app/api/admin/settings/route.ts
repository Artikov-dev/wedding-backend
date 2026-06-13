import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    
    if (userRole !== 'ADMIN') {
      return errorResponse('Faqat admin ruxsat etilgan', 403, 'Forbidden');
    }

    const result = await query(`SELECT * FROM "SystemSettings"`);
    
    const settings: Record<string, any> = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }

    return successResponse(settings, 'Settings retrieved successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve settings');
  }
}

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    
    if (userRole !== 'ADMIN') {
      return errorResponse('Faqat admin ruxsat etilgan', 403, 'Forbidden');
    }

    const body = await request.json();

    // Body is an object of key-value pairs
    for (const key of Object.keys(body)) {
      const value = JSON.stringify(body[key]);
      
      await query(
        `INSERT INTO "SystemSettings" ("key", "value", "updatedAt") 
         VALUES ($1, $2, NOW()) 
         ON CONFLICT ("key") 
         DO UPDATE SET "value" = EXCLUDED."value", "updatedAt" = EXCLUDED."updatedAt"`,
        [key, value]
      );
    }

    // Retrieve updated
    const result = await query(`SELECT * FROM "SystemSettings"`);
    const settings: Record<string, any> = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }

    return successResponse(settings, 'Settings updated successfully');
  } catch (error) {
    return handleApiError(error, 'Failed to update settings');
  }
}
