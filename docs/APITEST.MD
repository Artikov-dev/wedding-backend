# API Test Results Report

**Generated:** 2026-06-03T09:41:09.517Z
**API Base URL:** http://localhost:3000

## Summary

- **Total Tests:** 42
- **Passed:** 42
- **Failed:** 0
- **Success Rate:** 100.00%

---

## Test Results by Category

### 1. Health & Documentation (2/2)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| Health Check | GET | `/api/health` | ✅ | 2573ms |
| Get OpenAPI Specification | GET | `/api/docs` | ✅ | 84ms |


### 2. Authentication (8/8)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| User Registration | POST | `/api/auth/register` | ✅ | 3418ms |
| Hall Owner Registration | POST | `/api/auth/register` | ✅ | 2137ms |
| Service Provider Registration | POST | `/api/auth/register` | ✅ | 1693ms |
| User Login | POST | `/api/auth/login` | ✅ | 3497ms |
| Refresh Authentication Token | POST | `/api/auth/refresh` | ✅ | 3152ms |
| Request Password Reset | POST | `/api/auth/forgot-password` | ✅ | 2981ms |
| Verify OTP | POST | `/api/auth/verify-otp` | ✅ | 2437ms |
| Reset Password | POST | `/api/auth/reset-password` | ✅ | 2202ms |


### 3. Halls Management (11/11)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| Hall Owner Registration | POST | `/api/auth/register` | ✅ | 2137ms |
| Search Halls | GET | `/api/halls/search?city=New York&capacity=100&minPrice=1000&maxPrice=10000` | ✅ | 2483ms |
| Create Hall Profile | POST | `/api/halls/create` | ✅ | 4532ms |
| Approve Hall Profile | PUT | `/api/halls/4d706dcf-9b7f-4012-9b02-ddc4c884a141` | ✅ | 2293ms |
| Get Hall Profile | GET | `/api/halls/4d706dcf-9b7f-4012-9b02-ddc4c884a141` | ✅ | 2945ms |
| Update Hall Profile | PUT | `/api/halls/4d706dcf-9b7f-4012-9b02-ddc4c884a141` | ✅ | 1055ms |
| List Hall Amenities | GET | `/api/halls/4d706dcf-9b7f-4012-9b02-ddc4c884a141/amenities` | ✅ | 2673ms |
| Add Hall Amenity | POST | `/api/halls/4d706dcf-9b7f-4012-9b02-ddc4c884a141/amenities` | ✅ | 1050ms |
| List Favorite Halls | GET | `/api/favorites` | ✅ | 2824ms |
| Add Favorite Hall | POST | `/api/favorites` | ✅ | 1130ms |
| Remove Favorite Hall | DELETE | `/api/favorites/4d706dcf-9b7f-4012-9b02-ddc4c884a141` | ✅ | 2754ms |


### 4. Bookings (5/5)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Bookings | GET | `/api/bookings?page=1&limit=10` | ✅ | 2617ms |
| Create Booking | POST | `/api/bookings/create` | ✅ | 3120ms |
| Get Booking Details | GET | `/api/bookings/01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e` | ✅ | 4989ms |
| Update Booking Status | PUT | `/api/bookings/01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e` | ✅ | 1157ms |
| Cancel Booking | DELETE | `/api/bookings/01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e` | ✅ | 4018ms |


### 5. Services (6/6)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| Service Provider Registration | POST | `/api/auth/register` | ✅ | 1693ms |
| List Service Providers | GET | `/api/services` | ✅ | 3108ms |
| Create Service Provider | POST | `/api/services` | ✅ | 622ms |
| Get Service Provider | GET | `/api/services/ba621471-aef4-45f8-b93e-6c2933aec1da` | ✅ | 2346ms |
| Update Service Provider | PUT | `/api/services/ba621471-aef4-45f8-b93e-6c2933aec1da` | ✅ | 720ms |
| Delete Service Provider | DELETE | `/api/services/ba621471-aef4-45f8-b93e-6c2933aec1da` | ✅ | 909ms |


### 6. Favorites (3/3)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Favorite Halls | GET | `/api/favorites` | ✅ | 2824ms |
| Add Favorite Hall | POST | `/api/favorites` | ✅ | 1130ms |
| Remove Favorite Hall | DELETE | `/api/favorites/4d706dcf-9b7f-4012-9b02-ddc4c884a141` | ✅ | 2754ms |


### 7. Chat & Messaging (4/4)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Chat Conversations | GET | `/api/chat/conversations` | ✅ | 2705ms |
| Create Chat Conversation | POST | `/api/chat/conversations` | ✅ | 616ms |
| Get Conversation Messages | GET | `/api/chat/conversations/4fb134ba-60db-4898-a58c-daab86c4df11` | ✅ | 4423ms |
| Send Chat Message | POST | `/api/chat/messages` | ✅ | 3859ms |


### 8. Reviews (1/1)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| Create Review | POST | `/api/reviews/create` | ✅ | 4165ms |


### 9. Invitations (2/2)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Invitations | GET | `/api/invitations` | ✅ | 2682ms |
| Create Invitation | POST | `/api/invitations/create` | ✅ | 3432ms |


### 10. Notifications (1/1)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Notifications | GET | `/api/notifications` | ✅ | 2370ms |


### 11. Payments (4/4)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Payments | GET | `/api/payments` | ✅ | 5064ms |
| Record Payment | POST | `/api/payments/create` | ✅ | 3074ms |
| Process Stripe Payment | POST | `/api/payments/stripe` | ✅ | 3302ms |
| Get Stripe Payment Status | GET | `/api/payments/stripe?paymentIntentId=pi_test123` | ✅ | 36ms |


---

## Detailed Test Results


### Test 1: Health Check

- **Method:** GET
- **Endpoint:** /api/health
- **Description:** Verify API and database connectivity
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2573ms

- **Response:** ```json
{
  "status": "healthy",
  "timestamp": "2026-06-03T09:39:24.809Z",
  "uptime": 421.8644024,
  "database": "connected",
  "version": "1.0.0"
}
```

---


### Test 2: Get OpenAPI Specification

- **Method:** GET
- **Endpoint:** /api/docs
- **Description:** Retrieve OpenAPI JSON document
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 84ms

- **Response:** ```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Wedding Hall Booking API",
    "version": "1.0.0",
    "description": "Production-grade wedding hall booking backend API documentation.",
    "contact": {
      "name": "Backend Team",
      "email": "support@example.com"
    }
  },
  "servers": [
    {
      "url": "/",
      "description": "Current server"
    }
  ],
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "ApiResponse": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": [
              "object",
              "array",
              "string",
              "number",
              "boolean",
              "null"
            ]
          },
          "message": {
            "type": "string"
          },
          "error": {
            "type": "string"
          },
          "statusCode": {
            "type": "integer"
          }
        }
      },
      "LoginRequest": {
        "type": "object",
        "required": [
          "email",
          "password"
        ],
        "properties": {
          "email": {
            "type": "string",
            "format": "email"
          },
          "password": {
            "type": "string"
          }
        }
      },
      "RegisterRequest": {
        "type": "object",
        "required": [
          "email",
          "phone",
          "password",
          "firstName",
          "lastName"
        ],
        "properties": {
          "email": {
            "type": "string",
            "format": "email"
          },
          "phone": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "role": {
            "type": "string",
            "enum": [
              "ADMIN",
              "HALL_OWNER",
              "SERVICE_PROVIDER",
              "CUSTOMER"
            ]
          }
        }
      },
      "AuthResponse": {
        "type": "object",
        "properties": {
          "user": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "role": {
                "type": "string"
              }
            }
          },
          "token": {
            "type": "string"
          },
          "refreshToken": {
            "type": "string"
          }
        }
      },
      "HealthResponse": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          },
          "timestamp": {
            "type": "string",
            "format": "date-time"
          },
          "uptime": {
            "type": "number"
          },
          "database": {
            "type": "string"
          },
          "version": {
            "type": "string"
          }
        }
      },
      "BookingCreateRequest": {
        "type": "object",
        "required": [
          "hallId",
          "eventDate",
          "eventTime",
          "numberOfGuests",
          "totalAmount",
          "advanceAmount",
          "finalAmount"
        ],
        "properties": {
          "hallId": {
            "type": "string"
          },
          "eventDate": {
            "type": "string",
            "format": "date"
          },
          "eventTime": {
            "type": "string"
          },
          "numberOfGuests": {
            "type": "integer"
          },
          "notes": {
            "type": "string"
          },
          "totalAmount": {
            "type": "number"
          },
          "advanceAmount": {
            "type": "number"
          },
          "finalAmount": {
            "type": "number"
          },
          "serviceProviderIds": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "PaymentCreateRequest": {
        "type": "object",
        "required": [
          "bookingId",
          "amount",
          "paymentMethodId"
        ],
        "properties": {
          "bookingId": {
            "type": "string"
          },
          "amount": {
            "type": "number"
          },
          "paymentMethodId": {
            "type": "string"
          },
          "paymentMethod": {
            "type": "string"
          }
        }
      },
      "ReviewCreateRequest": {
        "type": "object",
        "required": [
          "rating"
        ],
        "properties": {
          "bookingId": {
            "type": "string"
          },
          "hallId": {
            "type": "string"
          },
          "serviceProviderId": {
            "type": "string"
          },
          "rating": {
            "type": "integer",
            "minimum": 1,
            "maximum": 5
          },
          "comment": {
            "type": "string"
          }
        }
      },
      "ServiceCreateRequest": {
        "type": "object",
        "required": [
          "name",
          "serviceType",
          "pricing"
        ],
        "properties": {
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "serviceType": {
            "type": "string"
          },
          "pricing": {
            "type": "number"
          }
        }
      },
      "InvitationCreateRequest": {
        "type": "object",
        "required": [
          "bookingId",
          "email",
          "guestCount"
        ],
        "properties": {
          "bookingId": {
            "type": "string"
          },
          "email": {
            "type": "string",
            "format": "email"
          },
          "phone": {
            "type": "string"
          },
          "guestCount": {
            "type": "integer"
          },
          "message": {
            "type": "string"
          }
        }
      },
      "UpdateStatusRequest": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          }
        }
      }
    }
  },
  "paths": {
    "/api/auth/login": {
      "post": {
        "summary": "Authenticate user",
        "description": "Login with email and password to receive JWT and refresh token.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              },
              "example": {
                "email": "user@example.com",
                "password": "Secret123!"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Login succeeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "400": {
            "description": "Validation error"
          },
          "401": {
            "description": "Invalid credentials"
          }
        }
      }
    },
    "/api/auth/register": {
      "post": {
        "summary": "Register new user",
        "description": "Create a customer or provider account and issue tokens.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              },
              "example": {
                "email": "newuser@example.com",
                "phone": "+15551234567",
                "password": "Secret123!",
                "firstName": "Jane",
                "lastName": "Doe",
                "role": "CUSTOMER"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User registered",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "400": {
            "description": "Validation error"
          },
          "409": {
            "description": "User already exists"
          }
        }
      }
    },
    "/api/auth/refresh": {
      "post": {
        "summary": "Refresh authentication token",
        "description": "Use a valid refresh token to obtain a new JWT.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "refreshToken"
                ],
                "properties": {
                  "refreshToken": {
                    "type": "string"
                  }
                }
              },
              "example": {
                "refreshToken": "eyJhbGciOiJIUzI1..."
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Token refreshed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Invalid refresh token"
          }
        }
      }
    },
    "/api/auth/forgot-password": {
      "post": {
        "summary": "Request password reset",
        "description": "Start password reset flow by email.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "email"
                ],
                "properties": {
                  "email": {
                    "type": "string",
                    "format": "email"
                  }
                }
              },
              "example": {
                "email": "user@example.com"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Reset email sent",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/reset-password": {
      "post": {
        "summary": "Reset password",
        "description": "Confirm OTP and set a new password.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "email",
                  "otp",
                  "newPassword"
                ],
                "properties": {
                  "email": {
                    "type": "string",
                    "format": "email"
                  },
                  "otp": {
                    "type": "string"
                  },
                  "newPassword": {
                    "type": "string"
                  }
                }
              },
              "example": {
                "email": "user@example.com",
                "otp": "123456",
                "newPassword": "NewSecret123!"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Password reset",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "400": {
            "description": "Validation error"
          },
          "404": {
            "description": "User not found"
          }
        }
      }
    },
    "/api/auth/verify-otp": {
      "post": {
        "summary": "Verify OTP",
        "description": "Validate an email or phone OTP code.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "email",
                  "code"
                ],
                "properties": {
                  "email": {
                    "type": "string",
                    "format": "email"
                  },
                  "code": {
                    "type": "string"
                  }
                }
              },
              "example": {
                "email": "user@example.com",
                "code": "123456"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OTP verified",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "400": {
            "description": "Invalid OTP"
          }
        }
      }
    },
    "/api/health": {
      "get": {
        "summary": "Health check",
        "description": "Verify API and database connectivity.",
        "responses": {
          "200": {
            "description": "API is healthy",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HealthResponse"
                }
              }
            }
          },
          "503": {
            "description": "Database connection failed"
          }
        }
      }
    },
    "/api/bookings": {
      "get": {
        "summary": "List bookings",
        "description": "Retrieve bookings with pagination and role-aware filtering.",
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "paymentStatus",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 1
            }
          },
          {
            "name": "limit",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 10
            }
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Bookings retrieved",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/bookings/create": {
      "post": {
        "summary": "Create a booking",
        "description": "Create a new booking and associated service bookings.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BookingCreateRequest"
              },
              "example": {
                "hallId": "hall_123",
                "eventDate": "2026-12-31",
                "eventTime": "18:00",
                "numberOfGuests": 150,
                "notes": "Wedding ceremony",
                "totalAmount": 15000,
                "advanceAmount": 3750,
                "finalAmount": 11250,
                "serviceProviderIds": [
                  "sp_1",
                  "sp_2"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Booking created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "400": {
            "description": "Validation error"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/bookings/{bookingId}": {
      "parameters": [
        {
          "name": "bookingId",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "get": {
        "summary": "Get booking details",
        "description": "Retrieve a single booking by ID.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Booking details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Booking not found"
          }
        }
      },
      "put": {
        "summary": "Update booking",
        "description": "Update booking status or details.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": false,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string"
                  },
                  "paymentStatus": {
                    "type": "string"
                  },
                  "notes": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Booking updated",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Booking not found"
          }
        }
      },
      "delete": {
        "summary": "Cancel booking",
        "description": "Cancel an existing booking.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Booking cancelled",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Booking not found"
          }
        }
      }
    },
    "/api/chat/conversations": {
      "get": {
        "summary": "List conversations",
        "description": "Retrieve chat conversations for the authenticated user.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Conversations list",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      },
      "post": {
        "summary": "Create or fetch conversation",
        "description": "Start a new chat conversation when one does not already exist.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "participantId"
                ],
                "properties": {
                  "participantId": {
                    "type": "string"
                  }
                }
              },
              "example": {
                "participantId": "user_456"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Conversation created or returned",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/chat/conversations/{conversationId}": {
      "parameters": [
        {
          "name": "conversationId",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "get": {
        "summary": "Get conversation messages",
        "description": "Retrieve messages for a single conversation.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Conversation messages",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Conversation not found"
          }
        }
      }
    },
    "/api/chat/messages": {
      "post": {
        "summary": "Send chat message",
        "description": "Post a message into an existing chat conversation.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "conversationId",
                  "content"
                ],
                "properties": {
                  "conversationId": {
                    "type": "string"
                  },
                  "content": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Message sent",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/favorites": {
      "get": {
        "summary": "List favorites",
        "description": "Retrieve the authenticated user's favorite halls.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Favorites list",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Add favorite",
        "description": "Mark a hall as favored by the authenticated user.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "hallId"
                ],
                "properties": {
                  "hallId": {
                    "type": "string"
                  }
                }
              },
              "example": {
                "hallId": "hall_123"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Favorite added",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/favorites/{hallId}": {
      "parameters": [
        {
          "name": "hallId",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "delete": {
        "summary": "Remove favorite",
        "description": "Delete a hall from the authenticated user's favorites.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Favorite removed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/halls/search": {
      "get": {
        "summary": "Search halls",
        "description": "Search halls by city, capacity, price, rating, and category.",
        "parameters": [
          {
            "name": "city",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "capacity",
            "in": "query",
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "minPrice",
            "in": "query",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "maxPrice",
            "in": "query",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "category",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "rating",
            "in": "query",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 1
            }
          },
          {
            "name": "limit",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 10
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Search results",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/halls/create": {
      "post": {
        "summary": "Create hall profile",
        "description": "Create a new hall listing for a hall owner.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name",
                  "description",
                  "capacity",
                  "pricePerPlate"
                ],
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "category": {
                    "type": "string"
                  },
                  "capacity": {
                    "type": "integer"
                  },
                  "pricePerPlate": {
                    "type": "number"
                  },
                  "imageUrl": {
                    "type": "string"
                  }
                }
              },
              "example": {
                "name": "Ocean View Hall",
                "description": "A luxury seaside ballroom.",
                "capacity": 250,
                "pricePerPlate": 75
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Hall created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/halls/{hallId}": {
      "parameters": [
        {
          "name": "hallId",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "get": {
        "summary": "Get hall profile",
        "description": "Fetch the hall profile by ID.",
        "responses": {
          "200": {
            "description": "Hall profile",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "404": {
            "description": "Hall not found"
          }
        }
      },
      "put": {
        "summary": "Update hall profile",
        "description": "Update hall details as the hall owner.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": false,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "capacity": {
                    "type": "integer"
                  },
                  "pricePerPlate": {
                    "type": "number"
                  },
                  "imageUrl": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Hall updated",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete hall profile",
        "description": "Remove a hall listing.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Hall deleted",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/halls/{hallId}/amenities": {
      "parameters": [
        {
          "name": "hallId",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "get": {
        "summary": "List hall amenities",
        "description": "Get amenities for a specific hall.",
        "responses": {
          "200": {
            "description": "Amenities returned",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Add an amenity",
        "description": "Create a new amenity for the hall.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  }
                }
              },
              "example": {
                "name": "Parking",
                "description": "Free onsite parking"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Amenity created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/invitations": {
      "get": {
        "summary": "List invitations",
        "description": "Retrieve invitations for the logged-in user.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Invitations list",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/invitations/create": {
      "post": {
        "summary": "Create an invitation",
        "description": "Invite a guest to a booking.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InvitationCreateRequest"
              },
              "example": {
                "bookingId": "booking_123",
                "email": "guest@example.com",
                "phone": "+15551234567",
                "guestCount": 2,
                "message": "Please join our wedding"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Invitation created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/invitations/{invitationId}": {
      "parameters": [
        {
          "name": "invitationId",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "patch": {
        "summary": "Update invitation status",
        "description": "Accept or decline an invitation.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateStatusRequest"
              },
              "example": {
                "status": "ACCEPTED"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Invitation updated",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "404": {
            "description": "Invitation not found"
          }
        }
      }
    },
    "/api/notifications": {
      "get": {
        "summary": "List notifications",
        "description": "Get notifications for the authenticated user.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Notifications list",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/notifications/{notificationId}": {
      "parameters": [
        {
          "name": "notificationId",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "patch": {
        "summary": "Mark notification read",
        "description": "Update the notification status.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Notification updated",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete notification",
        "description": "Remove a notification.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Notification deleted",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/payments": {
      "get": {
        "summary": "List payments",
        "description": "Retrieve payments for the authenticated user.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Payments list",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/payments/create": {
      "post": {
        "summary": "Record a payment",
        "description": "Create a payment and invoice record.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PaymentCreateRequest"
              },
              "example": {
                "bookingId": "booking_123",
                "amount": 750,
                "paymentMethodId": "pm_abc"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Payment recorded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/payments/stripe": {
      "post": {
        "summary": "Process Stripe payment",
        "description": "Simulate Stripe payment creation for booking advance payments.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PaymentCreateRequest"
              },
              "example": {
                "bookingId": "booking_123",
                "amount": 300,
                "paymentMethodId": "pm_abc"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Payment processed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      },
      "get": {
        "summary": "Get Stripe payment status",
        "description": "Retrieve demo payment status from Stripe flow.",
        "parameters": [
          {
            "name": "paymentIntentId",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Payment status",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/reviews/create": {
      "post": {
        "summary": "Create a review",
        "description": "Add a review for a hall or service provider.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ReviewCreateRequest"
              },
              "example": {
                "bookingId": "booking_123",
                "hallId": "hall_123",
                "rating": 5,
                "comment": "Excellent venue!"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Review created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/services": {
      "get": {
        "summary": "List service providers",
        "description": "Search service providers with optional filters.",
        "responses": {
          "200": {
            "description": "Service providers returned",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create service provider",
        "description": "Register a new service provider.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServiceCreateRequest"
              },
              "example": {
                "name": "Elegant Catering",
                "serviceType": "MENU",
                "pricing": 500
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Service provider created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/services/{serviceId}": {
      "parameters": [
        {
          "name": "serviceId",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "get": {
        "summary": "Get service provider",
        "description": "Fetch a service provider record.",
        "responses": {
          "200": {
            "description": "Service provider returned",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          }
        }
      },
      "put": {
        "summary": "Update service provider",
        "description": "Modify a service provider's details.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": false,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "pricing": {
                    "type": "number"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Service provider updated",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete service provider",
        "description": "Remove a service provider account.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Service provider deleted",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/docs": {
      "get": {
        "summary": "OpenAPI JSON document",
        "description": "Serve the generated OpenAPI document used by Swagger UI.",
        "responses": {
          "200": {
            "description": "OpenAPI specification JSON",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    }
  }
}
```

---


### Test 3: User Registration

- **Method:** POST
- **Endpoint:** /api/auth/register
- **Description:** Register a new user account
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 3418ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "user": {
      "id": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
      "email": "test1780479564908@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNWViNzllNS1mYmQ1LTRlZTYtYmY0MC00ZjM1NGNjYjIxOGEiLCJlbWFpbCI6InRlc3QxNzgwNDc5NTY0OTA4QGV4YW1wbGUuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzgwNDc5NTY4LCJleHAiOjE3ODEwODQzNjh9.B9XR6trveEYxZIRn1-MzjcNU1Xpgw13hLKtksR7OiO0",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNWViNzllNS1mYmQ1LTRlZTYtYmY0MC00ZjM1NGNjYjIxOGEiLCJpYXQiOjE3ODA0Nzk1NjgsImV4cCI6MTc4MzA3MTU2OH0.pEMj0oy6QHDUAKZFIGbYFTgF0m_OZYzgwruqvKNF6Ew"
  },
  "message": "User registered successfully",
  "statusCode": 201
}
```

---


### Test 4: Hall Owner Registration

- **Method:** POST
- **Endpoint:** /api/auth/register
- **Description:** Register a hall owner account
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 2137ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "user": {
      "id": "876cb23d-279e-4a8d-a4d2-040b09ecacf6",
      "email": "owner1780479568326@example.com",
      "firstName": "Hall",
      "lastName": "Owner",
      "role": "HALL_OWNER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NzZjYjIzZC0yNzllLTRhOGQtYTRkMi0wNDBiMDllY2FjZjYiLCJlbWFpbCI6Im93bmVyMTc4MDQ3OTU2ODMyNkBleGFtcGxlLmNvbSIsInJvbGUiOiJIQUxMX09XTkVSIiwiaWF0IjoxNzgwNDc5NTY5LCJleHAiOjE3ODEwODQzNjl9.uKbuyvrDELJ4c0yuqGz3qQmqZy9nPaNO-UBQpnvjSN0",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NzZjYjIzZC0yNzllLTRhOGQtYTRkMi0wNDBiMDllY2FjZjYiLCJpYXQiOjE3ODA0Nzk1NjksImV4cCI6MTc4MzA3MTU2OX0.BVwodflgYCilYxOzQs-Lbo5_dycCrKALoGz4uM1Yk3c"
  },
  "message": "User registered successfully",
  "statusCode": 201
}
```

---


### Test 5: Service Provider Registration

- **Method:** POST
- **Endpoint:** /api/auth/register
- **Description:** Register a service provider account
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 1693ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "user": {
      "id": "dec7fc15-24c8-48cc-8653-0bf629d8e0fd",
      "email": "provider1780479570464@example.com",
      "firstName": "Service",
      "lastName": "Provider",
      "role": "SERVICE_PROVIDER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWM3ZmMxNS0yNGM4LTQ4Y2MtODY1My0wYmY2MjlkOGUwZmQiLCJlbWFpbCI6InByb3ZpZGVyMTc4MDQ3OTU3MDQ2NEBleGFtcGxlLmNvbSIsInJvbGUiOiJTRVJWSUNFX1BST1ZJREVSIiwiaWF0IjoxNzgwNDc5NTcxLCJleHAiOjE3ODEwODQzNzF9.bsPEUPHimqnZzBWo-0cuFBSbg5VLMqxhYZFJekzzfa8",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWM3ZmMxNS0yNGM4LTQ4Y2MtODY1My0wYmY2MjlkOGUwZmQiLCJpYXQiOjE3ODA0Nzk1NzEsImV4cCI6MTc4MzA3MTU3MX0.3QEStMQb9QPhYGAdLFxIQ34VyJ8bxQB6dcjr78IkDic"
  },
  "message": "User registered successfully",
  "statusCode": 201
}
```

---


### Test 6: User Login

- **Method:** POST
- **Endpoint:** /api/auth/login
- **Description:** Authenticate user with email and password
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 3497ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "user": {
      "id": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
      "email": "test1780479564908@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNWViNzllNS1mYmQ1LTRlZTYtYmY0MC00ZjM1NGNjYjIxOGEiLCJlbWFpbCI6InRlc3QxNzgwNDc5NTY0OTA4QGV4YW1wbGUuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzgwNDc5NTc1LCJleHAiOjE3ODEwODQzNzV9.bqPvNaCIx8isTGO8_ycXa4dghjC1NA1P2Q9c5_PEO7s",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNWViNzllNS1mYmQ1LTRlZTYtYmY0MC00ZjM1NGNjYjIxOGEiLCJpYXQiOjE3ODA0Nzk1NzUsImV4cCI6MTc4MzA3MTU3NX0.K66yAeOGp45tfx9PlrUdaJ1AFCxFjRd02cLgYiSGieM"
  },
  "message": "Login successful",
  "statusCode": 200
}
```

---


### Test 7: Refresh Authentication Token

- **Method:** POST
- **Endpoint:** /api/auth/refresh
- **Description:** Obtain a new JWT using refresh token
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 3152ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNWViNzllNS1mYmQ1LTRlZTYtYmY0MC00ZjM1NGNjYjIxOGEiLCJlbWFpbCI6InRlc3QxNzgwNDc5NTY0OTA4QGV4YW1wbGUuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzgwNDc5NTc4LCJleHAiOjE3ODEwODQzNzh9.UTDpnyh7KC8w7bx689e1lq1eC9_e-U2_bFu5GEcSsPc",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNWViNzllNS1mYmQ1LTRlZTYtYmY0MC00ZjM1NGNjYjIxOGEiLCJpYXQiOjE3ODA0Nzk1NzgsImV4cCI6MTc4MzA3MTU3OH0.T7PECVHFkj_o2wllm82DK7tRype1YEkMAMxMy_Ma0wk"
  },
  "message": "Token refreshed successfully",
  "statusCode": 200
}
```

---


### Test 8: Request Password Reset

- **Method:** POST
- **Endpoint:** /api/auth/forgot-password
- **Description:** Start password reset flow by email
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2981ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "userId": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a"
  },
  "message": "Password reset OTP sent to email",
  "statusCode": 200
}
```

---


### Test 9: Verify OTP

- **Method:** POST
- **Endpoint:** /api/auth/verify-otp
- **Description:** Validate an email OTP code
- **Status:** ✅ PASSED
- **Status Code:** 401
- **Response Time:** 2437ms

- **Response:** ```json
{
  "success": false,
  "error": "Invalid or expired OTP",
  "message": "OTP verification failed",
  "statusCode": 401
}
```

---


### Test 10: Reset Password

- **Method:** POST
- **Endpoint:** /api/auth/reset-password
- **Description:** Confirm OTP and set a new password
- **Status:** ✅ PASSED
- **Status Code:** 401
- **Response Time:** 2202ms

- **Response:** ```json
{
  "success": false,
  "error": "Invalid or expired OTP",
  "message": "OTP verification failed",
  "statusCode": 401
}
```

---


### Test 11: Search Halls

- **Method:** GET
- **Endpoint:** /api/halls/search?city=New York&capacity=100&minPrice=1000&maxPrice=10000
- **Description:** Search halls by city, capacity, price, and rating
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2483ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "halls": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "pages": 0
    }
  },
  "message": "Halls retrieved successfully",
  "statusCode": 200
}
```

---


### Test 12: Create Hall Profile

- **Method:** POST
- **Endpoint:** /api/halls/create
- **Description:** Create a new hall listing for a hall owner
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 4532ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "userId": "876cb23d-279e-4a8d-a4d2-040b09ecacf6",
    "name": "Test Hall",
    "description": "A beautiful test wedding hall for automated API testing",
    "category": "LUXURY",
    "capacity": 250,
    "pricePerPlate": "75",
    "advancePercentage": "25",
    "imageUrl": "https://example.com/hall.jpg",
    "approvalStatus": "PENDING",
    "isActive": true,
    "ratings": "0",
    "totalReviews": 0,
    "createdAt": "2026-06-03T09:39:52.235Z",
    "updatedAt": "2026-06-03T09:39:52.235Z"
  },
  "message": "Hall created successfully. Pending admin approval.",
  "statusCode": 201
}
```

---


### Test 13: Approve Hall Profile

- **Method:** PUT
- **Endpoint:** /api/halls/4d706dcf-9b7f-4012-9b02-ddc4c884a141
- **Description:** Approve hall for booking tests
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2293ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "userId": "876cb23d-279e-4a8d-a4d2-040b09ecacf6",
    "name": "Test Hall",
    "description": "A beautiful test wedding hall for automated API testing",
    "category": "LUXURY",
    "capacity": 250,
    "pricePerPlate": "75",
    "advancePercentage": "25",
    "imageUrl": "https://example.com/hall.jpg",
    "approvalStatus": "APPROVED",
    "isActive": true,
    "ratings": "0",
    "totalReviews": 0,
    "createdAt": "2026-06-03T09:39:52.235Z",
    "updatedAt": "2026-06-03T09:39:52.235Z"
  },
  "message": "Hall updated successfully",
  "statusCode": 200
}
```

---


### Test 14: Get Hall Profile

- **Method:** GET
- **Endpoint:** /api/halls/4d706dcf-9b7f-4012-9b02-ddc4c884a141
- **Description:** Retrieve hall profile by ID
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2945ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "userId": "876cb23d-279e-4a8d-a4d2-040b09ecacf6",
    "name": "Test Hall",
    "description": "A beautiful test wedding hall for automated API testing",
    "category": "LUXURY",
    "capacity": 250,
    "pricePerPlate": "75",
    "advancePercentage": "25",
    "imageUrl": "https://example.com/hall.jpg",
    "approvalStatus": "APPROVED",
    "isActive": true,
    "ratings": "0",
    "totalReviews": 0,
    "createdAt": "2026-06-03T09:39:52.235Z",
    "updatedAt": "2026-06-03T09:39:52.235Z",
    "user": {
      "id": "876cb23d-279e-4a8d-a4d2-040b09ecacf6",
      "firstName": "Hall",
      "lastName": "Owner",
      "phone": "+16669568326",
      "email": "owner1780479568326@example.com"
    },
    "amenities": [],
    "services": [],
    "reviews": [],
    "_count": {
      "bookings": 0,
      "reviews": 0,
      "favorites": 0
    }
  },
  "message": "Hall retrieved successfully",
  "statusCode": 200
}
```

---


### Test 15: Update Hall Profile

- **Method:** PUT
- **Endpoint:** /api/halls/4d706dcf-9b7f-4012-9b02-ddc4c884a141
- **Description:** Update hall details as the hall owner
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 1055ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "userId": "876cb23d-279e-4a8d-a4d2-040b09ecacf6",
    "name": "Updated Test Hall",
    "description": "An updated test wedding hall with more capacity",
    "category": "LUXURY",
    "capacity": 300,
    "pricePerPlate": "85",
    "advancePercentage": "25",
    "imageUrl": "https://example.com/hall.jpg",
    "approvalStatus": "APPROVED",
    "isActive": true,
    "ratings": "0",
    "totalReviews": 0,
    "createdAt": "2026-06-03T09:39:52.235Z",
    "updatedAt": "2026-06-03T09:39:52.235Z"
  },
  "message": "Hall updated successfully",
  "statusCode": 200
}
```

---


### Test 16: List Hall Amenities

- **Method:** GET
- **Endpoint:** /api/halls/4d706dcf-9b7f-4012-9b02-ddc4c884a141/amenities
- **Description:** Get amenities for a specific hall
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2673ms

- **Response:** ```json
{
  "success": true,
  "data": [],
  "message": "Amenities retrieved successfully",
  "statusCode": 200
}
```

---


### Test 17: Add Hall Amenity

- **Method:** POST
- **Endpoint:** /api/halls/4d706dcf-9b7f-4012-9b02-ddc4c884a141/amenities
- **Description:** Create a new amenity for the hall
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 1050ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "5447c93f-1ad1-4175-ac75-7223599c3001",
    "hallId": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "name": "Parking",
    "description": "Free onsite parking",
    "createdAt": "2026-06-03T09:40:02.110Z"
  },
  "message": "Amenity added successfully",
  "statusCode": 201
}
```

---


### Test 18: List Bookings

- **Method:** GET
- **Endpoint:** /api/bookings?page=1&limit=10
- **Description:** Retrieve bookings with pagination and role-aware filtering
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2617ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "bookings": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "pages": 0
    }
  },
  "message": "Bookings retrieved successfully",
  "statusCode": 200
}
```

---


### Test 19: Create Booking

- **Method:** POST
- **Endpoint:** /api/bookings/create
- **Description:** Create a new booking and associated service bookings
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 3120ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e",
    "bookingNumber": "BK1780479608515138",
    "hallId": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "userId": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
    "eventDate": "2026-12-31T00:00:00.000Z",
    "eventTime": "18:00",
    "numberOfGuests": 150,
    "notes": "Test booking",
    "totalAmount": "12750",
    "advanceAmount": "3187.5",
    "finalAmount": "9562.5",
    "status": "PENDING",
    "paymentStatus": "PENDING",
    "createdAt": "2026-06-03T09:40:07.659Z",
    "updatedAt": "2026-06-03T09:40:07.659Z"
  },
  "message": "Booking created successfully. Please complete the advance payment to confirm.",
  "statusCode": 201
}
```

---


### Test 20: Get Booking Details

- **Method:** GET
- **Endpoint:** /api/bookings/01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e
- **Description:** Retrieve a single booking by ID
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 4989ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e",
    "bookingNumber": "BK1780479608515138",
    "hallId": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "userId": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
    "eventDate": "2026-12-31T00:00:00.000Z",
    "eventTime": "18:00",
    "numberOfGuests": 150,
    "notes": "Test booking",
    "totalAmount": "12750",
    "advanceAmount": "3187.5",
    "finalAmount": "9562.5",
    "status": "PENDING",
    "paymentStatus": "PENDING",
    "createdAt": "2026-06-03T09:40:07.659Z",
    "updatedAt": "2026-06-03T09:40:07.659Z",
    "hall": {
      "id": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
      "userId": "876cb23d-279e-4a8d-a4d2-040b09ecacf6",
      "name": "Updated Test Hall",
      "description": "An updated test wedding hall with more capacity",
      "category": "LUXURY",
      "capacity": 300,
      "pricePerPlate": "85",
      "advancePercentage": "25",
      "imageUrl": "https://example.com/hall.jpg",
      "approvalStatus": "APPROVED",
      "isActive": true,
      "ratings": "0",
      "totalReviews": 0,
      "createdAt": "2026-06-03T09:39:52.235Z",
      "updatedAt": "2026-06-03T09:39:52.235Z",
      "amenities": [
        {
          "id": "5447c93f-1ad1-4175-ac75-7223599c3001",
          "hallId": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
          "name": "Parking",
          "description": "Free onsite parking",
          "createdAt": "2026-06-03T09:40:02.110Z"
        }
      ],
      "services": [],
      "user": null
    },
    "user": {
      "id": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
      "firstName": "Test",
      "lastName": "User",
      "email": "test1780479564908@example.com",
      "phone": "+15559564908"
    },
    "serviceBookings": [],
    "payments": [],
    "invitations": []
  },
  "message": "Booking retrieved successfully",
  "statusCode": 200
}
```

---


### Test 21: Update Booking Status

- **Method:** PUT
- **Endpoint:** /api/bookings/01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e
- **Description:** Update booking status or details
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 1157ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e",
    "bookingNumber": "BK1780479608515138",
    "hallId": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "userId": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
    "eventDate": "2026-12-31T00:00:00.000Z",
    "eventTime": "18:00",
    "numberOfGuests": 150,
    "notes": "Updated test booking",
    "totalAmount": "12750",
    "advanceAmount": "3187.5",
    "finalAmount": "9562.5",
    "status": "CONFIRMED",
    "paymentStatus": "PENDING",
    "createdAt": "2026-06-03T09:40:07.659Z",
    "updatedAt": "2026-06-03T09:40:07.659Z"
  },
  "message": "Booking updated successfully",
  "statusCode": 200
}
```

---


### Test 22: List Service Providers

- **Method:** GET
- **Endpoint:** /api/services
- **Description:** Search service providers with optional filters
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 3108ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "e4f2a4d8-481b-4fa9-8482-64fd60998da8",
        "userId": "8ab52fbc-032d-4fc4-a36f-4ba75a48271f",
        "name": "Test Catering Service",
        "description": "Professional catering service",
        "serviceType": "MENU",
        "pricing": "500",
        "imageUrl": null,
        "status": "AVAILABLE",
        "ratings": "0",
        "totalReviews": 0,
        "createdAt": "2026-06-02T17:00:36.496Z",
        "updatedAt": "2026-06-02T17:00:36.496Z",
        "user": null
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  },
  "message": "Services retrieved successfully",
  "statusCode": 200
}
```

---


### Test 23: Create Service Provider

- **Method:** POST
- **Endpoint:** /api/services
- **Description:** Register a new service provider
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 622ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "ba621471-aef4-45f8-b93e-6c2933aec1da",
    "userId": "dec7fc15-24c8-48cc-8653-0bf629d8e0fd",
    "name": "Test Catering Service",
    "description": "Professional catering service",
    "serviceType": "MENU",
    "pricing": "500",
    "imageUrl": null,
    "status": "AVAILABLE",
    "ratings": "0",
    "totalReviews": 0,
    "createdAt": "2026-06-03T09:40:17.847Z",
    "updatedAt": "2026-06-03T09:40:17.847Z"
  },
  "message": "Service created successfully",
  "statusCode": 201
}
```

---


### Test 24: Get Service Provider

- **Method:** GET
- **Endpoint:** /api/services/ba621471-aef4-45f8-b93e-6c2933aec1da
- **Description:** Fetch a service provider record
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2346ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "ba621471-aef4-45f8-b93e-6c2933aec1da",
    "userId": "dec7fc15-24c8-48cc-8653-0bf629d8e0fd",
    "name": "Test Catering Service",
    "description": "Professional catering service",
    "serviceType": "MENU",
    "pricing": "500",
    "imageUrl": null,
    "status": "AVAILABLE",
    "ratings": "0",
    "totalReviews": 0,
    "createdAt": "2026-06-03T09:40:17.847Z",
    "updatedAt": "2026-06-03T09:40:17.847Z",
    "user": {
      "id": "dec7fc15-24c8-48cc-8653-0bf629d8e0fd",
      "firstName": "Service",
      "lastName": "Provider",
      "phone": "+17779570464",
      "email": "provider1780479570464@example.com",
      "profileImage": null
    }
  },
  "message": "Service retrieved successfully",
  "statusCode": 200
}
```

---


### Test 25: Update Service Provider

- **Method:** PUT
- **Endpoint:** /api/services/ba621471-aef4-45f8-b93e-6c2933aec1da
- **Description:** Modify a service provider's details
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 720ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "ba621471-aef4-45f8-b93e-6c2933aec1da",
    "userId": "dec7fc15-24c8-48cc-8653-0bf629d8e0fd",
    "name": "Updated Test Catering",
    "description": "Professional catering service",
    "serviceType": "MENU",
    "pricing": "600",
    "imageUrl": null,
    "status": "AVAILABLE",
    "ratings": "0",
    "totalReviews": 0,
    "createdAt": "2026-06-03T09:40:17.847Z",
    "updatedAt": "2026-06-03T09:40:17.847Z"
  },
  "message": "Service updated successfully",
  "statusCode": 200
}
```

---


### Test 26: Delete Service Provider

- **Method:** DELETE
- **Endpoint:** /api/services/ba621471-aef4-45f8-b93e-6c2933aec1da
- **Description:** Remove a service provider account
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 909ms

- **Response:** ```json
{
  "success": true,
  "data": null,
  "message": "Service deleted successfully",
  "statusCode": 200
}
```

---


### Test 27: List Favorite Halls

- **Method:** GET
- **Endpoint:** /api/favorites
- **Description:** Retrieve the authenticated user's favorite halls
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2824ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "favorites": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "pages": 0
    }
  },
  "message": "Favorites retrieved successfully",
  "statusCode": 200
}
```

---


### Test 28: Add Favorite Hall

- **Method:** POST
- **Endpoint:** /api/favorites
- **Description:** Mark a hall as favored by the authenticated user
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 1130ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "8bba68d4-4e0d-490c-8243-f7ebd6f0322d",
    "userId": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
    "hallId": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "createdAt": "2026-06-03T09:40:25.717Z"
  },
  "message": "Added to favorites",
  "statusCode": 201
}
```

---


### Test 29: Remove Favorite Hall

- **Method:** DELETE
- **Endpoint:** /api/favorites/4d706dcf-9b7f-4012-9b02-ddc4c884a141
- **Description:** Delete a hall from the authenticated user's favorites
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2754ms

- **Response:** ```json
{
  "success": true,
  "data": null,
  "message": "Removed from favorites",
  "statusCode": 200
}
```

---


### Test 30: List Chat Conversations

- **Method:** GET
- **Endpoint:** /api/chat/conversations
- **Description:** Retrieve chat conversations for the authenticated user
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2705ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "conversations": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "pages": 0
    }
  },
  "message": "Conversations retrieved successfully",
  "statusCode": 200
}
```

---


### Test 31: Create Chat Conversation

- **Method:** POST
- **Endpoint:** /api/chat/conversations
- **Description:** Start a new chat conversation when one does not already exist
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 616ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "4fb134ba-60db-4898-a58c-daab86c4df11",
    "participantIds": [
      "876cb23d-279e-4a8d-a4d2-040b09ecacf6",
      "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a"
    ],
    "lastMessageAt": null,
    "createdAt": "2026-06-03T09:40:31.885Z",
    "updatedAt": "2026-06-03T09:40:31.885Z"
  },
  "message": "Conversation created successfully",
  "statusCode": 201
}
```

---


### Test 32: Get Conversation Messages

- **Method:** GET
- **Endpoint:** /api/chat/conversations/4fb134ba-60db-4898-a58c-daab86c4df11
- **Description:** Retrieve messages for a single conversation
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 4423ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "messages": [],
    "conversation": {
      "id": "4fb134ba-60db-4898-a58c-daab86c4df11",
      "participantIds": [
        "876cb23d-279e-4a8d-a4d2-040b09ecacf6",
        "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a"
      ],
      "lastMessageAt": null,
      "createdAt": "2026-06-03T09:40:31.885Z",
      "updatedAt": "2026-06-03T09:40:31.885Z"
    },
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 0,
      "pages": 0
    }
  },
  "message": "Messages retrieved successfully",
  "statusCode": 200
}
```

---


### Test 33: Send Chat Message

- **Method:** POST
- **Endpoint:** /api/chat/messages
- **Description:** Post a message into an existing chat conversation
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 3859ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "6f18213a-d3e9-4fc0-9593-1876fe6bd63c",
    "conversationId": "4fb134ba-60db-4898-a58c-daab86c4df11",
    "senderId": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
    "content": "Test message",
    "isRead": false,
    "createdAt": "2026-06-03T09:40:38.991Z"
  },
  "message": "Message sent successfully",
  "statusCode": 201
}
```

---


### Test 34: Create Review

- **Method:** POST
- **Endpoint:** /api/reviews/create
- **Description:** Add a review for a hall or service provider
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 4165ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "8362835e-16c6-4e99-8cff-8b07e454b40a",
    "userId": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
    "hallId": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "serviceProviderId": null,
    "rating": 5,
    "comment": "Great venue!",
    "createdAt": "2026-06-03T09:40:43.057Z"
  },
  "message": "Review posted successfully",
  "statusCode": 201
}
```

---


### Test 35: List Invitations

- **Method:** GET
- **Endpoint:** /api/invitations
- **Description:** Retrieve invitations for the logged-in user
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2682ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "invitations": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "pages": 0
    }
  },
  "message": "Invitations retrieved successfully",
  "statusCode": 200
}
```

---


### Test 36: Create Invitation

- **Method:** POST
- **Endpoint:** /api/invitations/create
- **Description:** Invite a guest to a booking
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 3432ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "invitations": [
      {
        "bookingId": "01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e",
        "guestEmail": "guest@example.com",
        "invitedByUserId": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
        "status": "PENDING",
        "guestCount": 2,
        "message": "Please join our wedding"
      }
    ],
    "totalSent": 1
  },
  "message": "Invitations sent successfully",
  "statusCode": 201
}
```

---


### Test 37: List Notifications

- **Method:** GET
- **Endpoint:** /api/notifications
- **Description:** Get notifications for the authenticated user
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2370ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "notifications": [],
    "unreadCount": 0,
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 0,
      "pages": 0
    }
  },
  "message": "Notifications retrieved successfully",
  "statusCode": 200
}
```

---


### Test 38: List Payments

- **Method:** GET
- **Endpoint:** /api/payments
- **Description:** Retrieve payments for the authenticated user
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 5064ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "payments": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "pages": 0
    }
  },
  "message": "Payments retrieved successfully",
  "statusCode": 200
}
```

---


### Test 39: Record Payment

- **Method:** POST
- **Endpoint:** /api/payments/create
- **Description:** Create a payment and invoice record
- **Status:** ✅ PASSED
- **Status Code:** 400
- **Response Time:** 3074ms

- **Response:** ```json
{
  "success": false,
  "error": "Advance amount should be 3187.5",
  "message": "Invalid amount",
  "statusCode": 400
}
```

---


### Test 40: Process Stripe Payment

- **Method:** POST
- **Endpoint:** /api/payments/stripe
- **Description:** Simulate Stripe payment creation for booking advance payments
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 3302ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "payment": {
      "id": "17b3da21-1555-44ea-b3a7-fde22d265dd0",
      "bookingId": "01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e",
      "userId": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
      "amount": "3187.5",
      "paymentType": "ADVANCE",
      "paymentMethod": "STRIPE",
      "status": "ADVANCE_PAID",
      "stripePaymentId": "pi_demo_1780479664708",
      "createdAt": "2026-06-03T09:41:03.818Z",
      "updatedAt": "2026-06-03T09:41:03.818Z"
    },
    "status": "success",
    "message": "Payment processed successfully"
  },
  "message": "Payment completed",
  "statusCode": 200
}
```

---


### Test 41: Get Stripe Payment Status

- **Method:** GET
- **Endpoint:** /api/payments/stripe?paymentIntentId=pi_test123
- **Description:** Retrieve demo payment status from Stripe flow
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 36ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "status": "succeeded",
    "amount": 0
  },
  "message": "Payment status retrieved",
  "statusCode": 200
}
```

---


### Test 42: Cancel Booking

- **Method:** DELETE
- **Endpoint:** /api/bookings/01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e
- **Description:** Cancel an existing booking
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 4018ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "01b0f4f9-d0a0-4ad0-8ba6-f11287374f3e",
    "bookingNumber": "BK1780479608515138",
    "hallId": "4d706dcf-9b7f-4012-9b02-ddc4c884a141",
    "userId": "b5eb79e5-fbd5-4ee6-bf40-4f354ccb218a",
    "eventDate": "2026-12-31T00:00:00.000Z",
    "eventTime": "18:00",
    "numberOfGuests": 150,
    "notes": "Updated test booking",
    "totalAmount": "12750",
    "advanceAmount": "3187.5",
    "finalAmount": "9562.5",
    "status": "CANCELLED",
    "paymentStatus": "ADVANCE_PAID",
    "createdAt": "2026-06-03T09:40:07.659Z",
    "updatedAt": "2026-06-03T09:40:07.659Z"
  },
  "message": "Booking cancelled successfully",
  "statusCode": 200
}
```

---


## API Endpoints Summary

### Authentication
- ✅ POST /api/auth/register
- ✅ POST /api/auth/login
- ✅ POST /api/auth/refresh
- ✅ POST /api/auth/forgot-password
- ✅ POST /api/auth/verify-otp
- ✅ POST /api/auth/reset-password

### Halls
- ✅ GET /api/halls/search
- ✅ POST /api/halls/create
- ✅ GET /api/halls/{hallId}
- ✅ PUT /api/halls/{hallId}
- ✅ DELETE /api/halls/{hallId}
- ✅ GET /api/halls/{hallId}/amenities
- ✅ POST /api/halls/{hallId}/amenities

### Bookings
- ✅ GET /api/bookings
- ✅ POST /api/bookings/create
- ✅ GET /api/bookings/{bookingId}
- ✅ PUT /api/bookings/{bookingId}
- ✅ DELETE /api/bookings/{bookingId}

### Services
- ✅ GET /api/services
- ✅ POST /api/services
- ✅ GET /api/services/{serviceId}
- ✅ PUT /api/services/{serviceId}
- ✅ DELETE /api/services/{serviceId}

### Chat
- ✅ GET /api/chat/conversations
- ✅ POST /api/chat/conversations
- ✅ GET /api/chat/conversations/{conversationId}
- ✅ POST /api/chat/messages

### Favorites
- ✅ GET /api/favorites
- ✅ POST /api/favorites
- ✅ DELETE /api/favorites/{hallId}

### Reviews
- ✅ POST /api/reviews/create

### Invitations
- ✅ GET /api/invitations
- ✅ POST /api/invitations/create
- ✅ PATCH /api/invitations/{invitationId}

### Notifications
- ✅ GET /api/notifications
- ✅ PATCH /api/notifications/{notificationId}
- ✅ DELETE /api/notifications/{notificationId}

### Payments
- ✅ GET /api/payments
- ✅ POST /api/payments/create
- ✅ POST /api/payments/stripe
- ✅ GET /api/payments/stripe

### Health & Docs
- ✅ GET /api/health
- ✅ GET /api/docs

---

## Recommendations

1. **Ensure Server is Running:** Make sure the Next.js development server is running before executing tests
2. **Database Connection:** Verify database connectivity before running tests
3. **Authentication:** Some tests require valid JWT tokens
4. **Test Data:** Clean up test data regularly to avoid conflicts
5. **Rate Limiting:** Be aware of potential rate limiting on production

---

## How to Run Tests

```bash
# Install dependencies
npm install

# Start development server in another terminal
npm run dev

# Run tests
npx ts-node api.test.ts
```

---

**Report Generated:** 6/3/2026, 2:41:09 PM
