import { query } from './db';

export async function logActivity(data: {
  userId: string;
  action: string;
  targetId?: string;
  oldValue?: any;
  newValue?: any;
}) {
  try {
    await query(
      `INSERT INTO "ActivityLog" ("userId", action, "targetId", "oldValue", "newValue")
       VALUES ($1, $2, $3, $4, $5)`,
      [
        data.userId,
        data.action,
        data.targetId || null,
        data.oldValue ? JSON.stringify(data.oldValue) : null,
        data.newValue ? JSON.stringify(data.newValue) : null
      ]
    );
  } catch (error) {
    console.error('Failed to write activity log:', error);
  }
}
