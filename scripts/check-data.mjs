import fs from 'fs';
import pg from 'pg';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim();
if (!url) {
  console.error('DATABASE_URL topilmadi');
  process.exit(1);
}

const isRemote = !/localhost|127\.0\.0\.1/.test(url);
const pool = new pg.Pool({
  connectionString: url,
  ssl: isRemote ? { rejectUnauthorized: false } : undefined,
});

const tables = [
  '"User"',
  '"HallProfile"',
  '"Booking"',
  '"Payment"',
  '"ServiceProvider"',
  '"Review"',
  '"Favorite"',
  '"Notification"',
];

try {
  console.log('DB host:', url.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
  for (const table of tables) {
    const result = await pool.query(`SELECT COUNT(*)::int AS count FROM ${table}`);
    console.log(`${table}: ${result.rows[0].count} ta yozuv`);
  }
} catch (error) {
  console.error('Xato:', error.message);
  process.exit(1);
} finally {
  await pool.end();
}
