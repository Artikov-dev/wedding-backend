# Weddingly - Wedding Hall Booking Platform Backend (Assignment Topshirish Uchun Maxsus Hisobot)

Ushbu hujjat **Weddingly** loyihasining backend qismida ishlatilgan texnologiyalar, kutubxonalar, loyiha mohiyati va arxitekturasini baholovchi (assignment reviewer) uchun aniq va batafsil ko'rsatib berish maqsadida yaratildi.

---

## 🚀 Loyiha Mohiyati va Vazifalari (Project Essence)

**Weddingly Backend** — to'yxonalar (wedding halls) va nikoh marosimlari uchun turli qo'shimcha xizmatlarni (xonandalar, maxsus taomnomalar, to'y avtomobillari va h.k.) band qilish (booking) hamda ularni boshqarish imkonini beruvchi mukammal, xavfsiz va ishlab chiqarishga tayyor (production-ready) backend API tizimidir.

### Loyiha Quyidagi Asosiy Biznes Oqimlarni Bajaradi:
1. **Ko'p Rolli Foydalanuvchilar Tizimi (RBAC):**
   - **CUSTOMER:** To'yxona va xizmatlarni qidiradi, band qiladi, to'lovlarni amalga oshiradi, sharh qoldiradi.
   - **HALL_OWNER:** O'z to'yxonasini boshqaradi, bandlik kalendarini nazorat qiladi va oylik daromadlarini tahlil qiladi.
   - **SERVICE_PROVIDER:** Xizmatlar (musiqa, transport) bandligini boshqaradi.
   - **ADMIN:** To'yxonalarni tizimga qo'shish so'rovlarini tasdiqlaydi/rad etadi, platforma analitikasini kuzatadi.
2. **Band qilish va To'lov Oqimi (Booking & Payments):**
   - Mijoz to'yxona va sanani tanlaydi. Tizim avtomatik ravishda sig'im va kalendardagi bandlikni tekshiradi.
   - Tasdiqlash uchun 25% oldindan to'lov (deposit) qilinadi. Qolgan 75% to'lov tadbirdan oldin amalga oshiriladi.
3. **Qo'shimcha Xizmatlar Integratsiyasi:** Xonandalar (`Singer`) va avtomobillarni (`Car`) alohida yoki to'yxonaga bog'lab band qilish.
4. **Chat va Xabarlar tizimi:** Mijoz va to'yxona egalari o'rtasidagi to'g'ridan-to'g'ri muloqot API'si.

---

## 🛠️ Backend Tizimida Ishlatilgan Texnologiyalar Ro'yxati (Tech Stack)

Loyihaning backend qismida quyidagi texnologiyalar va kutubxonalar ishlatilgan (ma'lumotlar [package.json](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/package.json) faylidan olingan):

| Texnologiya / Kutubxona | Vazifasi va Qo'llanilish Joyi |
| :--- | :--- |
| **Node.js v22.x** | Backend tizimini ishga tushirish uchun runtime muhit. |
| **Next.js v16.2.6 (App Router)** | Backend API endpoint'larini yaratish va server-side marshrutlash (routing) uchun asosiy framework. Barcha API marshrutlar [app/api/](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/app/api/) papkasida joylashgan. |
| **TypeScript v5.7.3** | Loyiha kodlarini tip-xavfsiz (type-safe) qilish va dasturlash jarayonida xatoliklarni erta aniqlash uchun ishlatilgan. |
| **PostgreSQL** | Ma'lumotlarni ishonchli va reliesion tarzda saqlash uchun asosiy ma'lumotlar bazasi (Database). |
| **Custom Prisma Proxy ORM** | [lib/db.ts](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/lib/db.ts) faylida yozilgan maxsus bog'lovchi. Og'ir Prisma ORM o'rniga, uning interfeysiga (masalan: `prisma.user.findUnique`) taqlid qilgan holda toza PostgreSQL (`pg v8.21.0`) so'rovlarini dinamik bajaradi. Bu loyihani tezkor va yengil qiladi. |
| **Zod v3.24.1** | Mijozdan kelayotgan barcha ma'lumotlarni (Request body, params va query) qat'iy tekshirish va strukturalash uchun ishlatilgan. Barcha sxemalar [lib/validations.ts](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/lib/validations.ts) faylida yozilgan. |
| **JWT (jsonwebtoken & jose)** | Foydalanuvchilarni autentifikatsiya qilish uchun xavfsiz tokenlar yaratish va tekshirish tizimi. |
| **Bcryptjs v3.0.3** | Foydalanuvchi parollarini bazada xavfsiz (heshlangan) holatda saqlash uchun shifrlash kutubxonasi. |
| **Nodemailer v8.0.10** | OTP (One-Time Password) tasdiqlash kodlarini va tizim bildirishnomalarini foydalanuvchi pochtasiga yuborish uchun. |
| **Helmet v8.2.0 & CORS v2.8.6** | API xavfsizligini ta'minlash, zararli HTTP sarlavhalarini bloklash va domenlararo so'rovlarni boshqarish uchun. |
| **Winston v3.19.0** | Tizimdagi xatoliklar va muhim loglarni doimiy ravishda qayd etib borish (logging) uchun ishlatilgan. |
| **Jest & Supertest** | API endpoint'larining to'g'ri ishlashini avtomatlashtirilgan tarzda test qilish uchun ishlatilgan. |

---

## 📁 Loyiha Arxitekturasi va Papkalar Tuzilishi (Directory Structure)

Backend qismi quyidagi toza arxitektura qonuniyatlari asosida bo'lingan:

- 📂 **[app/api/](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/app/api/)** — Barcha API endpointlari (marshrutlari) joylashgan qism:
  - `auth/` — Ro'yxatdan o'tish, kirish, parolni tiklash va OTP tizimi.
  - `halls/` — To'yxonalar CRUD, qidiruv va bandlik kalendari.
  - `bookings/` — To'yxonalarni band qilish.
  - `payments/` — Stripe integratsiyasi va to'lovlar API'si.
  - `services/` — Xonanda va to'y mashinalarini boshqarish.
  - `reviews/` — Sharh va reytinglar.
  - `chat/` — Foydalanuvchilar o'rtasidagi suhbatlar.
  - `admin/` — Admin boshqaruv paneli, dashboard va to'yxonalarni tasdiqlash API'lari.
- 📂 **[lib/](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/lib/)** — Tizimning yadro qismi (core library):
  - [db.ts](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/lib/db.ts) — PostgreSQL ma'lumotlar bazasi ulanishi va Custom Prisma ORM Proxy.
  - [auth.ts](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/lib/auth.ts) — Autentifikatsiya va parollarni tekshirish funksiyalari.
  - [validations.ts](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/lib/validations.ts) — Zod sxemalari.
- 📄 **[middleware.ts](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/middleware.ts)** — Barcha API endpointlarni himoyalovchi va foydalanuvchining rolini (RBAC) tekshiruvchi global himoya qatlami.
- 📂 **[scripts/](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/scripts/)** — Baza jadvallarini yaratish va ko'chirish uchun SQL migratsiya fayllari.

---

## 📊 Ma'lumotlar Bazasi Tuzilishi (Database Schema)

Bazada jami **20 tadan ortiq jadval** mavjud bo'lib, ular quyidagi munosabatlar bilan bog'langan:

1. **Autentifikatsiya:** `User` (foydalanuvchilar), `OTP` (kodlar), `RefreshToken` (seanslar), `Address` (manzillar).
2. **To'yxona Modeli:** `HallProfile` (to'yxona ma'lumotlari), `HallAmenity` (qulayliklar), `HallCalendar` (bandlik kunlari), `HallImage` (rasmlar), `HallOwner` (egalari).
3. **Xizmatlar:** `ServiceProvider` (yetkazib beruvchilar), `Singer` (xonandalar), `Car` (avtomobillar), `Menu` va `MenuItem` (to'y taomnomalari).
4. **Tranzaksiyalar:** `Booking` (bandliklar), `ServiceBooking` (xizmatlar bandligi), `Payment` (to'lovlar), `Invoice` (hisob-fakturalar).
5. **Muloqot va Tahlil:** `Review` (sharhlar), `Favorite` (saralanganlar), `ChatMessage` / `Conversation` (chat tizimi), `Notification` (bildirishnomalar), `Invitation` (taklifnomalar), `DailyMetric` / `OwnerAnalytic` / `AdminAnalytic` (analitikalar).
