/**
 * Seed REAL wedding halls with multiple images.
 * - Removes old test/debug halls
 * - Inserts real Tashkent halls owned by hallowner_test@wedding.uz
 * - Adds 5 HallImage rows per hall
 * Run: node scripts/seed-real-halls.mjs
 */
import fs from 'fs';
import pg from 'pg';
import crypto from 'crypto';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim();
if (!url) { console.error('DATABASE_URL not found'); process.exit(1); }

const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });

// High-quality wedding-hall image sets (Unsplash, stable IDs)
const IMG = {
  a: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
  b: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
  c: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1200&q=80',
  d: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200&q=80',
  e: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=1200&q=80',
  f: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=1200&q=80',
  g: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
  h: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80',
  i: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
  j: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
  k: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
  l: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80',
};

const HALLS = [
  {
    name: "Navro'z Palace",
    description: "Yunusobod markazida joylashgan zamonaviy va hashamatli to'yxona. 600 kishilik keng zal, professional sahna, yuqori darajadagi xizmat va bepul avtoturargoh. Mukammal to'y marosimi uchun ideal tanlov.",
    category: 'VIP', capacity: 600, pricePerPlate: 250000,
    city: 'Yunusobod', address: "Yunusobod tumani, Amir Temur shoh ko'chasi 108, Toshkent", phone: '+998901112233',
    ratings: 4.9, images: [IMG.a, IMG.b, IMG.c, IMG.d, IMG.e],
  },
  {
    name: 'Grand Tashkent',
    description: "Shahar markazidagi nufuzli to'yxona. Klassik va zamonaviy uslub uyg'unligi, kristall qandillar, keng raqs maydoni. 500 mehmonga mo'ljallangan.",
    category: 'PREMIUM', capacity: 500, pricePerPlate: 200000,
    city: 'Mirobod', address: "Mirobod tumani, Shota Rustaveli ko'chasi 45, Toshkent", phone: '+998901112234',
    ratings: 4.8, images: [IMG.f, IMG.g, IMG.h, IMG.a, IMG.c],
  },
  {
    name: 'Royal Garden',
    description: "Bog' ichidagi ochiq va yopiq zalli to'yxona. Yashil hudud, fontan, foto zonalar. Yozgi to'ylar uchun ajoyib manzara va salqin muhit.",
    category: 'PREMIUM', capacity: 450, pricePerPlate: 180000,
    city: 'Chilonzor', address: "Chilonzor tumani, Bunyodkor shoh ko'chasi 12, Toshkent", phone: '+998901112235',
    ratings: 4.7, images: [IMG.i, IMG.j, IMG.k, IMG.l, IMG.b],
  },
  {
    name: 'Visol To\'yxonasi',
    description: "Mirzo Ulug'bek tumanidagi qulay va sifatli to'yxona. Mazali milliy va yevropa taomlari, mehribon xodimlar, adolatli narxlar.",
    category: 'STANDARD', capacity: 400, pricePerPlate: 150000,
    city: "Mirzo Ulug'bek", address: "Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li ko'chasi 78, Toshkent", phone: '+998901112236',
    ratings: 4.6, images: [IMG.c, IMG.d, IMG.e, IMG.f, IMG.g],
  },
  {
    name: 'Diyor Saroyi',
    description: "Sergeli tumanidagi keng va arzon to'yxona. Katta avtoturargoh, zamonaviy ovoz va yorug'lik tizimi. Oilaviy tadbirlar uchun ham qulay.",
    category: 'STANDARD', capacity: 350, pricePerPlate: 130000,
    city: 'Sergeli', address: "Sergeli tumani, Yangi Sergeli ko'chasi 23, Toshkent", phone: '+998901112237',
    ratings: 4.5, images: [IMG.h, IMG.i, IMG.j, IMG.k, IMG.a],
  },
  {
    name: 'Oltin Vodiy',
    description: "Yakkasaroy tumanidagi hashamatli to'yxona. Oltin bezakli interer, VIP xonalar, professional fotograf va videograf xizmatlari mavjud.",
    category: 'VIP', capacity: 550, pricePerPlate: 230000,
    city: 'Yakkasaroy', address: "Yakkasaroy tumani, Bobur ko'chasi 56, Toshkent", phone: '+998901112238',
    ratings: 4.9, images: [IMG.l, IMG.a, IMG.b, IMG.c, IMG.d],
  },
  {
    name: 'Guliston Plaza',
    description: "Olmazor tumanidagi yorqin va zamonaviy to'yxona. Gulli bezaklar, qulay joylashuv, metro yaqinida. O'rtacha byudjet uchun ideal.",
    category: 'STANDARD', capacity: 380, pricePerPlate: 140000,
    city: 'Olmazor', address: "Olmazor tumani, Universitet ko'chasi 34, Toshkent", phone: '+998901112239',
    ratings: 4.4, images: [IMG.e, IMG.f, IMG.g, IMG.h, IMG.i],
  },
  {
    name: 'Marvarid Hall',
    description: "Shayxontohur tumanidagi nafis to'yxona. Oq-marmar interer, kristall bezaklar, professional ofitsiantlar. Nikoh to'ylari uchun mukammal.",
    category: 'PREMIUM', capacity: 420, pricePerPlate: 190000,
    city: 'Shayxontohur', address: "Shayxontohur tumani, Navoiy ko'chasi 89, Toshkent", phone: '+998901112240',
    ratings: 4.7, images: [IMG.j, IMG.k, IMG.l, IMG.a, IMG.b],
  },
  {
    name: 'Bahor To\'yxonasi',
    description: "Uchtepa tumanidagi arzon va sifatli to'yxona. Yangi ta'mirlangan zal, mazali taomlar, mehmondo'st xizmat. Kichik va o'rta to'ylar uchun.",
    category: 'ECONOMY', capacity: 300, pricePerPlate: 100000,
    city: 'Uchtepa', address: "Uchtepa tumani, Chimboy ko'chasi 17, Toshkent", phone: '+998901112241',
    ratings: 4.3, images: [IMG.c, IMG.d, IMG.e, IMG.f, IMG.h],
  },
  {
    name: 'Imperial Palace',
    description: "Yunusobod tumanidagi eng nufuzli to'yxonalardan biri. 700 kishilik gigant zal, ikki qavatli sahna, lyuks VIP zonalar va premium xizmat.",
    category: 'VIP', capacity: 700, pricePerPlate: 280000,
    city: 'Yunusobod', address: "Yunusobod tumani, Bog'ishamol ko'chasi 145, Toshkent", phone: '+998901112242',
    ratings: 5.0, images: [IMG.g, IMG.i, IMG.a, IMG.b, IMG.l],
  },
];

try {
  // 1. Ensure required columns exist + drop unique constraint for multi-hall owner
  for (const q of [
    `ALTER TABLE "HallProfile" ADD COLUMN IF NOT EXISTS city TEXT`,
    `ALTER TABLE "HallProfile" ADD COLUMN IF NOT EXISTS address TEXT`,
    `ALTER TABLE "HallProfile" ADD COLUMN IF NOT EXISTS phone TEXT`,
    `ALTER TABLE "HallProfile" DROP CONSTRAINT IF EXISTS "HallProfile_userId_key"`,
  ]) { await pool.query(q); }
  console.log('✅ Columns ensured');

  // 2. Find owner
  const ownerRes = await pool.query(`SELECT id FROM "User" WHERE email = $1`, ['hallowner_test@wedding.uz']);
  if (ownerRes.rows.length === 0) {
    console.error('❌ hallowner_test@wedding.uz topilmadi! Avval node scripts/setup-accounts.mjs ishga tushiring.');
    process.exit(1);
  }
  const ownerId = ownerRes.rows[0].id;
  console.log('✅ Owner:', ownerId);

  // 3. Remove old test/debug halls (and their images via cascade or manual)
  const junkNames = ['Test Hall', 'Updated Test Hall', 'Updated Hall', 'Debug Hall', 'madina'];
  const del = await pool.query(
    `DELETE FROM "HallProfile" WHERE name = ANY($1::text[]) RETURNING id`,
    [junkNames]
  );
  console.log(`🗑️  O'chirildi: ${del.rows.length} ta test/debug to'yxona`);

  // 4. Insert real halls + images
  let created = 0, skipped = 0;
  for (const hall of HALLS) {
    const existing = await pool.query(
      `SELECT id FROM "HallProfile" WHERE name = $1 AND "userId" = $2`,
      [hall.name, ownerId]
    );

    let hallId;
    if (existing.rows.length > 0) {
      hallId = existing.rows[0].id;
      // refresh core fields + main image
      await pool.query(
        `UPDATE "HallProfile" SET description=$1, category=$2, capacity=$3, "pricePerPlate"=$4,
           city=$5, address=$6, phone=$7, ratings=$8, "imageUrl"=$9, "approvalStatus"='APPROVED',
           "isActive"=true, "updatedAt"=NOW() WHERE id=$10`,
        [hall.description, hall.category, hall.capacity, hall.pricePerPlate,
         hall.city, hall.address, hall.phone, hall.ratings, hall.images[0], hallId]
      );
      await pool.query(`DELETE FROM "HallImage" WHERE "hallId" = $1`, [hallId]);
      console.log(`🔄 Yangilandi: ${hall.name}`);
      skipped++;
    } else {
      hallId = crypto.randomUUID();
      await pool.query(
        `INSERT INTO "HallProfile" (
           id, "userId", name, description, category, capacity, "pricePerPlate",
           city, address, phone, "advancePercentage", "approvalStatus", "isActive",
           ratings, "totalReviews", "imageUrl", "createdAt", "updatedAt"
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,25,'APPROVED',true,$11,0,$12,NOW(),NOW())`,
        [hallId, ownerId, hall.name, hall.description, hall.category, hall.capacity,
         hall.pricePerPlate, hall.city, hall.address, hall.phone, hall.ratings, hall.images[0]]
      );
      console.log(`✅ Yaratildi: ${hall.name}`);
      created++;
    }

    // images
    for (let i = 0; i < hall.images.length; i++) {
      await pool.query(
        `INSERT INTO "HallImage" (id, "hallId", "imageUrl", "displayOrder", "isMainImage", "createdAt", "updatedAt")
         VALUES ($1,$2,$3,$4,$5,NOW(),NOW())`,
        [crypto.randomUUID(), hallId, hall.images[i], i, i === 0]
      );
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Yangi: ${created} | 🔄 Yangilangan: ${skipped} ta to'yxona`);
  console.log(`🖼️  Har biriga 5 ta rasm qo'shildi`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
} catch (e) {
  console.error('❌ ERROR:', e.message);
  console.error(e);
  process.exit(1);
} finally {
  await pool.end();
}
