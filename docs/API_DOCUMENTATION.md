# Weddingly - Wedding Hall Booking Platform Backend API Documentation

## Overview
Comprehensive REST API for managing wedding hall bookings, services, payments, reviews, and more.

## Base URL
```
http://localhost:3000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format
All responses follow this format:
```json
{
  "success": true/false,
  "data": {},
  "message": "Success message",
  "statusCode": 200
}
```

---

## Authentication Endpoints

### 1. User Registration
**POST** `/auth/register`
```json
{
  "email": "user@example.com",
  "phone": "1234567890",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CUSTOMER" // Optional: CUSTOMER, HALL_OWNER, SERVICE_PROVIDER
}
```
**Response:** User object with JWT tokens

### 2. User Login
**POST** `/auth/login`
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```
**Response:** User object with JWT tokens

### 3. Refresh Token
**POST** `/auth/refresh`
```json
{
  "refreshToken": "refresh_token_here"
}
```
**Response:** New JWT and refresh tokens

### 4. Verify OTP
**POST** `/auth/verify-otp`
```json
{
  "userId": "user_id",
  "code": "123456",
  "purpose": "email_verification" // or "phone_verification", "password_reset"
}
```

### 5. Forgot Password
**POST** `/auth/forgot-password`
```json
{
  "email": "user@example.com"
}
```
**Response:** OTP sent to email

### 6. Reset Password
**POST** `/auth/reset-password`
```json
{
  "userId": "user_id",
  "code": "123456",
  "newPassword": "NewPassword123"
}
```

---

## Wedding Hall Endpoints

### 1. Create Hall Profile
**POST** `/halls/create` (Requires HALL_OWNER role)
```json
{
  "name": "Grand Palace Hall",
  "description": "Luxurious wedding venue with modern amenities",
  "category": "LUXURY", // LUXURY, PREMIUM, STANDARD, BUDGET
  "capacity": 500,
  "pricePerPlate": 1500,
  "advancePercentage": 25,
  "imageUrl": "url_to_image",
  "amenities": [
    {"name": "AC", "description": "Central Air Conditioning"},
    {"name": "Parking", "description": "Free parking for 100 cars"}
  ]
}
```

### 2. Search Halls
**GET** `/halls/search?city=Karachi&capacity=300&minPrice=1000&maxPrice=2000&category=LUXURY&page=1&limit=10`

### 3. Get Hall Details
**GET** `/halls/{hallId}`

### 4. Update Hall
**PUT** `/halls/{hallId}` (Requires ownership)
```json
{
  "name": "Updated Hall Name",
  "pricePerPlate": 1800
}
```

### 5. Delete Hall
**DELETE** `/halls/{hallId}` (Requires ownership)

### 6. Add Hall Amenity
**POST** `/halls/{hallId}/amenities` (Requires ownership)
```json
{
  "name": "Wifi",
  "description": "Free high-speed WiFi"
}
```

---

## Service Provider Endpoints

### 1. Create Service Profile
**POST** `/services` (Requires SERVICE_PROVIDER role)
```json
{
  "name": "Melodious Singers Band",
  "description": "Professional wedding band with modern music",
  "serviceType": "SINGER", // SINGER, CAR, MENU, KARNAY, DECORATION, PHOTOGRAPHY, VIDEOGRAPHY
  "pricing": 50000,
  "imageUrl": "url_to_image"
}
```

### 2. Get Available Services
**GET** `/services?serviceType=SINGER&minRating=4&page=1&limit=10`

### 3. Get Service Details
**GET** `/services/{serviceId}`

### 4. Update Service
**PUT** `/services/{serviceId}` (Requires ownership)

### 5. Delete Service
**DELETE** `/services/{serviceId}` (Requires ownership)

---

## Booking Endpoints

### 1. Create Booking
**POST** `/bookings/create` (Requires authentication)
```json
{
  "hallId": "hall_id",
  "eventDate": "2024-06-15T00:00:00Z",
  "eventTime": "19:00",
  "numberOfGuests": 300,
  "notes": "Special dietary requirements",
  "services": [
    {"serviceProviderId": "service_id", "quantity": 2}
  ]
}
```
**Response:** Booking with generated booking number

### 2. Get Bookings List
**GET** `/bookings?status=CONFIRMED&paymentStatus=ADVANCE_PAID&startDate=2024-01-01T00:00:00Z&page=1&limit=10`

### 3. Get Booking Details
**GET** `/bookings/{bookingId}`

### 4. Update Booking
**PUT** `/bookings/{bookingId}` (Requires ownership)

### 5. Cancel Booking
**DELETE** `/bookings/{bookingId}` (Requires ownership)

---

## Payment Endpoints

### 1. Create Payment
**POST** `/payments/create`
```json
{
  "bookingId": "booking_id",
  "paymentType": "ADVANCE", // ADVANCE, FINAL, SERVICE
  "paymentMethod": "CREDIT_CARD", // CREDIT_CARD, DEBIT_CARD, BANK_TRANSFER, CASH, STRIPE
  "amount": 50000
}
```
**Response:** Payment with invoice

### 2. Get Payments List
**GET** `/payments?status=ADVANCE_PAID&page=1&limit=10`

### 3. Process Stripe Payment
**POST** `/payments/stripe`
```json
{
  "bookingId": "booking_id",
  "amount": 50000,
  "paymentMethodId": "pm_stripe_id"
}
```

### 4. Get Payment Status
**GET** `/payments/stripe?paymentIntentId=pi_stripe_id`

---

## Review & Rating Endpoints

### 1. Create Review
**POST** `/reviews/create`
```json
{
  "rating": 5,
  "comment": "Excellent venue with great service",
  "hallId": "hall_id" // or serviceProviderId
}
```

### 2. Get Reviews
Reviews are included in hall and service details endpoints.

---

## Favorites Endpoints

### 1. Get Favorites
**GET** `/favorites?page=1&limit=10`

### 2. Add to Favorites
**POST** `/favorites`
```json
{
  "hallId": "hall_id"
}
```

### 3. Remove from Favorites
**DELETE** `/favorites/{hallId}`

---

## Notifications Endpoints

### 1. Get Notifications
**GET** `/notifications?isRead=false&page=1&limit=20`

### 2. Mark as Read
**PATCH** `/notifications/{notificationId}`

### 3. Delete Notification
**DELETE** `/notifications/{notificationId}`

---

## Chat & Messaging Endpoints

### 1. Get Conversations
**GET** `/chat/conversations?page=1&limit=10`

### 2. Start Conversation
**POST** `/chat/conversations`
```json
{
  "participantIds": ["user_id_1", "user_id_2"]
}
```

### 3. Get Conversation Messages
**GET** `/chat/conversations/{conversationId}?page=1&limit=50`

### 4. Send Message
**POST** `/chat/messages`
```json
{
  "conversationId": "conversation_id",
  "content": "Message content here"
}
```

---

## Invitations Endpoints

### 1. Send Invitations
**POST** `/invitations/create`
```json
{
  "bookingId": "booking_id",
  "guestEmails": ["guest1@example.com", "guest2@example.com"],
  "message": "You are invited to our wedding",
  "guestCount": 2
}
```

### 2. Get Invitations
**GET** `/invitations?status=PENDING&page=1&limit=10`

### 3. Update Invitation Status
**PATCH** `/invitations/{invitationId}`
```json
{
  "status": "ACCEPTED" // PENDING, ACCEPTED, DECLINED
}
```

---

## Error Handling

### Common Error Codes
- **400** - Bad Request / Validation Error
- **401** - Unauthorized / Invalid Token
- **403** - Forbidden / Permission Denied
- **404** - Not Found
- **409** - Conflict (Duplicate Entry)
- **500** - Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "message": "User-friendly message",
  "statusCode": 400
}
```

---

## Data Models

### User Roles
- `ADMIN` - System administrator
- `HALL_OWNER` - Wedding hall owner
- `SERVICE_PROVIDER` - Service provider (singers, cars, etc.)
- `CUSTOMER` - Booking customer

### Booking Status
- `PENDING` - Awaiting advance payment
- `CONFIRMED` - Advance payment received
- `COMPLETED` - Event completed
- `CANCELLED` - Booking cancelled
- `REFUNDED` - Amount refunded

### Payment Status
- `PENDING` - Payment pending
- `ADVANCE_PAID` - Advance payment received
- `FINAL_PAID` - Final payment received
- `REFUNDED` - Amount refunded
- `FAILED` - Payment failed

### Service Types
- `SINGER` - Professional singers/bands
- `CAR` - Wedding transportation
- `MENU` - Catering services
- `KARNAY` - Traditional instruments
- `DECORATION` - Venue decoration
- `PHOTOGRAPHY` - Professional photography
- `VIDEOGRAPHY` - Professional videography

---

## Rate Limiting

Currently no rate limiting is implemented. In production, add rate limiting middleware.

## CORS

CORS is enabled for all origins. Update in production for security.

## Security Notes

1. Always use HTTPS in production
2. Validate all input on both client and server
3. Use strong password requirements
4. Implement rate limiting
5. Use HTTPS for Stripe integration
6. Regularly update dependencies
7. Use environment variables for secrets
8. Implement logging and monitoring

---

## Pagination

Most list endpoints support pagination:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

---

## Deployment

### Database Migration
```bash
npx prisma migrate deploy
```

### Generate Prisma Client
```bash
npx prisma generate
```

### Seed Database (if needed)
```bash
npx prisma db seed
```

---

## Support

For issues or questions, contact: support@weddingly.com

---

## Version
API Version: 1.0.0
Last Updated: December 2024
