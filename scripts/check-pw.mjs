import fs from 'fs';
import pg from 'pg';
const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim();
const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
try {
  const r = await pool.query(
    `SELECT email, role, (password IS NULL) AS pw_null, length(password) AS pw_len
     FROM "User" WHERE email IN ($1,$2,$3)`,
    ['admin@wedding.uz','hallowner_test@wedding.uz','customer_test@wedding.uz']
  );
  r.rows.forEach(u => console.log(u.email, '| role:', u.role, '| password NULL?', u.pw_null, '| len:', u.pw_len));
} catch (e) { console.error('ERROR:', e.message); } finally { await pool.end(); }
