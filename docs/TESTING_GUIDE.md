# API Testing Guide for Weddingly Backend

## 🧪 Testing Overview

This guide provides comprehensive testing procedures for all API endpoints.

---

## Prerequisites

- Backend running: `pnpm dev`
- Terminal/Command line or Postman
- Sample data for testing

---

## Test Categories

1. Authentication Tests
2. Wedding Hall Tests
3. Booking Tests
4. Payment Tests
5. Service Provider Tests
6. Review & Rating Tests
7. Notification Tests
8. Chat Tests
9. Invitation Tests
10. Error Handling Tests

---

## 1. Authentication Tests

### Test 1.1: User Registration
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "phone": "1234567890",
  "password": "TestPassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CUSTOMER"
}
```

**Expected Response**: 201 Created
**Check**: JWT token and refresh token present

### Test 1.2: Duplicate Email Registration
```bash
POST http://localhost:3000/api/auth/register
{
  "email": "newuser@example.com",
  ...
}
```

**Expected Response**: 409 Conflict

### Test 1.3: Invalid Email Format
```bash
POST http://localhost:3000/api/auth/register
{
  "email": "invalid-email",
  ...
}
```

**Expected Response**: 400 Bad Request

### Test 1.4: User Login
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "TestPassword123"
}
```

**Expected Response**: 200 OK with tokens

### Test 1.5: Invalid Password
```bash
POST http://localhost:3000/api/auth/login
{
  "email": "newuser@example.com",
  "password": "WrongPassword"
}
```

**Expected Response**: 401 Unauthorized

### Test 1.6: Token Refresh
```bash
POST http://localhost:3000/api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

**Expected Response**: 200 OK with new tokens

### Test 1.7: Forgot Password
```bash
POST http://localhost:3000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "newuser@example.com"
}
```

**Expected Response**: 200 OK (check console for OTP)

### Test 1.8: Reset Password
```bash
POST http://localhost:3000/api/auth/reset-password
Content-Type: application/json

{
  "userId": "USER_ID_FROM_FORGOT_PASSWORD",
  "code": "123456",  // OTP from console
  "newPassword": "NewPassword456"
}
```

**Expected Response**: 200 OK

---

## 2. Wedding Hall Tests

### Test 2.1: Create Hall (HALL_OWNER only)
```bash
POST http://localhost:3000/api/halls/create
Authorization: Bearer HALL_OWNER_TOKEN
Content-Type: application/json

{
  "name": "Grand Palace Hall",
  "description": "Luxurious wedding venue with premium amenities",
  "category": "LUXURY",
  "capacity": 500,
  "pricePerPlate": 1500,
  "advancePercentage": 25,
  "amenities": [
    {"name": "AC", "description": "Central AC"},
    {"name": "Parking", "description": "500 car parking"}
  ]
}
```

**Expected Response**: 201 Created
**Check**: Hall ID for future tests

### Test 2.2: Search Halls
```bash
GET http://localhost:3000/api/halls/search?page=1&limit=10&category=LUXURY&minPrice=1000&maxPrice=2000
```

**Expected Response**: 200 OK with hall list

### Test 2.3: Search with Capacity Filter
```bash
GET http://localhost:3000/api/halls/search?capacity=300&page=1&limit=5
```

**Expected Response**: 200 OK, only halls with capacity >= 300

### Test 2.4: Get Hall Details
```bash
GET http://localhost:3000/api/halls/HALL_ID
```

**Expected Response**: 200 OK with complete hall details

### Test 2.5: Update Hall (Owner only)
```bash
PUT http://localhost:3000/api/halls/HALL_ID
Authorization: Bearer HALL_OWNER_TOKEN
Content-Type: application/json

{
  "name": "Updated Hall Name",
  "pricePerPlate": 1800
}
```

**Expected Response**: 200 OK

### Test 2.6: Add Hall Amenity
```bash
POST http://localhost:3000/api/halls/HALL_ID/amenities
Authorization: Bearer HALL_OWNER_TOKEN
Content-Type: application/json

{
  "name": "WiFi",
  "description": "Free high-speed internet"
}
```

**Expected Response**: 201 Created

### Test 2.7: Delete Hall (Owner only)
```bash
DELETE http://localhost:3000/api/halls/HALL_ID
Authorization: Bearer HALL_OWNER_TOKEN
```

**Expected Response**: 200 OK

### Test 2.8: Hall Not Found
```bash
GET http://localhost:3000/api/halls/invalid-id
```

**Expected Response**: 404 Not Found

---

## 3. Booking Tests

### Test 3.1: Create Booking
```bash
POST http://localhost:3000/api/bookings/create
Authorization: Bearer CUSTOMER_TOKEN
Content-Type: application/json

{
  "hallId": "HALL_ID",
  "eventDate": "2024-06-15T00:00:00Z",
  "eventTime": "19:00",
  "numberOfGuests": 300,
  "notes": "Special dietary requirements"
}
```

**Expected Response**: 201 Created
**Check**: Booking ID, booking number, calculated amounts

### Test 3.2: Booking with Services
```bash
POST http://localhost:3000/api/bookings/create
Authorization: Bearer CUSTOMER_TOKEN
Content-Type: application/json

{
  "hallId": "HALL_ID",
  "eventDate": "2024-06-15T00:00:00Z",
  "eventTime": "19:00",
  "numberOfGuests": 300,
  "services": [
    {"serviceProviderId": "SERVICE_ID", "quantity": 1}
  ]
}
```

**Expected Response**: 201 Created with services

### Test 3.3: Booking Exceeds Capacity
```bash
POST http://localhost:3000/api/bookings/create
Authorization: Bearer CUSTOMER_TOKEN
{
  "hallId": "HALL_ID",
  "eventDate": "2024-06-15T00:00:00Z",
  "eventTime": "19:00",
  "numberOfGuests": 1000  // Exceeds 500 capacity
}
```

**Expected Response**: 400 Bad Request

### Test 3.4: Booking Conflict (Same date)
```bash
# After creating first booking, try to create another on same date
POST http://localhost:3000/api/bookings/create
{
  "hallId": "SAME_HALL_ID",
  "eventDate": "2024-06-15T00:00:00Z",  // Same date as first
  ...
}
```

**Expected Response**: 409 Conflict

### Test 3.5: Get Bookings List
```bash
GET http://localhost:3000/api/bookings?status=PENDING&page=1&limit=10
Authorization: Bearer CUSTOMER_TOKEN
```

**Expected Response**: 200 OK with pagination

### Test 3.6: Get Booking Details
```bash
GET http://localhost:3000/api/bookings/BOOKING_ID
Authorization: Bearer CUSTOMER_TOKEN
```

**Expected Response**: 200 OK with complete booking info

### Test 3.7: Update Booking
```bash
PUT http://localhost:3000/api/bookings/BOOKING_ID
Authorization: Bearer CUSTOMER_TOKEN
Content-Type: application/json

{
  "numberOfGuests": 320,
  "notes": "Updated notes"
}
```

**Expected Response**: 200 OK

### Test 3.8: Cancel Booking
```bash
DELETE http://localhost:3000/api/bookings/BOOKING_ID
Authorization: Bearer CUSTOMER_TOKEN
```

**Expected Response**: 200 OK, status changed to CANCELLED

---

## 4. Payment Tests

### Test 4.1: Create Advance Payment
```bash
POST http://localhost:3000/api/payments/create
Authorization: Bearer CUSTOMER_TOKEN
Content-Type: application/json

{
  "bookingId": "BOOKING_ID",
  "paymentType": "ADVANCE",
  "paymentMethod": "CREDIT_CARD",
  "amount": 112500  // 25% of total
}
```

**Expected Response**: 201 Created
**Check**: Payment ID, invoice generated, booking status updated

### Test 4.2: Invalid Advance Amount
```bash
POST http://localhost:3000/api/payments/create
Authorization: Bearer CUSTOMER_TOKEN
{
  "bookingId": "BOOKING_ID",
  "paymentType": "ADVANCE",
  "paymentMethod": "CREDIT_CARD",
  "amount": 50000  // Wrong amount
}
```

**Expected Response**: 400 Bad Request

### Test 4.3: Final Payment Before Advance
```bash
POST http://localhost:3000/api/payments/create
Authorization: Bearer CUSTOMER_TOKEN
{
  "bookingId": "BOOKING_ID",
  "paymentType": "FINAL",
  "paymentMethod": "CREDIT_CARD",
  "amount": 337500
}
```

**Expected Response**: 400 Bad Request (must pay advance first)

### Test 4.4: Create Final Payment
```bash
# After advance payment
POST http://localhost:3000/api/payments/create
Authorization: Bearer CUSTOMER_TOKEN
{
  "bookingId": "BOOKING_ID",
  "paymentType": "FINAL",
  "paymentMethod": "BANK_TRANSFER",
  "amount": 337500
}
```

**Expected Response**: 201 Created

### Test 4.5: Get Payments List
```bash
GET http://localhost:3000/api/payments?status=ADVANCE_PAID&page=1&limit=10
Authorization: Bearer CUSTOMER_TOKEN
```

**Expected Response**: 200 OK

### Test 4.6: Stripe Payment
```bash
POST http://localhost:3000/api/payments/stripe
Authorization: Bearer CUSTOMER_TOKEN
Content-Type: application/json

{
  "bookingId": "BOOKING_ID",
  "amount": 112500,
  "paymentMethodId": "pm_test_stripe_id"
}
```

**Expected Response**: 200 OK (demo implementation)

---

## 5. Service Provider Tests

### Test 5.1: Create Service (SERVICE_PROVIDER only)
```bash
POST http://localhost:3000/api/services
Authorization: Bearer SERVICE_PROVIDER_TOKEN
Content-Type: application/json

{
  "name": "Melodious Singers Band",
  "description": "Professional wedding band",
  "serviceType": "SINGER",
  "pricing": 50000
}
```

**Expected Response**: 201 Created

### Test 5.2: Get Available Services
```bash
GET http://localhost:3000/api/services?serviceType=SINGER&minRating=3&page=1&limit=10
```

**Expected Response**: 200 OK with services list

### Test 5.3: Get Service Details
```bash
GET http://localhost:3000/api/services/SERVICE_ID
```

**Expected Response**: 200 OK with reviews

### Test 5.4: Update Service
```bash
PUT http://localhost:3000/api/services/SERVICE_ID
Authorization: Bearer SERVICE_PROVIDER_TOKEN
Content-Type: application/json

{
  "pricing": 60000,
  "description": "Updated description"
}
```

**Expected Response**: 200 OK

### Test 5.5: Delete Service
```bash
DELETE http://localhost:3000/api/services/SERVICE_ID
Authorization: Bearer SERVICE_PROVIDER_TOKEN
```

**Expected Response**: 200 OK

---

## 6. Review Tests

### Test 6.1: Create Review for Hall
```bash
POST http://localhost:3000/api/reviews/create
Authorization: Bearer CUSTOMER_TOKEN
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent venue, great service!",
  "hallId": "HALL_ID"
}
```

**Expected Response**: 201 Created

### Test 6.2: Create Review for Service
```bash
POST http://localhost:3000/api/reviews/create
Authorization: Bearer CUSTOMER_TOKEN
{
  "rating": 4,
  "comment": "Good service, professional team",
  "serviceProviderId": "SERVICE_ID"
}
```

**Expected Response**: 201 Created

### Test 6.3: Duplicate Review Prevention
```bash
POST http://localhost:3000/api/reviews/create
{
  "rating": 3,
  "comment": "Another review",
  "hallId": "SAME_HALL_ID"
}
```

**Expected Response**: 409 Conflict

### Test 6.4: Invalid Rating
```bash
POST http://localhost:3000/api/reviews/create
{
  "rating": 10,  // Should be 1-5
  "comment": "Invalid rating",
  "hallId": "HALL_ID"
}
```

**Expected Response**: 400 Bad Request

---

## 7. Favorites Tests

### Test 7.1: Add to Favorites
```bash
POST http://localhost:3000/api/favorites
Authorization: Bearer CUSTOMER_TOKEN
Content-Type: application/json

{
  "hallId": "HALL_ID"
}
```

**Expected Response**: 201 Created

### Test 7.2: Get Favorites
```bash
GET http://localhost:3000/api/favorites?page=1&limit=10
Authorization: Bearer CUSTOMER_TOKEN
```

**Expected Response**: 200 OK with favorite halls

### Test 7.3: Remove from Favorites
```bash
DELETE http://localhost:3000/api/favorites/HALL_ID
Authorization: Bearer CUSTOMER_TOKEN
```

**Expected Response**: 200 OK

### Test 7.4: Duplicate Favorite
```bash
POST http://localhost:3000/api/favorites
Authorization: Bearer CUSTOMER_TOKEN
{
  "hallId": "SAME_HALL_ID"
}
```

**Expected Response**: 409 Conflict

---

## 8. Notification Tests

### Test 8.1: Get Notifications
```bash
GET http://localhost:3000/api/notifications?page=1&limit=20
Authorization: Bearer USER_TOKEN
```

**Expected Response**: 200 OK with notifications

### Test 8.2: Get Unread Notifications
```bash
GET http://localhost:3000/api/notifications?isRead=false&page=1&limit=20
Authorization: Bearer USER_TOKEN
```

**Expected Response**: 200 OK with unread only

### Test 8.3: Mark as Read
```bash
PATCH http://localhost:3000/api/notifications/NOTIFICATION_ID
Authorization: Bearer USER_TOKEN
```

**Expected Response**: 200 OK

### Test 8.4: Delete Notification
```bash
DELETE http://localhost:3000/api/notifications/NOTIFICATION_ID
Authorization: Bearer USER_TOKEN
```

**Expected Response**: 200 OK

---

## 9. Chat Tests

### Test 9.1: Get Conversations
```bash
GET http://localhost:3000/api/chat/conversations?page=1&limit=10
Authorization: Bearer USER_TOKEN
```

**Expected Response**: 200 OK

### Test 9.2: Start Conversation
```bash
POST http://localhost:3000/api/chat/conversations
Authorization: Bearer USER_TOKEN
Content-Type: application/json

{
  "participantIds": ["OTHER_USER_ID"]
}
```

**Expected Response**: 201 Created

### Test 9.3: Send Message
```bash
POST http://localhost:3000/api/chat/messages
Authorization: Bearer USER_TOKEN
Content-Type: application/json

{
  "conversationId": "CONVERSATION_ID",
  "content": "Hello! How are you?"
}
```

**Expected Response**: 201 Created

### Test 9.4: Get Messages
```bash
GET http://localhost:3000/api/chat/conversations/CONVERSATION_ID?page=1&limit=50
Authorization: Bearer USER_TOKEN
```

**Expected Response**: 200 OK with message history

---

## 10. Invitation Tests

### Test 10.1: Send Invitations
```bash
POST http://localhost:3000/api/invitations/create
Authorization: Bearer CUSTOMER_TOKEN
Content-Type: application/json

{
  "bookingId": "BOOKING_ID",
  "guestEmails": ["guest1@example.com", "guest2@example.com"],
  "message": "You are invited to our wedding!",
  "guestCount": 2
}
```

**Expected Response**: 201 Created

### Test 10.2: Get Invitations
```bash
GET http://localhost:3000/api/invitations?status=PENDING&page=1&limit=10
Authorization: Bearer USER_TOKEN
```

**Expected Response**: 200 OK

### Test 10.3: Accept Invitation
```bash
PATCH http://localhost:3000/api/invitations/INVITATION_ID
Authorization: Bearer INVITED_USER_TOKEN
Content-Type: application/json

{
  "status": "ACCEPTED"
}
```

**Expected Response**: 200 OK

### Test 10.4: Decline Invitation
```bash
PATCH http://localhost:3000/api/invitations/INVITATION_ID
Authorization: Bearer INVITED_USER_TOKEN
{
  "status": "DECLINED"
}
```

**Expected Response**: 200 OK

---

## 11. Error Handling Tests

### Test 11.1: Missing Authorization Token
```bash
GET http://localhost:3000/api/bookings
# No Authorization header
```

**Expected Response**: 401 Unauthorized

### Test 11.2: Invalid Token
```bash
GET http://localhost:3000/api/bookings
Authorization: Bearer invalid_token_xyz
```

**Expected Response**: 401 Unauthorized

### Test 11.3: Insufficient Permissions
```bash
POST http://localhost:3000/api/halls/create
Authorization: Bearer CUSTOMER_TOKEN  # Not HALL_OWNER
```

**Expected Response**: 403 Forbidden

### Test 11.4: Not Found
```bash
GET http://localhost:3000/api/bookings/non-existent-id
Authorization: Bearer USER_TOKEN
```

**Expected Response**: 404 Not Found

### Test 11.5: Validation Error
```bash
POST http://localhost:3000/api/auth/register
{
  "email": "invalid-email",
  "password": "short"
}
```

**Expected Response**: 400 Bad Request

---

## Postman Collection Setup

### Import Steps:
1. Create new Collection: "Weddingly API"
2. Create folders: Auth, Halls, Bookings, Payments, etc.
3. Add requests to each folder
4. Create environment variable for:
   - `BASE_URL`: http://localhost:3000
   - `JWT_TOKEN`: (will be set after login)
   - `HALL_ID`: (will be set after creating hall)
   - `BOOKING_ID`: (will be set after creating booking)

### Pre-request Script (for login requests):
```javascript
// Automatically set JWT token after login
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

### Post-request Script:
```javascript
var jsonData = pm.response.json();
pm.environment.set("JWT_TOKEN", jsonData.data.token);
```

---

## Testing Best Practices

1. **Test in Order**: Follow dependencies (register → login → create booking)
2. **Use Environment Variables**: Store tokens and IDs
3. **Test Error Cases**: Invalid inputs, missing fields
4. **Clean Up**: Delete test data after tests
5. **Monitor Logs**: Check console for debug info
6. **Database Verification**: Use `pnpm db:studio` to verify data
7. **Response Validation**: Check status codes and response structure

---

## Quick Test Script

```bash
#!/bin/bash

BASE_URL="http://localhost:3000/api"

# 1. Register
echo "1. Registering user..."
REGISTER=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","phone":"9999999999","password":"Test123!","firstName":"Test","lastName":"User","role":"CUSTOMER"}')
TOKEN=$(echo $REGISTER | jq -r '.data.token')
echo "Token: $TOKEN"

# 2. Search halls
echo -e "\n2. Searching halls..."
curl -s -X GET "$BASE_URL/halls/search?page=1&limit=5" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 3. Test health
echo -e "\n3. Health check..."
curl -s $BASE_URL/health | jq '.'
```

---

## Continuous Testing

Set up automated tests using Jest:
```bash
pnpm test
```

---

**Happy Testing!** 🚀

Last Updated: December 2024
