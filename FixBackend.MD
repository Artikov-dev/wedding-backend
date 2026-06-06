# Backend Fix Log

**Sana:** 2026-06-07  
**Muhandis:** Claude Sonnet 4.6  
**Backend URL:** `https://wedding-backend-8.onrender.com`

---

## OLDINGI SESSION FIXLARI (1-sesiya)

### FIX-01 — `POST /api/auth/verify-otp` — KRITIK ✅

**Muammo:** Backend `userId` kutardi, lekin frontend `email` yuboradi. `forgot-password` xavfsizlik sababli `userId` qaytarmaydi — shuning uchun flow butunlay ishlamas edi.

**O'zgartirilgan fayllar:**
- `lib/validations.ts` — `verifyOtpSchema`: `userId` → `email`, `purpose` optional qilindi
- `app/api/auth/verify-otp/route.ts` — email bo'yicha user topib `userId` o'zi resolve qiladi; `purpose` default `email_verification`

**Eski so'rov (ishlamasdi):**
```json
{ "userId": "xxx", "code": "123456", "purpose": "email_verification" }
```
**Yangi to'g'ri so'rov:**
```json
{ "email": "user@example.com", "code": "123456" }
```

---

### FIX-02 — `POST /api/auth/reset-password` — KRITIK ✅

**Muammo:** Backend `userId` kutardi, lekin frontend `email` + `otp` + `newPassword` yuboradi. `userId` hech qachon frontendga berilmaydi.

**O'zgartirilgan fayllar:**
- `lib/validations.ts` — `resetPasswordSchema`: `userId` → `email`
- `app/api/auth/reset-password/route.ts` — email bo'yicha user topadi

**Yangi to'g'ri so'rov:**
```json
{ "email": "user@example.com", "code": "123456", "newPassword": "newPass123" }
```

---

### FIX-03 — `POST /api/payments/create` — Decimal vs Number bug ✅

**Muammo:** Prisma `Decimal` tipidagi `advanceAmount`/`finalAmount` JavaScript `number` bilan `!==` taqqoslanib, har doim `false` qaytarardi.

**O'zgartirilgan fayl:** `app/api/payments/create/route.ts`

```typescript
// ESKI (xato):
if (paymentType === 'ADVANCE' && amount !== booking.advanceAmount)

// YANGI (to'g'ri):
if (paymentType === 'ADVANCE' && amount !== Number(booking.advanceAmount))
if (paymentType === 'FINAL' && amount !== Number(booking.finalAmount))
```

**To'g'ri so'rov formati:**
```json
{
  "bookingId": "booking-id",
  "amount": 937.5,
  "paymentType": "ADVANCE",
  "paymentMethod": "CASH"
}
```

**`paymentMethod` enum qiymatlari:**
- `CREDIT_CARD` | `DEBIT_CARD` | `BANK_TRANSFER` | `CASH` | `STRIPE`

**`paymentType` enum qiymatlari:**
- `ADVANCE` | `FINAL` | `SERVICE`

---

### FIX-04 — `lib/auth.ts` — `revokeRefreshToken` eksport yo'q ✅

**Muammo:** `app/api/auth/refresh/route.ts` `revokeRefreshToken`ni import qilardi, lekin `lib/auth.ts`da bu funksiya yo'q edi — runtime xato.

**O'zgartirilgan fayl:** `lib/auth.ts`

```typescript
export async function revokeRefreshToken(token: string): Promise<void> {
  await prisma.refreshToken.deleteMany({ where: { token } });
}
```

---

### FIX-05 — `lib/email.ts` — fayl yo'q edi ✅

**Muammo:** `app/api/auth/forgot-password/route.ts` `@/lib/email` ni import qilardi, lekin fayl mavjud emas edi — build xato berardi.

**Yaratilgan fayl:** `lib/email.ts`

Nodemailer asosida OTP email yuborish. Env vars:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your@gmail.com
```

`sendOTPEmail(email, otp, purpose)` — `purpose`: `email_verification` | `password_reset` | `phone_verification`

---

## JORIY SESSION FIXLARI (2-sesiya)

### FIX-06 — `POST /api/auth/register` — OTP email yuborilmasdi ✅

**Muammo:** Register bo'lgandan keyin OTP `console.log` ga chiqarilardi — foydalanuvchiga email yuborilmasdi.

**O'zgartirilgan fayl:** `app/api/auth/register/route.ts`

```typescript
// ESKI:
console.log(`[Auth] OTP for ${email}: ${otp}`);

// YANGI:
await sendOTPEmail(email, otp, 'email_verification').catch((err) =>
  console.error('[Auth] OTP email send failed:', err)
);
```

Email yuborishda xato bo'lsa ham register muvaffaqiyatli davom etadi (non-blocking).

---

### FIX-07 — `PUT /api/bookings/:bookingId` — Raw body validationsiz qabul qilinar edi ✅

**Muammo:** PUT handler `body`ni to'g'ridan-to'g'ri Prisma'ga uzatardi — istalgan field yangilanishi mumkin edi (xavfli mass assignment).

**O'zgartirilgan fayl:** `app/api/bookings/[bookingId]/route.ts`

`updateBookingSchema` bilan validation qo'shildi. Faqat ruxsat etilgan fieldlar: `eventDate`, `eventTime`, `numberOfGuests`, `notes`.

---

### FIX-08 — `PUT /api/halls/:hallId` — Raw body validationsiz qabul qilinar edi ✅

**Muammo:** PUT handler `body`ni to'g'ridan-to'g'ri Prisma'ga uzatardi — `approvalStatus`, `userId` kabi tizim fieldlari ham o'zgartirilishi mumkin edi (kritik xavfsizlik teshigi).

**O'zgartirilgan fayl:** `app/api/halls/[hallId]/route.ts`

`updateHallSchema` bilan validation qo'shildi. Faqat ruxsat etilgan fieldlar: `name`, `description`, `category`, `capacity`, `pricePerPlate`, `advancePercentage`, `imageUrl`, `amenities`.

---

### FIX-09 — `POST /api/payments/stripe` — noto'g'ri payment status ✅

**Muammo:** Stripe payment yaratishda `status: 'ADVANCE_PAID'` ishlatilgan — bu `PaymentStatus` enum qiymati emas (`ADVANCE_PAID` booking'ning `paymentStatus` fieldi).

**O'zgartirilgan fayl:** `app/api/payments/stripe/route.ts`

```typescript
// ESKI (noto'g'ri enum):
status: 'ADVANCE_PAID'

// YANGI (to'g'ri PaymentStatus enum):
status: 'COMPLETED'
```

**`Payment.status` to'g'ri qiymatlari:** `PENDING` | `COMPLETED` | `FAILED` | `REFUNDED`

---

### FIX-10 — `GET /api/owner/dashboard` — `averageRating` doim 0 qaytarardi ✅

**Muammo:** `averageRating` hisoblanayotganda `halls.reduce((sum, h) => sum + 0, 0)` — `h.ratings` o'rniga `0` qo'shilgan edi. `ratings` field ham select qilinmagan edi.

**O'zgartirilgan fayl:** `app/api/owner/dashboard/route.ts`

```typescript
// ESKI (bug):
averageRating: halls.reduce((sum, h) => sum + 0, 0) / halls.length || 0

// YANGI (to'g'ri):
averageRating: halls.length > 0
  ? halls.reduce((sum, h) => sum + Number(h.ratings || 0), 0) / halls.length
  : 0
```

`select`ga `ratings: true` qo'shildi.

---

### FIX-11 — `middleware.ts` — Hall detail va services GET uchun auth talab qilinar edi ✅

**Muammo:** `GET /api/halls/:hallId` va `GET /api/services` ga token bo'lmagan foydalanuvchilar kira olmasdi — bu UX muammosi (ro'yxatdan o'tmagan foydalanuvchi zallarni ko'ra olishi kerak).

**O'zgartirilgan fayl:** `middleware.ts`

```typescript
// Yangi qo'shilgan: GET method uchun public routes
const publicGetRoutes = ['/api/halls', '/api/services'];
if (request.method === 'GET' && publicGetRoutes.some((r) =>
  pathname === r || pathname.startsWith(`${r}/`)
)) {
  return NextResponse.next();
}
```

POST/PUT/DELETE `/api/halls` va `/api/services` uchun auth hali ham talab qilinadi.

---

### FIX-12 — `POST /api/invitations/create` — Tizimda ro'yxatdan o'tmagan mehmon uchun taklif DB ga saqlanmasdi ✅

**Muammo:** Emaili topilmagan mehmon uchun taklif faqat xotira massiviga qo'shilar edi (`push`) — DB ga saqlanmasdi. To'ydan keyin taklifnomalarni ko'rib bo'lmasdi.

**O'zgartirilgan fayl:** `app/api/invitations/create/route.ts`

```typescript
// YANGI: Har doim DB ga saqlash, userId null bo'lsa ham
const invitation = await prisma.invitation.create({
  data: {
    bookingId,
    userId: invitedUser?.id ?? null,   // null bo'lishi mumkin
    invitedByUserId: userId,
    guestEmail: email,                  // har doim saqlanadi
    guestCount: guestCount || 1,
    message,
  },
});
```

Registered user bo'lsa notification ham yuboriladi.

---

## FRONTEND UCHUN KERAKLI O'ZGARISHLAR (Backend to'g'ri, Frontend xato)

### F-01 — Register: `role: 'client'` → `role: 'CUSTOMER'`

```typescript
// AuthContext.tsx:59 — TO'G'RI ENUM:
role: 'CUSTOMER'  // 'client' emas

// Barcha rollar:
'ADMIN' | 'HALL_OWNER' | 'SERVICE_PROVIDER' | 'CUSTOMER'
```

### F-02 — Bookings: `eventDate` format

```typescript
// TO'G'RI:
eventDate: new Date(selectedDate).toISOString()  // "2024-12-25T00:00:00.000Z"
// NOTO'G'RI:
eventDate: "2024-12-25"  // Backend datetime kutadi
```

### F-03 — Payments: To'g'ri fieldlar

```typescript
// halls/[hallId]/page.tsx — TO'G'RI:
await api.post('/api/payments/create', {
  bookingId,
  amount: advancePrice,           // number (e.g. 937.5)
  paymentType: 'ADVANCE',         // 'ADVANCE' | 'FINAL' | 'SERVICE'
  paymentMethod: 'CASH',          // 'CREDIT_CARD' | 'DEBIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'STRIPE'
});
// paymentMethodId KERAK EMAS — bu faqat Stripe endpoint uchun (/api/payments/stripe)
```

---

## API ENDPOINTS TO'LIQ RO'YXATI

### Auth
| Method | Endpoint | Auth | Body |
|--------|----------|------|------|
| POST | `/api/auth/register` | No | `{email, phone, password, firstName, lastName, role?}` |
| POST | `/api/auth/login` | No | `{email, password}` |
| POST | `/api/auth/verify-otp` | No | `{email, code, purpose?}` |
| POST | `/api/auth/forgot-password` | No | `{email}` |
| POST | `/api/auth/reset-password` | No | `{email, code, newPassword}` |
| POST | `/api/auth/refresh` | No | `{refreshToken}` |

### Halls
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/halls/search` | No | `?city=&capacity=&minPrice=&maxPrice=&category=&page=&limit=` |
| GET | `/api/halls/:hallId` | No | Hamma ko'ra oladi |
| POST | `/api/halls/create` | HALL_OWNER | `{name, description, capacity, pricePerPlate, ...}` |
| PUT | `/api/halls/:hallId` | HALL_OWNER (owner) | `{name?, description?, capacity?, ...}` |
| DELETE | `/api/halls/:hallId` | HALL_OWNER (owner) | — |
| GET | `/api/halls/:hallId/amenities` | No | — |
| POST | `/api/halls/:hallId/amenities` | HALL_OWNER | `{name, description?}` |
| GET | `/api/halls/calendar` | No | `?hallId=&startDate=&endDate=` |
| POST | `/api/halls/calendar` | HALL_OWNER/ADMIN | `{date, isAvailable, notes?}` |

### Bookings
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/bookings` | Required | Rolga qarab filter |
| POST | `/api/bookings/create` | Required | `{hallId, eventDate(ISO8601), eventTime, numberOfGuests, notes?, services?}` |
| GET | `/api/bookings/:bookingId` | Required | Owner yoki customer |
| PUT | `/api/bookings/:bookingId` | Required | `{eventDate?, eventTime?, numberOfGuests?, notes?}` |
| DELETE | `/api/bookings/:bookingId` | Required | Status CANCELLED ga o'tkazadi |
| GET | `/api/my-bookings` | CUSTOMER | — |
| GET | `/api/my-bookings/:bookingId` | CUSTOMER | — |

### Payments
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/payments` | Required | To'lovlar tarixi |
| POST | `/api/payments/create` | Required | `{bookingId, amount, paymentType, paymentMethod}` |
| POST | `/api/payments/stripe` | Required | `{bookingId, amount, paymentMethodId}` |

### Favorites
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/favorites` | Required | — |
| POST | `/api/favorites` | Required | `{hallId}` |
| DELETE | `/api/favorites/:hallId` | Required | — |

### Services
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/services` | No | `?serviceType=&page=&limit=&minRating=` |
| POST | `/api/services` | SERVICE_PROVIDER | `{name, serviceType, pricing, ...}` |
| GET | `/api/services/:serviceId` | No | — |
| PUT | `/api/services/:serviceId` | SERVICE_PROVIDER (owner) | — |
| DELETE | `/api/services/:serviceId` | SERVICE_PROVIDER (owner) | — |

### Notifications
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/notifications` | Required | `?isRead=true/false&page=&limit=` |
| PATCH | `/api/notifications/:notificationId` | Required | Mark as read |
| DELETE | `/api/notifications/:notificationId` | Required | — |

### Reviews
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/api/reviews/create` | Required | `{rating, comment?, hallId? OR serviceProviderId?}` |

### Invitations
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/invitations` | Required | — |
| POST | `/api/invitations/create` | Required | `{bookingId, guestEmails[], message?, guestCount?}` |
| PATCH | `/api/invitations/:invitationId` | Required | `{status: "ACCEPTED"/"DECLINED"}` |

### Owner Panel
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/owner/dashboard` | HALL_OWNER | `?type=overview/revenue/analytics` |
| GET | `/api/owner/bookings` | HALL_OWNER | `?hallId=&status=&page=&limit=` |
| GET | `/api/owner/bookings/:bookingId` | HALL_OWNER | — |
| PATCH | `/api/owner/bookings/:bookingId/status` | HALL_OWNER | `{status}` |

### Admin Panel
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/admin/dashboard` | ADMIN | `?type=overview/analytics/trends` |
| GET | `/api/admin/hall-approvals` | ADMIN | `?status=PENDING` |
| PATCH | `/api/admin/hall-approvals/:id/approve` | ADMIN | `{adminComment?}` |
| PATCH | `/api/admin/hall-approvals/:id/reject` | ADMIN | `{adminComment}` |
| GET | `/api/owners` | ADMIN | — |
| POST | `/api/owners` | ADMIN | `{email, phone, firstName, lastName}` |
| POST | `/api/admin/assign-owner` | ADMIN | `{hallId, ownerId}` |
| DELETE | `/api/admin/assign-owner` | ADMIN | `?hallId=&ownerId=` |

### Singers / Cars / Menus
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/singers` | No | `?status=AVAILABLE&search=` |
| POST | `/api/singers` | ADMIN | `{name, price, ...}` |
| GET | `/api/cars` | No | `?status=AVAILABLE&search=` |
| POST | `/api/cars` | ADMIN | `{name, model, price, ...}` |
| GET | `/api/menus` | No | — |

### Chat
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/chat/conversations` | Required | — |
| POST | `/api/chat/conversations` | Required | `{participantIds[]}` |

### Regions / Districts
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/api/regions` | No | — |
| GET | `/api/districts` | No | — |

### Upload
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/api/upload` | Required | FormData: `{file, imageType: "HALL"/"SERVICE"/"PROFILE"}` |

---

## ENVIRONMENT VARIABLES

```env
DATABASE_URL=...
JWT_SECRET=...
JWT_EXPIRY=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your@gmail.com

STRIPE_SECRET_KEY=sk_...   # Stripe integratsiya qilinmagan (placeholder)
CLOUDINARY_URL=...          # Upload integratsiya qilinmagan (placeholder)
```

---

## QOLGAN TODO (hali qilinmagan)

| # | Muammo | Faylar | Prioritet |
|---|--------|--------|-----------|
| 1 | Stripe real integratsiya | `payments/stripe/route.ts` | O'rta |
| 2 | Cloudinary real integratsiya | `upload/route.ts` | O'rta |
| 3 | Chat messages API to'liq | `chat/messages/route.ts` | Past |
| 4 | Reviews GET endpoint yo'q | Yangi fayl kerak | O'rta |
| 5 | User profile GET/PUT endpoint | Yangi fayl kerak | Yuqori |
