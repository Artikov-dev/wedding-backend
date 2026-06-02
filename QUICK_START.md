# Weddingly Backend - Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (1 min)
```bash
cd /path/to/project
pnpm install
```

### Step 2: Setup Database (2 min)
```bash
# Copy environment file
cp .env.example .env.local

# Update DATABASE_URL in .env.local
# Then run migrations
pnpm db:generate
pnpm db:migrate
```

### Step 3: Start Server (1 min)
```bash
pnpm dev
```

### Step 4: Verify Server (1 min)
```bash
# In another terminal
curl http://localhost:3000/api/health
```

---

## 📖 Key Commands

### Development
```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Run production server
pnpm lint             # Check code quality
```

### Database
```bash
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open visual database editor
pnpm db:reset         # Reset database (dev only!)
pnpm db:seed          # Seed sample data
```

---

## 🧪 Quick API Tests

### 1. Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "1234567890",
    "password": "TestPassword123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

### 3. Search Halls
```bash
# Copy token from login response and use below
curl http://localhost:3000/api/halls/search?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Create Booking
```bash
curl -X POST http://localhost:3000/api/bookings/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "hallId": "HALL_ID",
    "eventDate": "2024-06-15T00:00:00Z",
    "eventTime": "19:00",
    "numberOfGuests": 300
  }'
```

---

## 📁 Project Structure at a Glance

```
app/api/
├── auth/              ← Authentication (register, login, OTP, password)
├── halls/             ← Wedding hall management (CRUD, search)
├── bookings/          ← Booking system (create, list, update, cancel)
├── payments/          ← Payment processing (advance, final, Stripe)
├── services/          ← Service providers (singers, cars, catering)
├── reviews/           ← Reviews and ratings
├── favorites/         ← User favorites
├── notifications/     ← Notification system
├── chat/              ← Messaging (conversations, messages)
├── invitations/       ← Event invitations
└── health/            ← Health check endpoint

lib/
├── db.ts              ← Prisma client
├── auth.ts            ← JWT, OTP, password hashing
├── api-response.ts    ← Response helpers
├── validations.ts     ← Zod schemas
└── utils.ts           ← Utility functions

prisma/
└── schema.prisma      ← 20 database models
```

---

## 🔐 Authentication Flow

1. **Register**: POST `/auth/register` → Get JWT + RefreshToken
2. **Login**: POST `/auth/login` → Get JWT + RefreshToken
3. **Protected Route**: Include `Authorization: Bearer JWT_TOKEN`
4. **Token Expired**: POST `/auth/refresh` with refreshToken → Get new JWT
5. **Forgot Password**: POST `/auth/forgot-password` → Get OTP
6. **Reset Password**: POST `/auth/reset-password` with OTP → New password set

---

## 💾 Database Models Quick Reference

### Users & Auth
- `User` - User accounts
- `OTP` - One-time passwords
- `RefreshToken` - Token management

### Wedding Halls
- `HallProfile` - Hall information
- `HallAmenity` - Amenities (AC, Parking, etc.)
- `HallService` - Services (Singers, Cars, etc.)

### Bookings & Payments
- `Booking` - Booking records
- `ServiceBooking` - Service bookings
- `Payment` - Payment transactions
- `Invoice` - Invoice records

### Reviews & Interactions
- `Review` - User reviews and ratings
- `Favorite` - Favorite halls
- `ChatMessage` - Direct messages
- `Conversation` - Chat conversations
- `Notification` - User notifications
- `Invitation` - Event invitations

---

## ⚙️ Environment Variables

### Required
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
```

### Optional (Email, Payments, etc.)
```
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=app-password
STRIPE_SECRET_KEY=sk_test_...
```

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check connection
psql $DATABASE_URL -c "SELECT 1"

# Recreate migrations
pnpm db:reset
```

### Port 3000 Already in Use
```bash
# Mac/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Prisma Client Missing
```bash
pnpm install @prisma/client
pnpm db:generate
```

### Invalid JWT Token
```bash
# Token may be expired - use refresh endpoint
# Or register/login again for new token
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `API_DOCUMENTATION.md` | Complete API reference (all endpoints) |
| `SETUP_GUIDE.md` | Detailed setup and deployment guide |
| `BACKEND_IMPLEMENTATION_SUMMARY.md` | Architecture and features overview |
| `QUICK_START.md` | This file - quick reference |

---

## 🎯 Common Workflows

### Workflow 1: Test User Registration & Login
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","phone":"1234567890","password":"Pass123!","firstName":"John","lastName":"Doe","role":"CUSTOMER"}'

# Login (copy token from response)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Pass123!"}'
```

### Workflow 2: Hall Owner Setup
```bash
# Register as HALL_OWNER
# Login to get token
# Create hall profile
curl -X POST http://localhost:3000/api/halls/create \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Grand Hall","description":"Luxury venue","capacity":500,"pricePerPlate":1500}'
```

### Workflow 3: Customer Booking
```bash
# Register as CUSTOMER
# Login to get token
# Search halls
curl http://localhost:3000/api/halls/search?page=1

# Create booking
curl -X POST http://localhost:3000/api/bookings/create \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"hallId":"HALL_ID","eventDate":"2024-06-15T00:00:00Z","eventTime":"19:00","numberOfGuests":300}'

# Make payment
curl -X POST http://localhost:3000/api/payments/create \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"bookingId":"BOOKING_ID","paymentType":"ADVANCE","paymentMethod":"STRIPE","amount":75000}'
```

---

## 🔑 API Response Structure

All endpoints return:
```json
{
  "success": true/false,
  "data": {...},
  "message": "Success message",
  "statusCode": 200
}
```

---

## 📊 User Roles

| Role | Can Do |
|------|--------|
| CUSTOMER | Book halls, pay, review, chat |
| HALL_OWNER | Manage hall, view bookings, get payments |
| SERVICE_PROVIDER | Manage service profile, receive bookings |
| ADMIN | Approve halls, manage users, view analytics |

---

## 🚨 Important Notes

1. **Always use HTTPS in production**
2. **Change JWT_SECRET before deploying**
3. **Setup email service before testing OTP**
4. **Don't commit .env.local to git**
5. **Database backups are essential**
6. **Monitor API logs in production**
7. **Rate limiting needed before production**

---

## 🆘 Getting Help

1. Check `API_DOCUMENTATION.md` for endpoint details
2. Review `SETUP_GUIDE.md` for configuration help
3. Check `prisma/schema.prisma` for data models
4. Enable debug logs: `NODE_ENV=development pnpm dev`
5. Use Prisma Studio: `pnpm db:studio`

---

## ✅ Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] Database migrations completed
- [ ] API endpoints tested
- [ ] Authentication working
- [ ] Payments configured
- [ ] Email service configured
- [ ] CORS settings correct
- [ ] Error handling verified
- [ ] Security audit complete
- [ ] Performance tested

---

## 📞 Support

For issues:
1. Check the error message in logs
2. Verify environment variables
3. Test with curl commands
4. Check database with Prisma Studio
5. Review the comprehensive documentation

---

**You're ready to go! Start with `pnpm dev` and enjoy building!** 🎉

Last Updated: December 2024
