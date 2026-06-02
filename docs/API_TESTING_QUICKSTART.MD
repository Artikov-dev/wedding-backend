# 🎯 API Testing Quick Start Guide

## 📋 Table of Contents
1. [Quick Start (60 seconds)](#quick-start-60-seconds)
2. [Detailed Setup](#detailed-setup)
3. [Running Tests](#running-tests)
4. [Viewing Results](#viewing-results)
5. [Understanding Results](#understanding-results)
6. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start (60 seconds)

### Step 1: Start the API Server (Terminal 1)
```bash
cd c:\Users\artik\OneDrive\Desktop\backend-for-booking
npm run dev
```
Wait for: `▲ Next.js 16.2.6 started server on 0.0.0.0:3000`

### Step 2: Run Tests (Terminal 2)
```bash
cd c:\Users\artik\OneDrive\Desktop\backend-for-booking
npm run test:api
```

### Step 3: View Results
```bash
npm run test:api:view
```

### Step 4: View Swagger UI
```bash
npm run test:api:docs
# Or open manually: http://localhost:3000/swagger
```

---

## 🔧 Detailed Setup

### Prerequisites
- **Node.js:** v16.0.0 or higher
- **npm:** v8.0.0 or higher
- **pnpm:** (optional) v8.0.0 or higher
- **Database:** PostgreSQL running and configured

### Verification

**Check Node.js:**
```bash
node --version
# Expected: v16.x.x or higher
```

**Check npm:**
```bash
npm --version
# Expected: v8.x.x or higher
```

**Check Database:**
```bash
# Run health check after starting server
curl http://localhost:3000/api/health
# Expected response includes "database": "connected"
```

### Installation

If dependencies are not installed:
```bash
cd c:\Users\artik\OneDrive\Desktop\backend-for-booking
npm install
```

---

## 🚀 Running Tests

### Option 1: Using npm Scripts (Recommended)

**Run all tests:**
```bash
npm run test:api
```

**View last test results:**
```bash
npm run test:api:view
```

**Open Swagger UI:**
```bash
npm run test:api:docs
```

---

### Option 2: Manual Execution

**Start development server:**
```bash
npm run dev
```

**Run tests directly:**
```bash
npx ts-node api.test.ts
```

---

### Option 3: Running Individual API Tests

**Test only health endpoint:**
```bash
curl http://localhost:3000/api/health
```

**Test authentication:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123456"}'
```

**Test halls search:**
```bash
curl "http://localhost:3000/api/halls/search?city=New%20York"
```

---

## 📊 Viewing Results

### In Terminal
```bash
npm run test:api:view
```

### In Browser
1. Open `APITEST.MD` in VS Code or any Markdown viewer
2. Or visit http://localhost:3000/swagger for interactive testing

### Test Report Contents
- Summary statistics (passed/failed)
- Results by module
- Detailed response examples
- Error codes and solutions
- Performance metrics

---

## 📈 Understanding Results

### Test Report Structure

```
APITEST.MD
├── Executive Summary
│   ├── Total Tests Count
│   ├── Passed Tests
│   └── Failed Tests
├── Test Results by Category
│   ├── Authentication
│   ├── Halls Management
│   ├── Bookings
│   ├── Services
│   ├── Chat & Messaging
│   ├── Reviews
│   ├── Invitations
│   ├── Notifications
│   └── Payments
├── Detailed Test Results
│   └── Individual test info
└── API Endpoints Summary
```

### Interpreting Results

**✅ PASSED**
- Endpoint is working correctly
- Response time is acceptable
- Status code matches expected value

**❌ FAILED**
- Endpoint returned unexpected status code
- Network error occurred
- Response format was invalid

### Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| GET Response | <200ms | ✅ |
| POST Response | <500ms | ✅ |
| Update Response | <500ms | ✅ |
| Delete Response | <300ms | ✅ |

---

## 🔍 Troubleshooting

### Issue: Server not running
**Error:** `Connection refused` or `ECONNREFUSED`

**Solution:**
```bash
# Start server in new terminal
npm run dev

# Verify server is running
curl http://localhost:3000/api/health
```

### Issue: Tests won't run
**Error:** `command not found: ts-node`

**Solution:**
```bash
# Reinstall dependencies
npm install

# Or install ts-node globally
npm install -g ts-node
```

### Issue: Database connection failed
**Error:** `Database connection failed` in health check

**Solution:**
```bash
# Check DATABASE_URL in .env
cat .env | grep DATABASE_URL

# Verify database is running
# For PostgreSQL:
psql -U postgres -h localhost

# Restart database service if needed
```

### Issue: Tests timing out
**Error:** `Timeout of 30000ms exceeded`

**Solution:**
1. Check if server is responsive: `curl http://localhost:3000/api/health`
2. Verify database is not locked
3. Increase timeout in `api.test.ts` if needed

### Issue: Authentication fails
**Error:** `401 Unauthorized` on protected endpoints

**Solution:**
1. Verify JWT token is being obtained from login
2. Check token format in Authorization header
3. Token may have expired - refresh it

### Issue: Port 3000 already in use
**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port
PORT=3001 npm run dev
```

### Issue: Swagger not loading
**Error:** Swagger page shows blank or error

**Solution:**
1. Verify `/api/docs` returns valid JSON:
   ```bash
   curl http://localhost:3000/api/docs | head -50
   ```

2. Clear browser cache and reload:
   - `Ctrl+Shift+Delete` (Windows/Linux)
   - `Cmd+Shift+Delete` (macOS)

3. Check browser console for errors (F12)

---

## 📝 Test Scenarios

### Basic Flow Test
```
1. Health Check (/api/health)
   ↓
2. Register User (/api/auth/register)
   ↓
3. Login (/api/auth/login)
   ↓
4. Search Halls (/api/halls/search)
   ↓
5. Create Booking (/api/bookings/create)
   ↓
6. List Services (/api/services)
   ↓
7. Create Payment (/api/payments/create)
```

### Full Feature Test
```
1. Authentication
   - Register
   - Login
   - Refresh Token
   - Password Reset

2. Hall Management
   - Search Halls
   - Create Hall
   - Update Hall
   - Add Amenities

3. Booking Workflow
   - Create Booking
   - Update Status
   - Create Payment
   - Add Review

4. Communication
   - Create Conversation
   - Send Message
   - Send Invitation

5. User Management
   - Add Favorites
   - List Notifications
   - Accept Invitations
```

---

## 🎯 Common Test Patterns

### Testing without Authentication (Public Endpoints)
```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/halls/search
curl http://localhost:3000/api/services
```

### Testing with Authentication
```bash
# 1. Get token
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123456"}' \
  | jq -r '.data.token')

# 2. Use token in request
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/bookings
```

### Testing POST Requests
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "password":"Secret123!"
  }'
```

---

## 📚 Additional Resources

| Resource | Location | Purpose |
|----------|----------|---------|
| API Documentation | `APITEST.MD` | Complete endpoint reference |
| Test Script | `api.test.ts` | Automated test suite |
| OpenAPI Spec | `/api/docs` | Machine-readable API definition |
| Swagger UI | `/swagger` | Interactive API testing |
| Setup Guide | `SETUP_GUIDE.md` | Initial project setup |
| Testing Guide | `TESTING_GUIDE.md` | Testing best practices |

---

## ✅ Checklist Before Testing

- [ ] Node.js v16+ installed
- [ ] npm dependencies installed (`npm install`)
- [ ] `.env` file configured with DATABASE_URL
- [ ] Database server running
- [ ] Port 3000 is available
- [ ] Development server can start (`npm run dev`)
- [ ] Health check passes (`curl http://localhost:3000/api/health`)

---

## 🚨 Emergency Procedures

### Reset Everything
```bash
# Stop server (Ctrl+C)

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Restart server
npm run dev
```

### Full System Restart
```bash
# 1. Stop all Node processes
killall node  # macOS/Linux
taskkill /IM node.exe /F  # Windows

# 2. Clear cache
rm -rf .next
npm cache clean --force

# 3. Reinstall and run
npm install
npm run dev
```

### Test Specific Module Only
```bash
# Edit api.test.ts to comment out other tests
# Or run curl commands directly:

# Test only auth
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123456"}'

# Test only halls
curl http://localhost:3000/api/halls/search

# Test health
curl http://localhost:3000/api/health
```

---

## 📞 Support

**For Issues:**
1. Check [Troubleshooting](#troubleshooting) section above
2. Review test output messages
3. Check browser console (F12)
4. Review server logs in terminal

**For Questions:**
- Email: support@example.com
- Docs: See `APITEST.MD`
- Swagger: http://localhost:3000/swagger

---

## 📊 Success Metrics

**Goal:** 100% API endpoints functional

**Current Status:**
- ✅ 43 endpoints implemented
- ✅ 13 public endpoints
- ✅ 30 protected endpoints
- ✅ 11 feature modules
- ✅ OpenAPI documentation complete
- ✅ Swagger UI integrated

---

**Last Updated:** 2026-06-02
**Version:** 1.0.0
**Status:** ✅ Ready for Testing

