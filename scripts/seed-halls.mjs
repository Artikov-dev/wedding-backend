/**
 * Seed script: hallowner_test uchun to'yxonalar qo'shish
 * Run: node scripts/seed-halls.mjs
 */
import fs from 'fs';
import pg from 'pg';
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

const HALLS = [
  {
    name: "Visol to'yxonasi",
    description: "Zamonaviy va hashamatli to'yxona. Yunusobod tumanida joylashgan, keng zal va mukammal xizmat.",
    category: 'PREMIUM',
    capacity: 500,
    pricePerPlate: 200000,
    city: 'Yunusobod',
    address: "Yunusobod tumani, A.Navoiy ko'chasi, 12",
    phone: '+998901234567',
    advancePercentage: 25,
  },
  {
    name: 'Guliston saroyi',
    description: "Qulay va arzon narxlarda sifatli to'y xizmati. Chilonzor tumanida.",
    category: 'STANDARD',
    capacity: 400,
    pricePerPlate: 150000,
    city: 'Chilonzor',
    address: "Chilonzor tumani, Bunyodkor ko'chasi, 45",
    phone: '+998901234568',
    advancePercentage: 25,
  },
];

try {
  // Add missing columns if they don't exist
  const alterQueries = [
    `ALTER TABLE "HallProfile" ADD COLUMN IF NOT EXISTS city TEXT`,
    `ALTER TABLE "HallProfile" ADD COLUMN IF NOT EXISTS address TEXT`,
    `ALTER TABLE "HallProfile" ADD COLUMN IF NOT EXISTS phone TEXT`,
    // Remove unique constraint so one owner can have multiple halls
    `ALTER TABLE "HallProfile" DROP CONSTRAINT IF EXISTS "HallProfile_userId_key"`,
  ];
  for (const q of alterQueries) {
    await pool.query(q);
  }
  console.log('✅ DB columns ensured + userId unique constraint removed');

  // Find hallowner_test user
  const userRes = await pool.query(
    `SELECT id, email, "firstName" FROM "User" WHERE email = $1`,
    ['hallowner_test@wedding.uz']
  );

  if (userRes.rows.length === 0) {
    console.error('❌ hallowner_test@wedding.uz topilmadi!');
    console.log('Avval bu akkauntni yarating (register orqali).');
    await pool.end();
    process.exit(1);
  }

  const owner = userRes.rows[0];
  console.log(`✅ Owner topildi: ${owner.email} (${owner.id})`);

  let created = 0;
  let skipped = 0;

  for (const hall of HALLS) {
    // Check if hall already exists for this owner with same name
    const existing = await pool.query(
      `SELECT id FROM "HallProfile" WHERE "userId" = $1 AND name = $2`,
      [owner.id, hall.name]
    );

    if (existing.rows.length > 0) {
      console.log(`⊙ Mavjud (skip): ${hall.name}`);
      skipped++;
      continue;
    }

    const id = crypto.randomUUID();
    await pool.query(
      `INSERT INTO "HallProfile" (
        id, "userId", name, description, category, capacity, "pricePerPlate",
        city, address, phone, "advancePercentage", "approvalStatus", "isActive",
        ratings, "createdAt", "updatedAt"
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'APPROVED',true,0,NOW(),NOW())`,
      [
        id, owner.id, hall.name, hall.description, hall.category,
        hall.capacity, hall.pricePerPlate, hall.city, hall.address,
        hall.phone, hall.advancePercentage,
      ]
    );
    console.log(`✅ Yaratildi: ${hall.name} (id: ${id})`);
    created++;
  }

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Yaratildi: ${created} ta to'yxona`);
  console.log(`⊙ O'tkazib yuborildi: ${skipped} ta (avval mavjud)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
} catch (error) {
  console.error('❌ Xatolik:', error.message);
  console.error(error);
  process.exit(1);
} finally {
  await pool.end();
}
