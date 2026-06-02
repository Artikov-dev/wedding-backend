import fs from 'fs';
import pg from 'pg';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim();
if (!url) {
  console.error('DATABASE_URL not found');
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

try {
  const tables = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY 1"
  );
  console.log('Tables:', tables.rows.map((r) => r.table_name).join(', ') || 'NONE');
} catch (error) {
  console.error('Error:', error.message);
} finally {
  await pool.end();
}
