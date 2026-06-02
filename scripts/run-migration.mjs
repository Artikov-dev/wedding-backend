import fs from 'fs';
import pg from 'pg';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim();
const sql = fs.readFileSync('scripts/init-api-schema.sql', 'utf8');

const pool = new pg.Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

try {
  await pool.query(sql);
  console.log('API schema migration completed successfully.');
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
} finally {
  await pool.end();
}
