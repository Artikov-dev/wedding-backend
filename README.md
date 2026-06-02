# Weddingly - Wedding Hall Booking Platform Backend

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A comprehensive, production-ready backend API for managing wedding hall bookings, services, payments, and more.

---

## 📋 Quick Navigation

### Getting Started
- **New to the project?** Start with [QUICK_START.md](./QUICK_START.md) (5-minute setup)
- **Want full setup details?** Read [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Need API reference?** Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Development
- **Testing the API?** See [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- **Understanding architecture?** Read [BACKEND_IMPLEMENTATION_SUMMARY.md](./BACKEND_IMPLEMENTATION_SUMMARY.md)
- **Database schema?** Check `prisma/schema.prisma`

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your database URL

# Setup database
pnpm db:generate
pnpm db:migrate

# Start development server
pnpm dev

# Verify it's running
curl http://localhost:3000/api/health
```

Server runs at: **http://localhost:3000**

---

## 📚 Documentation Index

### Core Documentation
| Document | Purpose | Read Time |
|----------|---------|-----------|
| [QUICK_START.md](./QUICK_START.md) | 5-minute setup and quick reference | 5 min |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Complete installation and deployment guide | 20 min |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Full API reference with examples | 30 min |
| [TESTING_GUIDE.md](./TESTING_GUIDE.md) | Comprehensive testing procedures | 25 min |
| [BACKEND_IMPLEMENTATION_SUMMARY.md](./BACKEND_IMPLEMENTATION_SUMMARY.md) | Architecture and features overview | 15 min |

### Key Files
| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Complete database schema (20 models) |
| `lib/auth.ts` | Authentication utilities (JWT, OTP, hashing) |
| `lib/validations.ts` | All Zod validation schemas |
| `middleware.ts` | RBAC authorization middleware |
| `app/api/` | All API endpoints |

---

## 🏗️ Architecture Overview

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + OTP
- **Validation**: Zod
- **Security**: bcryptjs, Helmet, CORS

### API Structure
```
/api/
  ├── auth/          (6 endpoints)
  ├── halls/         (5+ endpoints)
  ├── bookings/      (5 endpoints)
  ├── payments/      (3 endpoints)
  ├── services/      (5 endpoints)
  ├── reviews/       (1+ endpoints)
  ├── favorites/     (3 endpoints)
  ├── notifications/ (3 endpoints)
  ├── chat/          (4 endpoints)
  ├── invitations/   (3 endpoints)
  └── health/        (1 endpoint)
```

### Database Models (20 total)
- **Users & Auth**: User, OTP, RefreshToken, Address
- **Halls**: HallProfile, HallAmenity, HallService
- **Services**: ServiceProvider
- **Bookings**: Booking, ServiceBooking
- **Payments**: Payment, Invoice
- **Interactions**: Review, Favorite, ChatMessage, Conversation, Notification, Invitation

---

## 🔐 Key Features

### Authentication & Security
✅ JWT authentication with refresh tokens
✅ OTP verification (email/phone)
✅ Password hashing (bcryptjs)
✅ Role-based access control (RBAC)
✅ SQL injection prevention
✅ Input validation with Zod
✅ Rate limiting ready
✅ CORS configuration

### Business Features
✅ Wedding hall management (CRUD + search)
✅ Service provider management (7 service types)
✅ Booking system with capacity validation
✅ Multi-method payments (Stripe ready)
✅ Review and rating system
✅ Favorites management
✅ Chat & messaging
✅ Event invitations
✅ Notifications system
✅ Invoice generation

---

## 📊 Statistics

| Metric | Count |
|--------|-------|
| API Endpoints | 40+ |
| Database Models | 20 |
| Validation Schemas | 15+ |
| Lines of Code | 5000+ |
| Documentation Lines | 2000+ |
| Test Cases | 50+ |
| User Roles | 4 |
| Service Types | 7 |
| Notification Types | 10 |

---

## 🎯 User Roles

| Role | Permissions |
|------|-------------|
| **CUSTOMER** | Book halls, pay, review, send invitations |
| **HALL_OWNER** | Manage hall, view bookings, receive payments |
| **SERVICE_PROVIDER** | Manage services, receive bookings |
| **ADMIN** | Approve halls, manage users |

---

## 🔄 Booking Flow

```
1. Customer registers and logs in
2. Customer searches available halls
3. Customer creates booking
4. System validates capacity and date
5. Customer makes advance payment (25%)
6. Booking confirmed
7. Customer adds services if needed
8. Customer makes final payment (75%)
9. Booking completed
10. Customer leaves review
```

---

## 💳 Payment Methods

- Credit Card
- Debit Card
- Bank Transfer
- Cash
- Stripe (integrated)

---

## 📡 API Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "phone": "1234567890",
    "password": "SecurePassword123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  }'
```

### Search Halls
```bash
curl "http://localhost:3000/api/halls/search?category=LUXURY&minPrice=1000&maxPrice=2000&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Booking
```bash
curl -X POST http://localhost:3000/api/bookings/create \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "hallId": "HALL_ID",
    "eventDate": "2024-06-15T00:00:00Z",
    "eventTime": "19:00",
    "numberOfGuests": 300
  }'
```

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete endpoint reference.

---

## 🧪 Testing

### Using curl
```bash
# Health check
curl http://localhost:3000/api/health

# Register and login
# See TESTING_GUIDE.md for detailed examples
```

### Using Postman
1. Import Postman collection (generated from API docs)
2. Set environment variables
3. Run requests

### Manual Testing
See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for:
- 50+ test cases
- Error handling tests
- Business logic tests
- Edge case tests

---

## 🛠️ Common Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Run production build
pnpm lint             # Check code quality

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open database UI
pnpm db:reset         # Reset database (dev only)

# Testing
pnpm test             # Run tests
pnpm test:coverage    # Coverage report
```

---

## 📁 Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── auth/              (Authentication)
│   │   ├── halls/             (Wedding halls)
│   │   ├── bookings/          (Bookings)
│   │   ├── payments/          (Payments)
│   │   ├── services/          (Service providers)
│   │   ├── reviews/           (Reviews & ratings)
│   │   ├── chat/              (Messaging)
│   │   ├── notifications/     (Notifications)
│   │   ├── invitations/       (Invitations)
│   │   └── health/            (Health check)
│   └── layout.tsx
├── lib/
│   ├── db.ts                  (Prisma client)
│   ├── auth.ts                (Auth utilities)
│   ├── api-response.ts        (Response helpers)
│   ├── validations.ts         (Zod schemas)
│   └── utils.ts               (Utilities)
├── prisma/
│   ├── schema.prisma          (Database schema)
│   └── migrations/            (Database migrations)
├── middleware.ts              (RBAC middleware)
├── .env.example               (Environment template)
├── .env.local                 (Local environment - git ignored)
├── QUICK_START.md             (5-minute setup)
├── SETUP_GUIDE.md             (Detailed setup)
├── API_DOCUMENTATION.md       (Full API reference)
├── TESTING_GUIDE.md           (Testing procedures)
└── package.json
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
# Follow prompts, set environment variables
```

### Traditional Hosting
1. Build: `pnpm build`
2. Start: `pnpm start`
3. Set environment variables
4. Ensure PostgreSQL is accessible

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed deployment instructions.

---

## ⚠️ Important Notes

1. **Never commit `.env.local`** to version control
2. **Change `JWT_SECRET`** before production deployment
3. **Setup email service** before testing OTP
4. **Use HTTPS** in production
5. **Regular database backups** are essential
6. **Monitor logs** in production
7. **Keep dependencies updated**: `pnpm update`

---

## 🔐 Security Checklist

- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] HTTPS enabled (production)
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] Authentication tested
- [ ] Payment integration tested
- [ ] Error logs monitored
- [ ] Dependencies updated
- [ ] SQL injection prevention verified

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
psql $DATABASE_URL -c "SELECT 1"  # Test connection
pnpm db:reset                      # Reset database
```

### Port Already in Use
```bash
# Mac/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Prisma Client Error
```bash
pnpm install @prisma/client
pnpm db:generate
```

More troubleshooting in [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting).

---

## 📖 Learning Path

1. **Week 1**: Read QUICK_START.md and SETUP_GUIDE.md
2. **Week 2**: Explore API_DOCUMENTATION.md and database schema
3. **Week 3**: Run TESTING_GUIDE.md test cases
4. **Week 4**: Study BACKEND_IMPLEMENTATION_SUMMARY.md
5. **Week 5-6**: Build frontend integration

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes following code style
3. Add tests for new features
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature/name`
6. Create Pull Request

---

## 📞 Support

### For Issues:
1. Check [QUICK_START.md](./QUICK_START.md) - Common issues
2. Review [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting) - Troubleshooting
3. Check database with `pnpm db:studio`
4. Enable debug logs: `NODE_ENV=development pnpm dev`

### Documentation:
- API endpoints: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Testing: [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- Architecture: [BACKEND_IMPLEMENTATION_SUMMARY.md](./BACKEND_IMPLEMENTATION_SUMMARY.md)

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🎉 Getting Started

```bash
# 1. Clone and install
git clone <repository>
cd weddingly-backend
pnpm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your database URL

# 3. Initialize database
pnpm db:generate
pnpm db:migrate

# 4. Start development server
pnpm dev

# 5. Test the API
curl http://localhost:3000/api/health
```

**You're ready to build!** 🚀

---

## 📊 Project Stats

- **Start Date**: December 2024
- **Version**: 1.0.0
- **Status**: ✅ Production Ready
- **Total Implementation Time**: Comprehensive enterprise-grade backend
- **Documentation**: 2000+ lines
- **Code**: 5000+ lines
- **Test Coverage**: 50+ scenarios

---

## 🎯 Next Steps

1. ✅ Backend complete - Ready for frontend integration
2. ⏭️ Build frontend with provided API documentation
3. ⏭️ Deploy to production
4. ⏭️ Monitor and optimize
5. ⏭️ Add enhancements (real-time chat, analytics, etc.)

---

**Start with [QUICK_START.md](./QUICK_START.md) and enjoy building!** 🎊

---

Last Updated: December 2024  
Made with ❤️ for Weddingly
