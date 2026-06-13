import fs from 'fs';
import pg from 'pg';
const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim();
const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
try {
  // User columns
  const uc = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name='User' ORDER BY ordinal_position`);
  console.log('USER COLUMNS:', uc.rows.map(r => r.column_name).join(', '));
  // HallProfile columns
  const hc = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name='HallProfile' ORDER BY ordinal_position`);
  console.log('\nHALLPROFILE COLUMNS:', hc.rows.map(r => r.column_name).join(', '));
  // HallImage table exists?
  const hi = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name='HallImage' ORDER BY ordinal_position`);
  console.log('\nHALLIMAGE COLUMNS:', hi.rows.length ? hi.rows.map(r => r.column_name).join(', ') : '(table missing)');
  // Counts
  const users = await pool.query(`SELECT id, email, role, status FROM "User" ORDER BY "createdAt"`);
  console.log('\nUSERS (' + users.rows.length + '):');
  users.rows.forEach(u => console.log('  -', u.email, '|', u.role, '|', u.status));
  const halls = await pool.query(`SELECT count(*)::int AS c FROM "HallProfile"`);
  console.log('\nHALL COUNT:', halls.rows[0].c);
  const hallSample = await pool.query(`SELECT id, name, "approvalStatus", "isActive", "imageUrl" FROM "HallProfile" LIMIT 10`);
  hallSample.rows.forEach(h => console.log('  -', h.name, '|', h.approvalStatus, '| active:', h.isActive, '| img:', h.imageUrl ? 'yes' : 'no'));
} catch (e) { console.error('ERROR:', e.message); } finally { await pool.end(); }
