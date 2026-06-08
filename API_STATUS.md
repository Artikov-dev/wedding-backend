# API Status Report
**Test qilingan sana:** 2026-06-09  
**Backend URL:** https://wedding-backend-8.onrender.com  
**Test qilingan:** 46 endpoint (+ ba'zi sub-endpointlar)

---

## ✅ ISHLAYDIGAN ENDPOINTLAR (43 ta)

### 🌐 Public (Auth talab qilmaydi)
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/health` | Server holati |
| GET | `/api/stats` | Umumiy statistika |
| GET | `/api/halls/search` | Zallarni qidirish |
| GET | `/api/regions` | Viloyatlar ro'yxati |
| GET | `/api/districts` | Tumanlar ro'yxati |
| GET | `/api/singers` | Qo'shiqchilar ro'yxati |
| GET | `/api/cars` | Mashinalar ro'yxati |
| GET | `/api/docs` | Swagger UI |

### 🔐 Auth
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| POST | `/api/auth/login` | Login — `{email, password}` |
| POST | `/api/auth/register` | Ro'yxatdan o'tish — `{email, phone, password, firstName, lastName, role}` |
| POST | `/api/auth/forgot-password` | Parol tiklash so'rovi — `{email}` |
| POST | `/api/auth/verify-otp` | OTP tekshirish — `{email, code, purpose}` |
| POST | `/api/auth/reset-password` | Yangi parol — `{email, code, newPassword}` |
| GET | `/api/auth/me` | Joriy foydalanuvchi profili |

> ⚠️ `POST /api/auth/refresh` — faqat haqiqiy refreshToken bilan ishlaydi (dummy bilan 401)

### 👤 Admin — Foydalanuvchilar
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/users` | Barcha userlar `?role=CUSTOMER&search=...&page=1&limit=20` |
| GET | `/api/admin/users/{userId}` | User tafsilotlari (HALL_OWNER bo'lsa hall ma'lumoti ham) |
| PUT | `/api/admin/users/{userId}` | User yangilash — `{firstName, lastName, phone, role, status}` |
| DELETE | `/api/admin/users/{userId}` | User o'chirish |

### 🏠 Admin — Zal egalari
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/owners` | Barcha HALL_OWNER lar + hall ma'lumoti `?search=...` |
| POST | `/api/owners` | Yangi owner yaratish — `{email, phone, firstName, lastName}` |
| GET | `/api/owners/{id}` | Owner tafsilotlari |
| PUT | `/api/owners/{id}` | Owner yangilash — `{firstName, lastName, phone}` |
| DELETE | `/api/owners/{id}` | Owner o'chirish (zali bo'lsa o'chirib bo'lmaydi) |

### 🏛️ Admin — Zallar
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/admin/halls` | Barcha zallar + egalari `?approvalStatus=PENDING&search=...` |
| GET | `/api/admin/hall-approvals` | Tasdiqlash so'rovlari `?status=PENDING` |

### 📊 Admin — Statistika
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/admin/dashboard` | Umumiy ko'rsatkichlar `?type=overview` (default) |
| GET | `/api/admin/dashboard?type=analytics` | To'liq analitika |
| GET | `/api/admin/dashboard?type=trends` | 12 oylik trend |

### 🏟️ Zallar
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| POST | `/api/halls/create` | Zal yaratish — `{name, description, capacity, pricePerPlate, category, advancePercentage?, imageUrl?}` |
| GET | `/api/halls/{hallId}` | Zal tafsilotlari (amenities, reviews, services bilan) |
| PUT | `/api/halls/{hallId}` | Zal yangilash |
| DELETE | `/api/halls/{hallId}` | Zal o'chirish |
| GET | `/api/halls/{hallId}/amenities` | Zal qulayliklari |

> ⚠️ `POST /api/halls/{hallId}/amenities` — faqat **HALL_OWNER** o'z zaliga qo'sha oladi, ADMIN qo'sha olmaydi (403)

### 📅 Bronlar
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/bookings` | Bronlar ro'yxati (admin — hammasi, customer — o'ziniki, owner — o'z zalidagi) |
| GET | `/api/bookings/{bookingId}` | Bron tafsilotlari |
| PUT | `/api/bookings/{bookingId}` | Bron yangilash — `{notes, eventDate, eventTime, numberOfGuests}` yoki `{status}` |
| DELETE | `/api/bookings/{bookingId}` | Bronni bekor qilish (status = CANCELLED) |
| POST | `/api/bookings/create` | Yangi bron — `{hallId, eventDate (ISO format), eventTime, numberOfGuests}` |
| GET | `/api/my-bookings` | **Faqat CUSTOMER** — o'zining bronlari |

> ⚠️ `eventDate` formati: `"2026-12-25T10:00:00.000Z"` (ISO 8601)

### ❤️ Sevimlilar
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/favorites` | Sevimli zallar ro'yxati |
| POST | `/api/favorites` | Qo'shish — `{hallId}` |
| DELETE | `/api/favorites/{hallId}` | O'chirish |

### 💳 To'lovlar
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/payments` | To'lovlar ro'yxati |
| POST | `/api/payments/create` | To'lov yaratish — `{bookingId, paymentType, paymentMethod, amount}` |

> ⚠️ `amount` — bronning `advanceAmount` yoki `finalAmount` ga teng bo'lishi kerak (±0.01 tolerans)  
> `paymentType`: `ADVANCE` | `FINAL` | `SERVICE`  
> `paymentMethod`: `CREDIT_CARD` | `DEBIT_CARD` | `BANK_TRANSFER` | `CASH` | `STRIPE`

### ⭐ Sharhlar
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/reviews` | Sharhlar (admin — hammasi, boshqalar — o'ziniki) `?hallId=...` |
| POST | `/api/reviews/create` | Sharh yozish — `{hallId, rating (1-5), comment?}` |

### 🔔 Bildirishnomalar
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/notifications` | Bildirishnomalar ro'yxati |
| PATCH | `/api/notifications/{id}` | O'qilgan deb belgilash |
| DELETE | `/api/notifications/{id}` | O'chirish |

### 💬 Chat
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/chat/conversations` | Suhbatlar ro'yxati |
| POST | `/api/chat/conversations` | Suhbat yaratish — `{participantIds: [id1, id2]}` |
| GET | `/api/chat/conversations/{conversationId}` | Suhbat xabarlari |
| POST | `/api/chat/messages` | Xabar yuborish — `{conversationId, content}` |

### 📩 Taklifnomalar
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/invitations` | Taklifnomalar ro'yxati |
| POST | `/api/invitations/create` | Yuborish — `{bookingId, guestEmails: [...], message?, guestCount?}` |
| PATCH | `/api/invitations/{invitationId}` | Status yangilash — `{status: "ACCEPTED" \| "DECLINED"}` |

### 🎵 Xizmatlar
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/services` | Xizmat ko'rsatuvchilar ro'yxati |
| POST | `/api/services` | Yangi xizmat — `{name, serviceType, pricing}` (**faqat SERVICE_PROVIDER**) |
| GET | `/api/services/{serviceId}` | Xizmat tafsilotlari |
| PUT | `/api/services/{serviceId}` | Xizmat yangilash |
| DELETE | `/api/services/{serviceId}` | Xizmat o'chirish |

> `serviceType`: `SINGER` | `CAR` | `MENU` | `KARNAY` | `DECORATION` | `PHOTOGRAPHY` | `VIDEOGRAPHY`

---

## ❌ ISHLAMAYDIGAN ENDPOINTLAR (3 ta)

| Method | Endpoint | Xato | Sabab |
|--------|----------|------|-------|
| POST | `/api/halls/{hallId}/amenities` | 403 Forbidden | Admin zal egasi emas — faqat HALL_OWNER o'z zaliga qo'sha oladi |
| POST | `/api/payments/stripe` | 500 Internal Server Error | Stripe integratsiyasi sozlanmagan (STRIPE_SECRET_KEY yo'q) |
| GET | `/api/payments/stripe` | 400 Bad Request | Stripe integratsiyasi sozlanmagan |

---

## ⚠️ FRONTEND UCHUN MUHIM ESLATMALAR

### 1. Authentication
- Login qilgandan keyin `token` va `refreshToken` ni `localStorage` ga saqlang
- Har bir so'rovga `Authorization: Bearer {token}` header qo'shing
- Token muddati tugasa `POST /api/auth/refresh` bilan yangilang

### 2. Role asosida ko'rsatish
```
ADMIN      → /api/admin/*, /api/users, /api/owners, /api/bookings (hammasi)
HALL_OWNER → /api/halls/create, /api/bookings (o'z zalidagi), /api/halls/{id}/amenities
CUSTOMER   → /api/my-bookings, /api/bookings/create, /api/favorites, /api/reviews/create
SERVICE_PROVIDER → /api/services (POST/PUT/DELETE)
```

### 3. Muhim format talablari
| Field | To'g'ri format | Noto'g'ri |
|-------|---------------|-----------|
| `eventDate` | `"2026-12-25T10:00:00.000Z"` | `"2026-12-25"` |
| `amount` (payment) | Bronning `advanceAmount` qiymati | Boshqa son |
| `participantIds` (chat) | Kamida 2 ta ID | 1 ta ID |
| `guestEmails` (invitation) | Array: `["a@b.com"]` | String |

### 4. Pagination
Barcha list endpointlarida:
```json
{
  "page": 1,
  "limit": 20,
  "total": 80,
  "pages": 4
}
```
Query params: `?page=1&limit=20`

### 5. Javob formati (har doim)
```json
{
  "success": true,
  "data": { ... },
  "message": "...",
  "statusCode": 200
}
```

---

## 🛠️ FRONTENDDA QO'SHILISHI KERAK

### Hali frontend ga ulanmagan endpointlar:
1. **`GET /api/admin/halls`** — Admin panel: barcha zallar + egasi
2. **`GET /api/admin/users/{userId}`** — User detail sahifasi
3. **`PUT /api/admin/users/{userId}`** — User holati (ban/unban) tugmasi
4. **`DELETE /api/admin/users/{userId}`** — User o'chirish
5. **`GET /api/owners`** — Zal egalari ro'yxati (admin panel)
6. **`POST /api/owners`** — Yangi zal egasi yaratish (admin)
7. **`GET /api/admin/dashboard?type=analytics`** — Analitika sahifasi
8. **`GET /api/admin/dashboard?type=trends`** — Grafik (12 oylik trend)
9. **`GET /api/reviews`** — Sharhlar sahifasi
10. **`GET /api/auth/me`** — Profil sahifasi
11. **`GET /api/stats`** — Bosh sahifada statistika (public)
12. **`POST /api/invitations/create`** — Taklifnoma yuborish
13. **`GET /api/chat/conversations`** — Chat bo'limi
14. **`POST /api/chat/messages`** — Xabar yuborish

---

*Oxirgi yangilanish: 2026-06-09*
