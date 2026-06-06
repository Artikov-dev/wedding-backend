# Weddingly - Wedding Hall & Services Booking Platform
## To'liq Tizim Arxitekturasi va Texnologiyalari Hisoboti (Frontend & Backend)

Ushbu hujjat **Weddingly** platformasining ham frontend, ham backend qismlarida ishlatilgan texnologiyalar, loyiha arxitekturasi, ma'lumotlar bazasi tuzilishi va xavfsizlik oqimlarini birlashtirgan umumlashtiruvchi hisobotdir. Loyiha o'quv topshirig'i (assignment) uchun mukammal, xavfsiz va to'liq integratsiya qilingan holatda tayyorlangan.

---

## 🚀 1. Loyihaning Umumiy Mohiyati (Project Essence)

**Weddingly** — to'yxonalar (wedding halls) va nikoh marosimlari uchun qo'shimcha xizmatlarni (xonandalar, maxsus taomnomalar, to'y avtomobillari va h.k.) band qilish (booking) va boshqarish imkonini beruvchi yagona platformadir. 

### Tizimning Asosiy Biznes Oqimlari:
1. **Ko'p Rolli Foydalanuvchilar Tizimi (RBAC):**
   - **CUSTOMER:** To'yxonalarni qidiradi, saralaydi, band qiladi, to'lov qiladi va sharh qoldiradi.
   - **HALL_OWNER:** O'z to'yxonasini va bandlik taqvimini boshqaradi, daromadlar analitikasini kuzatadi.
   - **SERVICE_PROVIDER:** Nikoh to'ylariga hamroh xizmatlar (musiqa, transport) bandligini boshqaradi.
   - **ADMIN:** Hamkorlar (owners) va to'yxonalar arizalarini tasdiqlaydi/rad etadi, umumiy tizimni boshqaradi.
2. **Bron Qilish va To'lov Oqimi (Booking & Payments):**
   - Band qilishda to'yxona kalendari va sig'imi real vaqt rejimida tekshiriladi.
   - Tasdiqlash uchun 25% oldindan to'lov (deposit) qilinadi, qolgan 75% tadbirdan oldin to'lanadi.
3. **Qo'shimcha Xizmatlar Integratsiyasi:** Xonandalar (`Singer`), avtomobillar (`Car`) va maxsus taomnomalar bandligi.
4. **Chat Tizimi:** Mijoz va to'yxona egasi o'rtasidagi real vaqt rejimida muloqot qilish API'si.

---

## 🛠️ 2. Texnologiyalar Steki (Tech Stack Summary)

Loyihaning ikkala qismi ham zamonaviy, tezkor va barqaror texnologiyalar asosida qurilgan:

| Bo'lim | Texnologiya / Kutubxona | Versiya | Vazifasi / Izoh |
| :--- | :--- | :--- | :--- |
| **Frontend** | **Next.js (App Router)** | `16.2.7` | UI marshrutlash (routing), Server-Side Rendering (SSR) va Client-Side interaktivlik. |
| **Frontend** | **React** | `19.2.4` | UI komponentlarni dinamik boshqarish va render qilish kutubxonasi. |
| **Frontend** | **TypeScript** | `^5` | Kodlarni xavfsiz va xatolarsiz tiplash (static typing). |
| **Frontend** | **Vanilla CSS & Modules** | - | CSS-in-JS yoki Tailwind ishlatilmasdan, toza moslashuvchanlik uchun `.module.css` stil tizimi. |
| **Backend** | **Node.js** | `v22.x` | Backend server runtime muhiti. |
| **Backend** | **Next.js (App Router)** | `16.2.6` | Server API route'larni yaratish va server marshrutlash tizimi. |
| **Backend** | **TypeScript** | `5.7.3` | Backend logikasida qat'iy ma'lumot turlari nazorati. |
| **Ma'lumotlar Bazasi**| **PostgreSQL** | - | Ishonchli, relyasion ma'lumotlar bazasi. |
| **Database ORM** | **Custom Prisma Proxy** | - | PostgreSQL ulanishi uchun tayyorlangan maxsus tezkor yengil proxy (Prisma API wrapper). |

---

## 📦 3. Foydalanilgan Kutubxonalar va Bog'liqliklar (Dependencies)

### Backend Dependency'lar (foydalanilgan asosiy paketlar):
*   **Zod (`v3.24.1`)**: So'rovlar (Request parameters, body) ma'lumotlarini qat'iy tekshirish va validatsiya qilish.
*   **JWT (`jsonwebtoken` & `jose`)**: Xavfsiz seanslar va foydalanuvchi identifikatsiyasini boshqarish.
*   **Bcryptjs (`v3.0.3`)**: Maxfiy parollarni bazaga heshlangan (shifrlangan) holatda yozish.
*   **Nodemailer (`v8.0.10`)**: OTP kodlar va bildirishnomalarni SMTP orqali yuborish.
*   **Helmet (`v8.2.0`) & CORS (`v2.8.6`)**: HTTP xavfsizlik sarlavhalarini o'rnatish va cross-origin so'rovlarni nazorat qilish.
*   **Winston (`v3.19.0`)**: Xatoliklar va tizim faoliyati loglarini qayd etish.
*   **Jest & Supertest**: Backend API testlarini avtomatlashtirish.

### Frontend Dependency'lar (foydalanilgan asosiy paketlar):
*   **Axios (`^1.17.0`)**: Backend API bilan aloqa qilish va tokenlarni avtomatik yangilash (interceptor'lar).
*   **Date-fns (`^4.4.0`)**: Sana formatlash va vaqtlar bilan ishlash.
*   **Nodemailer (`^6.9.5`)**: SMTP elektron taklifnomalarni mahalliy API route (`/api/email`) orqali yuborish.
*   **React Icons (`^5.6.0`)**: SVG ikonkalar to'plami.
*   **Playwright (`^1.51.1`)**: End-to-End (E2E) testlash kutubxonasi.

---

## 📂 4. Loyiha Arxitekturasi va Papkalar Strukturasi

### 4.1 Backend Papkalar Strukturasi
Backend [backend-for-booking](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/) papkasida joylashgan bo'lib, uning tuzilishi quyidagicha:

```
backend-for-booking/
├── app/
│   └── api/              # API Endpoint'lari (Marshrutlar)
│       ├── admin/        # Admin dashboard, to'yxonalarni tasdiqlash API'lari
│       ├── auth/         # Ro'yxatdan o'tish, kirish, OTP va parolni tiklash
│       ├── bookings/     # To'yxonalarni band qilish va to'lov holati
│       ├── chat/         # Foydalanuvchilar o'rtasidagi chat tizimi API'si
│       ├── halls/        # To'yxonalar CRUD, qidiruv va bandlik kalendari
│       ├── payments/     # Stripe integratsiyasi va to'lovlar marshruti
│       ├── reviews/      # Mijozlar sharhlari va reytinglar
│       └── services/     # Xonanda, mashina va boshqa xizmatlarni boshqarish
├── lib/                  # Tizimning yadro qismi (Core Library)
│   ├── auth.ts           # Foydalanuvchi paroli shifrlanishi va tekshiruvi
│   ├── db.ts             # Custom Prisma ORM Proxy va PostgreSQL ulanishi
│   └── validations.ts    # Zod validatsiya sxemalari
├── scripts/              # Baza jadvallarini yaratish va ko'chirish migratsiyalari
├── middleware.ts         # Global RBAC va Token himoya qatlami
└── package.json          # Loyiha sozlamalari
```

### 4.2 Frontend Papkalar Strukturasi
Frontend [wedding-platform-premium](file:///c:/Users/artik/OneDrive/Desktop/wedding-platform-premium/) papkasida joylashgan bo'lib, uning tuzilishi quyidagicha:

```
wedding-platform-premium/
├── src/
│   ├── app/              # Next.js App Router (Sahifalar va API-lar)
│   │   ├── (auth)/       # Login, Register, Parolni tiklash sahifalari
│   │   ├── (client)/     # Mijozning shaxsiy sahifalari (Favorites, My Bookings)
│   │   ├── admin/        # Admin boshqaruv paneli sahifalari
│   │   ├── owner/        # To'yxona egalari uchun boshqaruv paneli
│   │   ├── api/          # Mahalliy API endpointlari (Email jo'natish)
│   │   ├── globals.css   # Global stillar
│   │   └── page.tsx      # Landing Page (Bosh sahifa)
│   ├── components/       # Qayta ishlatiladigan UI komponentlari
│   │   ├── layout/       # Header, Footer, Sidebar va boshqalar
│   │   ├── shared/       # Calendar, HallCard kabi umumiy komponentlar
│   │   └── ui/           # Modal, Toast kabi kichik elementlar
│   ├── context/          # Global holat boshqaruvi
│   │   └── AuthContext.tsx # Tizimga kirish/chiqish va foydalanuvchi sessiyasi
│   ├── lib/              # Yordamchi sozlamalar
│   │   ├── api.ts        # Axios interceptor'lar (Avtomatik token yangilash)
│   │   └── smtp.ts       # SMTP Nodemailer konfiguratsiyasi
│   └── types/            # TypeScript turlari va interfeyslari
│       └── index.ts      # Ma'lumotlar modeli turlari (User, Hall, Booking)
└── tests/
    └── basic.spec.ts     # Playwright E2E sinov testlari
```

---

## 🔒 5. Xavfsizlik, Avtomatik Token Yangilash va Kirish Nazorati

### 5.1 Tokenlar orqali Autentifikatsiya va RBAC
*   Tizimga kirganda JWT Access va Refresh tokenlar yaratilib, frontend'ga yuboriladi va localStorage'ga saqlanadi.
*   Backend dagi [middleware.ts](file:///c:/Users/artik/OneDrive/Desktop/backend-for-booking/middleware.ts) fayli har bir so'rovni tekshirib, foydalanuvchi rolini (CUSTOMER, OWNER, ADMIN) kerakli API huquqiga solishtiradi.

### 5.2 Axios Interceptors va Token Rotation (Transparent Refresh)
Foydalanuvchi tajribasini buzmaslik uchun [src/lib/api.ts](file:///c:/Users/artik/OneDrive/Desktop/wedding-platform-premium/src/lib/api.ts) faylida quyidagi Axios mexanizmi o'rnatilgan:
1.  **Request Interceptor:** Har bir so'rovga localStorage'dan olingan Access Token'ni `Authorization: Bearer <token>` ko'rinishida qo'shadi.
2.  **Response Interceptor:** Agar so'rov `401 Unauthorized` xatosini qaytarsa, u avtomatik tarzda to'xtatiladi. Tizim orqa fonda Refresh Token yordamida `/api/auth/refresh` endpoint'iga so'rov yuborib yangi Access Token oladi. Keyin yangi token bilan dastlabki xato bergan so'rovni qayta yuboradi. Agar Refresh Token ham eskirgan bo'lsa, foydalanuvchi login sahifasiga yo'naltiriladi.

---

## 📊 6. Ma'lumotlar Bazasi Modeli (Database Schema)

PostgreSQL ma'lumotlar bazasida 20 dan ortiq o'zaro bog'liq jadvallar mavjud bo'lib, ular to'liq munosabatlar bilan ta'minlangan. Barcha ma'lumot turlari [src/types/index.ts](file:///c:/Users/artik/OneDrive/Desktop/wedding-platform-premium/src/types/index.ts) da TypeScript interfeyslari orqali belgilangan:

1.  **User & Security:** `User`, `OTP`, `RefreshToken`, `Address` — foydalanuvchilar va ularning xavfsizlik seanslarini saqlaydi.
2.  **Hall Profile:** `HallProfile`, `HallAmenity`, `HallCalendar`, `HallImage`, `HallOwner` — to'yxonalarning nomi, sig'imi, narxi, qulayliklari, rasmlari, bandlik kunlari va ularga biriktirilgan egalarni boshqaradi.
3.  **Services:** `ServiceProvider`, `Singer`, `Car`, `Menu`, `MenuItem` — nikoh to'yi uchun taklif etiladigan qo'shimcha xizmatlar va to'yxona taomnomalari.
4.  **Transactions:** `Booking`, `ServiceBooking`, `Payment`, `Invoice` — buyurtmalar, to'lovlar va hisob-fakturalarni boshqaradi.
5.  **Interactions & Metrics:** `Review` (sharhlar), `Favorite` (saralanganlar), `ChatMessage` / `Conversation` (chat loglari), `Notification` (bildirishnomalar), `Invitation` (taklifnomalar), `DailyMetric` / `OwnerAnalytic` / `AdminAnalytic` (tahliliy ma'lumotlar).

---

## 🧪 7. Avtomatlashtirilgan Testlash (Testing Setup)

*   **Backend unit va integratsion testlari:** API endpoint'larining to'g'ri ishlashi va xavfsizligi `Jest` hamda `Supertest` orqali tekshiriladi.
*   **Frontend End-to-End (E2E) testlari:** [tests/basic.spec.ts](file:///c:/Users/artik/OneDrive/Desktop/wedding-platform-premium/tests/basic.spec.ts) faylida Playwright yordamida quyidagi ssenariylar avtomatik sinovdan o'tadi:
    *   Bosh sahifaning muvaffaqiyatli yuklanishi.
    *   Sayt footer qismidagi aloqa pochtasining to'g'riligi.
    *   `/login` va `/register` sahifalaridagi formalarning mavjudligi.
    *   `/api/email` API endpointining noto'g'ri ma'lumot kiritilgandagi validatsiya javobi.

---

## 📝 Xulosa

**Weddingly** platformasi to'liq va professional arxitekturaga ega bo'lib, frontend va backend qismlari bir-biri bilan xavfsiz JWT token aylanishi, ma'lumotlar validatsiyasi (Zod), va qat'iy tiplash (TypeScript) orqali bog'langan. Tizim o'zining yengil custom DB yondashuvi (Custom Prisma Proxy) va yuqori darajadagi xavfsizlik choralari bilan ajralib turadi.
