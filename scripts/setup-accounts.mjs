/**
 * Setup/ensure key accounts with KNOWN passwords.
 * Writes to the correct `password` column (matches login route).
 * Run: node scripts/setup-accounts.mjs
 */
import fs from 'fs';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim();
if (!url) { console.error('DATABASE_URL not found'); process.exit(1); }

const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });

const ACCOUNTS = [
  { email: 'admin@wedding.uz',         password: 'Admin@12345',    firstName: 'Super',  lastName: 'Admin',    role: 'ADMIN',      phone: '+998900000001' },
  { email: 'hallowner_test@wedding.uz', password: 'Owner@12345',   firstName: 'Test',   lastName: 'Owner',    role: 'HALL_OWNER', phone: '+998900000002' },
  { email: 'customer_test@wedding.uz',  password: 'Customer@12345', firstName: 'Test',  lastName: 'Customer', role: 'CUSTOMER',   phone: '+998900000003' },
];

try {
  for (const acc of ACCOUNTS) {
    const hash = await bcrypt.hash(acc.password, 10);
    const existing = await pool.query(`SELECT id FROM "User" WHERE email = $1`, [acc.email]);

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE "User"
         SET password = $1, role = $2, status = 'ACTIVE', "isEmailVerified" = true,
             "firstName" = $3, "lastName" = $4, "updatedAt" = NOW()
         WHERE email = $5`,
        [hash, acc.role, acc.firstName, acc.lastName, acc.email]
      );
      console.log(`🔄 Updated: ${acc.email}`);
    } else {
      await pool.query(
        `INSERT INTO "User" (id, email, phone, password, "firstName", "lastName", role, status, "isEmailVerified", "createdAt", "updatedAt")
         VALUES ($1,$2,$3,$4,$5,$6,$7,'ACTIVE',true,NOW(),NOW())`,
        [crypto.randomUUID(), acc.email, acc.phone, hash, acc.firstName, acc.lastName, acc.role]
      );
      console.log(`✅ Created: ${acc.email}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  AKKAUNTLAR TAYYOR (login uchun)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  ACCOUNTS.forEach(a => console.log(`  ${a.role.padEnd(12)} ${a.email}  /  ${a.password}`));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
} catch (e) {
  console.error('❌ ERROR:', e.message);
  process.exit(1);
} finally {
  await pool.end();
}
