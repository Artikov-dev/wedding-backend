const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: 'postgresql://weddi:QCrumP02YXmhcctw3dDVPGct6fVnnXjR@dpg-d8enor0js32c738li930-a.oregon-postgres.render.com/weddingly',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const accounts = [
    { email: 'superadmin@wedding.uz', password: 'SuperAdmin1234!' },
    { email: 'hallowner_test@wedding.uz', password: 'HallOwner1234!' },
    { email: 'customer_test@wedding.uz', password: 'Customer1234!' },
  ];

  for (const acc of accounts) {
    const hashedPassword = await bcrypt.hash(acc.password, 10);
    const res = await pool.query('UPDATE "User" SET password = $1 WHERE email = $2', [hashedPassword, acc.email]);
    console.log(`Updated ${acc.email}: ${res.rowCount} rows affected`);
  }
}

main().catch(console.error).finally(() => pool.end());
