# Weddingly Backend - Setup & Installation Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Database Setup](#database-setup)
4. [Configuration](#configuration)
5. [Running the Server](#running-the-server)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js** 18.x or higher
- **npm** or **pnpm** (recommended)
- **PostgreSQL** 12 or higher
- **Git**
- **Postman** (for API testing, optional)

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourorg/weddingly-backend.git
cd weddingly-backend
```

### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Copy Environment File
```bash
cp .env.example .env.local
```

---

## Database Setup

### 1. Create PostgreSQL Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE weddingly_db;

# Create user (if needed)
CREATE USER weddingly_user WITH PASSWORD 'secure_password';
ALTER ROLE weddingly_user SET client_encoding TO 'utf8';
ALTER ROLE weddingly_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE weddingly_user SET default_transaction_deferrable TO on;
ALTER ROLE weddingly_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE weddingly_db TO weddingly_user;

# Exit psql
\q
```

### 2. Update Environment Variables
Edit `.env.local` and add your database connection URL:
```
DATABASE_URL=postgresql://weddingly_user:secure_password@localhost:5432/weddingly_db
```

### 3. Run Migrations
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Or if you want to create and apply migrations
npx prisma migrate dev --name init
```

### 4. Verify Database
```bash
# Open Prisma Studio (interactive database viewer)
npx prisma studio
```

---

## Configuration

### 1. JWT Configuration
Generate a secure JWT secret:
```bash
# Linux/Mac
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))
```

Add to `.env.local`:
```
JWT_SECRET=your_generated_secret
JWT_EXPIRY=7d
```

### 2. Email Configuration (Gmail Example)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Add to `.env.local`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@weddingly.com
```

### 3. Stripe Configuration (Optional)
1. Sign up at https://stripe.com
2. Get your API keys from Dashboard
3. Add to `.env.local`:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 4. Other Configurations
Update `.env.local` with your API and frontend URLs:
```
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
NODE_ENV=development
```

---

## Running the Server

### Development Mode
```bash
# Start the development server with hot-reload
pnpm dev

# Server runs at http://localhost:3000
```

### Production Mode
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Verify Server is Running
```bash
# Test the API
curl http://localhost:3000/api/health
```

---

## Project Structure

```
weddingly-backend/
├── app/
│   ├── api/
│   │   ├── auth/              # Authentication endpoints
│   │   ├── bookings/          # Booking management
│   │   ├── halls/             # Wedding hall management
│   │   ├── services/          # Service provider management
│   │   ├── payments/          # Payment processing
│   │   ├── reviews/           # Review and rating
│   │   ├── chat/              # Messaging
│   │   ├── notifications/     # Notifications
│   │   ├── invitations/       # Invitation management
│   │   └── favorites/         # Favorites management
│   └── layout.tsx
├── lib/
│   ├── db.ts                  # Prisma client
│   ├── auth.ts                # Auth utilities (JWT, OTP, password hashing)
│   ├── api-response.ts        # API response helpers
│   ├── validations.ts         # Zod validation schemas
│   └── utils.ts               # Utility functions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── middleware.ts              # Authentication & RBAC middleware
├── .env.local                 # Environment variables (local)
├── .env.example               # Environment template
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript configuration
```

---

## API Endpoints Quick Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Wedding Halls
- `POST /api/halls/create` - Create hall profile
- `GET /api/halls/search` - Search halls
- `GET /api/halls/{hallId}` - Get hall details
- `PUT /api/halls/{hallId}` - Update hall
- `DELETE /api/halls/{hallId}` - Delete hall
- `POST /api/halls/{hallId}/amenities` - Add amenities

### Bookings
- `POST /api/bookings/create` - Create booking
- `GET /api/bookings` - Get bookings list
- `GET /api/bookings/{bookingId}` - Get booking details
- `PUT /api/bookings/{bookingId}` - Update booking
- `DELETE /api/bookings/{bookingId}` - Cancel booking

### Payments
- `POST /api/payments/create` - Create payment
- `GET /api/payments` - Get payments list
- `POST /api/payments/stripe` - Process Stripe payment

### Additional Endpoints
- Reviews, Favorites, Chat, Notifications, Invitations, Services

See `API_DOCUMENTATION.md` for complete endpoint documentation.

---

## Testing

### Using Postman
1. Import collection: `postman_collection.json`
2. Set environment variables in Postman
3. Run requests

### Using curl
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "1234567890",
    "password": "TestPassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'

# Search halls (with token)
curl -X GET http://localhost:3000/api/halls/search?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Unit Tests (Future)
```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

---

## Database Utilities

### View Database Schema
```bash
# Open Prisma Studio
npx prisma studio
```

### Create a Migration
```bash
npx prisma migrate dev --name migration_name
```

### Reset Database (Development Only)
```bash
npx prisma migrate reset
```

### Generate Prisma Client
```bash
npx prisma generate
```

---

## Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add JWT_SECRET
# ... add other variables
```

### Deploy to AWS/DigitalOcean/Heroku
1. Ensure production database is set up
2. Update `DATABASE_URL` in production environment
3. Build the application: `pnpm build`
4. Start with: `pnpm start`

### Production Checklist
- [ ] Update `JWT_SECRET` with strong random value
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure CORS properly
- [ ] Set up monitoring and logging
- [ ] Configure email service
- [ ] Test all payment integrations
- [ ] Set up SSL certificates
- [ ] Configure rate limiting
- [ ] Set up error tracking (Sentry)

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Error
```
Error: Client is unable to connect
```
**Solution:**
- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database exists
- Check user permissions

```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

#### 2. Prisma Client Error
```
Error: Cannot find @prisma/client
```
**Solution:**
```bash
npm install @prisma/client
npx prisma generate
```

#### 3. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:**
```bash
# Kill process on port 3000
# Mac/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### 4. JWT Token Invalid
**Solution:**
- Ensure `JWT_SECRET` is set correctly
- Token may have expired (check JWT_EXPIRY)
- Regenerate token using refresh endpoint

#### 5. CORS Issues
**Solution:**
- Add frontend URL to CORS whitelist
- Update `FRONTEND_URL` in environment
- Configure CORS middleware in server

### Debug Mode
Set `NODE_ENV=development` to see detailed logs:
```
NODE_ENV=development pnpm dev
```

### View Logs
```bash
# Check application logs
tail -f logs/app.log

# Check database logs
psql $DATABASE_URL -c "SELECT * FROM pg_stat_statements LIMIT 10"
```

---

## Performance Optimization

### Database Indexing
Indexes are already defined in `schema.prisma`. Ensure they're created:
```bash
npx prisma migrate deploy
```

### Caching Strategy
Consider implementing Redis caching for:
- Hall search results
- User profiles
- Service listings

### Query Optimization
- Use pagination for list endpoints
- Implement request validation early
- Use database indexes
- Cache frequently accessed data

---

## Security Best Practices

1. **Never commit `.env.local` to version control**
   ```bash
   # Add to .gitignore
   echo ".env.local" >> .gitignore
   ```

2. **Use strong passwords**
   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers, symbols

3. **Rotate JWT secrets periodically**
   - Generate new secret
   - Implement token rotation

4. **Validate all inputs**
   - Server-side validation is already implemented with Zod
   - Never trust client-side validation

5. **Use HTTPS in production**
   - Get SSL certificate (Let's Encrypt)
   - Redirect HTTP to HTTPS

6. **Update dependencies regularly**
   ```bash
   pnpm update
   pnpm audit
   ```

---

## Support & Documentation

- **API Documentation**: See `API_DOCUMENTATION.md`
- **Database Schema**: Check `prisma/schema.prisma`
- **Validation Rules**: See `lib/validations.ts`
- **Authentication Logic**: See `lib/auth.ts`

---

## Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -m "Add feature"`
3. Push to branch: `git push origin feature/feature-name`
4. Open Pull Request

---

## License
This project is licensed under the MIT License.

---

## Contact
For questions or support, contact: support@weddingly.com

---

**Last Updated:** December 2024
**Version:** 1.0.0
