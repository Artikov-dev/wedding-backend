import fs from 'fs';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim();
if (!url) {
  console.error('DATABASE_URL not found in .env');
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

const EMAIL = 'admin@wedding.uz';
const PASSWORD = 'Admin@12345';

try {
  // Check if admin already exists
  const existing = await pool.query(
    `SELECT id, email FROM "User" WHERE email = $1`,
    [EMAIL]
  );

  if (existing.rows.length > 0) {
    console.log('Admin already exists:', existing.rows[0].email);
    await pool.end();
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(PASSWORD, 10);
  const id = crypto.randomUUID();

  await pool.query(
    `INSERT INTO "User" (id, email, "passwordHash", "firstName", "lastName", role, "isEmailVerified", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, 'ADMIN', true, NOW(), NOW())`,
    [id, EMAIL, passwordHash, 'Super', 'Admin']
  );

  console.log('');
  console.log('✅ Admin created successfully!');
  console.log('──────────────────────────────');
  console.log('  Email   :', EMAIL);
  console.log('  Password:', PASSWORD);
  console.log('──────────────────────────────');
  console.log('');
} catch (error) {
  console.error('Error creating admin:', error.message);
  process.exit(1);
} finally {
  await pool.end();
}
