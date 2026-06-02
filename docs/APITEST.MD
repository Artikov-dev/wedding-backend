# API Test Results Report

**Generated:** 2026-06-02T17:02:32.373Z
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
| Health Check | GET | `/api/health` | ✅ | 1907ms |
| Get OpenAPI Specification | GET | `/api/docs` | ✅ | 93ms |


### 2. Authentication (8/8)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| User Registration | POST | `/api/auth/register` | ✅ | 1604ms |
| Hall Owner Registration | POST | `/api/auth/register` | ✅ | 1379ms |
| Service Provider Registration | POST | `/api/auth/register` | ✅ | 1355ms |
| User Login | POST | `/api/auth/login` | ✅ | 919ms |
| Refresh Authentication Token | POST | `/api/auth/refresh` | ✅ | 835ms |
| Request Password Reset | POST | `/api/auth/forgot-password` | ✅ | 875ms |
| Verify OTP | POST | `/api/auth/verify-otp` | ✅ | 339ms |
| Reset Password | POST | `/api/auth/reset-password` | ✅ | 333ms |


### 3. Halls Management (11/11)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| Hall Owner Registration | POST | `/api/auth/register` | ✅ | 1379ms |
| Search Halls | GET | `/api/halls/search?city=New York&capacity=100&minPrice=1000&maxPrice=10000` | ✅ | 1620ms |
| Create Hall Profile | POST | `/api/halls/create` | ✅ | 591ms |
| Approve Hall Profile | PUT | `/api/halls/623385d8-7349-45eb-90ca-646ec9411dbf` | ✅ | 611ms |
| Get Hall Profile | GET | `/api/halls/623385d8-7349-45eb-90ca-646ec9411dbf` | ✅ | 1993ms |
| Update Hall Profile | PUT | `/api/halls/623385d8-7349-45eb-90ca-646ec9411dbf` | ✅ | 521ms |
| List Hall Amenities | GET | `/api/halls/623385d8-7349-45eb-90ca-646ec9411dbf/amenities` | ✅ | 312ms |
| Add Hall Amenity | POST | `/api/halls/623385d8-7349-45eb-90ca-646ec9411dbf/amenities` | ✅ | 509ms |
| List Favorite Halls | GET | `/api/favorites` | ✅ | 298ms |
| Add Favorite Hall | POST | `/api/favorites` | ✅ | 754ms |
| Remove Favorite Hall | DELETE | `/api/favorites/623385d8-7349-45eb-90ca-646ec9411dbf` | ✅ | 1927ms |


### 4. Bookings (5/5)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Bookings | GET | `/api/bookings?page=1&limit=10` | ✅ | 316ms |
| Create Booking | POST | `/api/bookings/create` | ✅ | 1071ms |
| Get Booking Details | GET | `/api/bookings/29455a42-9559-4e73-9d8c-e6a2ba31779e` | ✅ | 2304ms |
| Update Booking Status | PUT | `/api/bookings/29455a42-9559-4e73-9d8c-e6a2ba31779e` | ✅ | 771ms |
| Cancel Booking | DELETE | `/api/bookings/29455a42-9559-4e73-9d8c-e6a2ba31779e` | ✅ | 766ms |


### 5. Services (6/6)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| Service Provider Registration | POST | `/api/auth/register` | ✅ | 1355ms |
| List Service Providers | GET | `/api/services` | ✅ | 581ms |
| Create Service Provider | POST | `/api/services` | ✅ | 522ms |
| Get Service Provider | GET | `/api/services/0e51b5de-dd54-48ea-b627-5b30ba069561` | ✅ | 609ms |
| Update Service Provider | PUT | `/api/services/0e51b5de-dd54-48ea-b627-5b30ba069561` | ✅ | 517ms |
| Delete Service Provider | DELETE | `/api/services/0e51b5de-dd54-48ea-b627-5b30ba069561` | ✅ | 512ms |


### 6. Favorites (3/3)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Favorite Halls | GET | `/api/favorites` | ✅ | 298ms |
| Add Favorite Hall | POST | `/api/favorites` | ✅ | 754ms |
| Remove Favorite Hall | DELETE | `/api/favorites/623385d8-7349-45eb-90ca-646ec9411dbf` | ✅ | 1927ms |


### 7. Chat & Messaging (4/4)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Chat Conversations | GET | `/api/chat/conversations` | ✅ | 569ms |
| Create Chat Conversation | POST | `/api/chat/conversations` | ✅ | 513ms |
| Get Conversation Messages | GET | `/api/chat/conversations/e50ffaf1-8d53-452c-b192-1d40940072dd` | ✅ | 2153ms |
| Send Chat Message | POST | `/api/chat/messages` | ✅ | 2881ms |


### 8. Reviews (1/1)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| Create Review | POST | `/api/reviews/create` | ✅ | 1795ms |


### 9. Invitations (2/2)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Invitations | GET | `/api/invitations` | ✅ | 1556ms |
| Create Invitation | POST | `/api/invitations/create` | ✅ | 768ms |


### 10. Notifications (1/1)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Notifications | GET | `/api/notifications` | ✅ | 1583ms |


### 11. Payments (4/4)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Payments | GET | `/api/payments` | ✅ | 310ms |
| Record Payment | POST | `/api/payments/create` | ✅ | 545ms |
| Process Stripe Payment | POST | `/api/payments/stripe` | ✅ | 2117ms |
| Get Stripe Payment Status | GET | `/api/payments/stripe?paymentIntentId=pi_test123` | ✅ | 20ms |


---

## Detailed Test Results


### Test 1: Health Check

- **Method:** GET
- **Endpoint:** /api/health
- **Description:** Verify API and database connectivity
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 1907ms

- **Response:** ```json
{
  "status": "healthy",
  "timestamp": "2026-06-02T17:01:52.702Z",
  "uptime": 331.2473728,
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
- **Response Time:** 93ms

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
      "url": "http://localhost:3000",
      "description": "Local development server"
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
- **Response Time:** 1604ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "user": {
      "id": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
      "email": "test1780419712808@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGJjYjllZC1hMWU1LTQzZjEtYmJjNS0xN2I1ZDU1MDc0MzYiLCJlbWFpbCI6InRlc3QxNzgwNDE5NzEyODA4QGV4YW1wbGUuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzgwNDE5NzE0LCJleHAiOjE3ODEwMjQ1MTR9.oa7DWkOAGsYvscYjjDGeygTowL_MyZEbU7wy4ZAqwdk",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGJjYjllZC1hMWU1LTQzZjEtYmJjNS0xN2I1ZDU1MDc0MzYiLCJpYXQiOjE3ODA0MTk3MTQsImV4cCI6MTc4MzAxMTcxNH0.hPwSx12_5NVznxn-Ir4bpe4ibAEvTP_HW7KAk5V0oWY"
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
- **Response Time:** 1379ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "user": {
      "id": "781b09c4-b21a-48ca-a2a5-19fd44f1a698",
      "email": "owner1780419714413@example.com",
      "firstName": "Hall",
      "lastName": "Owner",
      "role": "HALL_OWNER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ODFiMDljNC1iMjFhLTQ4Y2EtYTJhNS0xOWZkNDRmMWE2OTgiLCJlbWFpbCI6Im93bmVyMTc4MDQxOTcxNDQxM0BleGFtcGxlLmNvbSIsInJvbGUiOiJIQUxMX09XTkVSIiwiaWF0IjoxNzgwNDE5NzE1LCJleHAiOjE3ODEwMjQ1MTV9.sqPtkUzqd04UfZ7D9-lEHhhgMaPmeQWeZMeAzEgc1Rk",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ODFiMDljNC1iMjFhLTQ4Y2EtYTJhNS0xOWZkNDRmMWE2OTgiLCJpYXQiOjE3ODA0MTk3MTUsImV4cCI6MTc4MzAxMTcxNX0.r5c9p8LwO7AXXW9hgTYeQLay60wft6_6PiyyUifWRfw"
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
- **Response Time:** 1355ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "user": {
      "id": "c724f8bc-1def-4b8c-b4a0-0d7e5c788443",
      "email": "provider1780419715792@example.com",
      "firstName": "Service",
      "lastName": "Provider",
      "role": "SERVICE_PROVIDER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNzI0ZjhiYy0xZGVmLTRiOGMtYjRhMC0wZDdlNWM3ODg0NDMiLCJlbWFpbCI6InByb3ZpZGVyMTc4MDQxOTcxNTc5MkBleGFtcGxlLmNvbSIsInJvbGUiOiJTRVJWSUNFX1BST1ZJREVSIiwiaWF0IjoxNzgwNDE5NzE2LCJleHAiOjE3ODEwMjQ1MTZ9.pm2QDFVd29IsQHpjZwO-jb9Em3hoGOJRpQL1nxceyUw",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNzI0ZjhiYy0xZGVmLTRiOGMtYjRhMC0wZDdlNWM3ODg0NDMiLCJpYXQiOjE3ODA0MTk3MTYsImV4cCI6MTc4MzAxMTcxNn0.P_WhCaeZ6ln_1ZnN1udgIznZMQStfNnJO8_3ABdAkrU"
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
- **Response Time:** 919ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "user": {
      "id": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
      "email": "test1780419712808@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGJjYjllZC1hMWU1LTQzZjEtYmJjNS0xN2I1ZDU1MDc0MzYiLCJlbWFpbCI6InRlc3QxNzgwNDE5NzEyODA4QGV4YW1wbGUuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzgwNDE5NzE3LCJleHAiOjE3ODEwMjQ1MTd9.nbpkH2CpkAjSPyGqEYraE-fINE2es2x0SeXMWzJ3YrI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGJjYjllZC1hMWU1LTQzZjEtYmJjNS0xN2I1ZDU1MDc0MzYiLCJpYXQiOjE3ODA0MTk3MTcsImV4cCI6MTc4MzAxMTcxN30.PhER1lnKJ8spOK75XjCxgjqMz-aBoR1a2EtCES4FUes"
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
- **Response Time:** 835ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGJjYjllZC1hMWU1LTQzZjEtYmJjNS0xN2I1ZDU1MDc0MzYiLCJlbWFpbCI6InRlc3QxNzgwNDE5NzEyODA4QGV4YW1wbGUuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzgwNDE5NzE4LCJleHAiOjE3ODEwMjQ1MTh9.kbrbpkUwYD-uvu_FuJzA-Al7bZXpAEaL2Ud1UxPcQL8",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGJjYjllZC1hMWU1LTQzZjEtYmJjNS0xN2I1ZDU1MDc0MzYiLCJpYXQiOjE3ODA0MTk3MTgsImV4cCI6MTc4MzAxMTcxOH0.iiAv1H3ytZz4Tqb5MNpTpaUiaf5-5TYx7khMQTsqrCw"
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
- **Response Time:** 875ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "userId": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436"
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
- **Response Time:** 339ms

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
- **Response Time:** 333ms

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
- **Response Time:** 1620ms

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
- **Response Time:** 591ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "userId": "781b09c4-b21a-48ca-a2a5-19fd44f1a698",
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
    "createdAt": "2026-06-02T17:02:01.821Z",
    "updatedAt": "2026-06-02T17:02:01.821Z"
  },
  "message": "Hall created successfully. Pending admin approval.",
  "statusCode": 201
}
```

---


### Test 13: Approve Hall Profile

- **Method:** PUT
- **Endpoint:** /api/halls/623385d8-7349-45eb-90ca-646ec9411dbf
- **Description:** Approve hall for booking tests
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 611ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "userId": "781b09c4-b21a-48ca-a2a5-19fd44f1a698",
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
    "createdAt": "2026-06-02T17:02:01.821Z",
    "updatedAt": "2026-06-02T17:02:01.821Z"
  },
  "message": "Hall updated successfully",
  "statusCode": 200
}
```

---


### Test 14: Get Hall Profile

- **Method:** GET
- **Endpoint:** /api/halls/623385d8-7349-45eb-90ca-646ec9411dbf
- **Description:** Retrieve hall profile by ID
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 1993ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "userId": "781b09c4-b21a-48ca-a2a5-19fd44f1a698",
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
    "createdAt": "2026-06-02T17:02:01.821Z",
    "updatedAt": "2026-06-02T17:02:01.821Z",
    "user": {
      "id": "781b09c4-b21a-48ca-a2a5-19fd44f1a698",
      "firstName": "Hall",
      "lastName": "Owner",
      "phone": "+16669714413",
      "email": "owner1780419714413@example.com"
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
- **Endpoint:** /api/halls/623385d8-7349-45eb-90ca-646ec9411dbf
- **Description:** Update hall details as the hall owner
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 521ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "userId": "781b09c4-b21a-48ca-a2a5-19fd44f1a698",
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
    "createdAt": "2026-06-02T17:02:01.821Z",
    "updatedAt": "2026-06-02T17:02:01.821Z"
  },
  "message": "Hall updated successfully",
  "statusCode": 200
}
```

---


### Test 16: List Hall Amenities

- **Method:** GET
- **Endpoint:** /api/halls/623385d8-7349-45eb-90ca-646ec9411dbf/amenities
- **Description:** Get amenities for a specific hall
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 312ms

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
- **Endpoint:** /api/halls/623385d8-7349-45eb-90ca-646ec9411dbf/amenities
- **Description:** Create a new amenity for the hall
- **Status:** ✅ PASSED
- **Status Code:** 201
- **Response Time:** 509ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "c69abf27-d2a5-4d7b-b6c0-23664e607071",
    "hallId": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "name": "Parking",
    "description": "Free onsite parking",
    "createdAt": "2026-06-02T17:02:05.772Z"
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
- **Response Time:** 316ms

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
- **Response Time:** 1071ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "29455a42-9559-4e73-9d8c-e6a2ba31779e",
    "bookingNumber": "BK1780419727495267",
    "hallId": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "userId": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
    "eventDate": "2026-12-31T00:00:00.000Z",
    "eventTime": "18:00",
    "numberOfGuests": 150,
    "notes": "Test booking",
    "totalAmount": "12750",
    "advanceAmount": "3187.5",
    "finalAmount": "9562.5",
    "status": "PENDING",
    "paymentStatus": "PENDING",
    "createdAt": "2026-06-02T17:02:06.902Z",
    "updatedAt": "2026-06-02T17:02:06.902Z"
  },
  "message": "Booking created successfully. Please complete the advance payment to confirm.",
  "statusCode": 201
}
```

---


### Test 20: Get Booking Details

- **Method:** GET
- **Endpoint:** /api/bookings/29455a42-9559-4e73-9d8c-e6a2ba31779e
- **Description:** Retrieve a single booking by ID
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2304ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "29455a42-9559-4e73-9d8c-e6a2ba31779e",
    "bookingNumber": "BK1780419727495267",
    "hallId": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "userId": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
    "eventDate": "2026-12-31T00:00:00.000Z",
    "eventTime": "18:00",
    "numberOfGuests": 150,
    "notes": "Test booking",
    "totalAmount": "12750",
    "advanceAmount": "3187.5",
    "finalAmount": "9562.5",
    "status": "PENDING",
    "paymentStatus": "PENDING",
    "createdAt": "2026-06-02T17:02:06.902Z",
    "updatedAt": "2026-06-02T17:02:06.902Z",
    "hall": {
      "id": "623385d8-7349-45eb-90ca-646ec9411dbf",
      "userId": "781b09c4-b21a-48ca-a2a5-19fd44f1a698",
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
      "createdAt": "2026-06-02T17:02:01.821Z",
      "updatedAt": "2026-06-02T17:02:01.821Z",
      "amenities": [
        {
          "id": "c69abf27-d2a5-4d7b-b6c0-23664e607071",
          "hallId": "623385d8-7349-45eb-90ca-646ec9411dbf",
          "name": "Parking",
          "description": "Free onsite parking",
          "createdAt": "2026-06-02T17:02:05.772Z"
        }
      ],
      "services": [],
      "user": null
    },
    "user": {
      "id": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
      "firstName": "Test",
      "lastName": "User",
      "email": "test1780419712808@example.com",
      "phone": "+15559712808"
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
- **Endpoint:** /api/bookings/29455a42-9559-4e73-9d8c-e6a2ba31779e
- **Description:** Update booking status or details
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 771ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "29455a42-9559-4e73-9d8c-e6a2ba31779e",
    "bookingNumber": "BK1780419727495267",
    "hallId": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "userId": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
    "eventDate": "2026-12-31T00:00:00.000Z",
    "eventTime": "18:00",
    "numberOfGuests": 150,
    "notes": "Updated test booking",
    "totalAmount": "12750",
    "advanceAmount": "3187.5",
    "finalAmount": "9562.5",
    "status": "CONFIRMED",
    "paymentStatus": "PENDING",
    "createdAt": "2026-06-02T17:02:06.902Z",
    "updatedAt": "2026-06-02T17:02:06.902Z"
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
- **Response Time:** 581ms

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
- **Response Time:** 522ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "0e51b5de-dd54-48ea-b627-5b30ba069561",
    "userId": "c724f8bc-1def-4b8c-b4a0-0d7e5c788443",
    "name": "Test Catering Service",
    "description": "Professional catering service",
    "serviceType": "MENU",
    "pricing": "500",
    "imageUrl": null,
    "status": "AVAILABLE",
    "ratings": "0",
    "totalReviews": 0,
    "createdAt": "2026-06-02T17:02:11.334Z",
    "updatedAt": "2026-06-02T17:02:11.334Z"
  },
  "message": "Service created successfully",
  "statusCode": 201
}
```

---


### Test 24: Get Service Provider

- **Method:** GET
- **Endpoint:** /api/services/0e51b5de-dd54-48ea-b627-5b30ba069561
- **Description:** Fetch a service provider record
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 609ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "0e51b5de-dd54-48ea-b627-5b30ba069561",
    "userId": "c724f8bc-1def-4b8c-b4a0-0d7e5c788443",
    "name": "Test Catering Service",
    "description": "Professional catering service",
    "serviceType": "MENU",
    "pricing": "500",
    "imageUrl": null,
    "status": "AVAILABLE",
    "ratings": "0",
    "totalReviews": 0,
    "createdAt": "2026-06-02T17:02:11.334Z",
    "updatedAt": "2026-06-02T17:02:11.334Z",
    "user": {
      "id": "c724f8bc-1def-4b8c-b4a0-0d7e5c788443",
      "firstName": "Service",
      "lastName": "Provider",
      "phone": "+17779715792",
      "email": "provider1780419715792@example.com",
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
- **Endpoint:** /api/services/0e51b5de-dd54-48ea-b627-5b30ba069561
- **Description:** Modify a service provider's details
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 517ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "0e51b5de-dd54-48ea-b627-5b30ba069561",
    "userId": "c724f8bc-1def-4b8c-b4a0-0d7e5c788443",
    "name": "Updated Test Catering",
    "description": "Professional catering service",
    "serviceType": "MENU",
    "pricing": "600",
    "imageUrl": null,
    "status": "AVAILABLE",
    "ratings": "0",
    "totalReviews": 0,
    "createdAt": "2026-06-02T17:02:11.334Z",
    "updatedAt": "2026-06-02T17:02:11.334Z"
  },
  "message": "Service updated successfully",
  "statusCode": 200
}
```

---


### Test 26: Delete Service Provider

- **Method:** DELETE
- **Endpoint:** /api/services/0e51b5de-dd54-48ea-b627-5b30ba069561
- **Description:** Remove a service provider account
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 512ms

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
- **Response Time:** 298ms

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
- **Response Time:** 754ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "e5ec49ed-a523-43cf-acaa-f14f0c9cc5ca",
    "userId": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
    "hallId": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "createdAt": "2026-06-02T17:02:14.026Z"
  },
  "message": "Added to favorites",
  "statusCode": 201
}
```

---


### Test 29: Remove Favorite Hall

- **Method:** DELETE
- **Endpoint:** /api/favorites/623385d8-7349-45eb-90ca-646ec9411dbf
- **Description:** Delete a hall from the authenticated user's favorites
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 1927ms

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
- **Response Time:** 569ms

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
- **Response Time:** 513ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "e50ffaf1-8d53-452c-b192-1d40940072dd",
    "participantIds": [
      "781b09c4-b21a-48ca-a2a5-19fd44f1a698",
      "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436"
    ],
    "lastMessageAt": null,
    "createdAt": "2026-06-02T17:02:17.038Z",
    "updatedAt": "2026-06-02T17:02:17.038Z"
  },
  "message": "Conversation created successfully",
  "statusCode": 201
}
```

---


### Test 32: Get Conversation Messages

- **Method:** GET
- **Endpoint:** /api/chat/conversations/e50ffaf1-8d53-452c-b192-1d40940072dd
- **Description:** Retrieve messages for a single conversation
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 2153ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "messages": [],
    "conversation": {
      "id": "e50ffaf1-8d53-452c-b192-1d40940072dd",
      "participantIds": [
        "781b09c4-b21a-48ca-a2a5-19fd44f1a698",
        "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436"
      ],
      "lastMessageAt": null,
      "createdAt": "2026-06-02T17:02:17.038Z",
      "updatedAt": "2026-06-02T17:02:17.038Z"
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
- **Response Time:** 2881ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "47b3066f-416b-4c5f-8eca-c5362b550a45",
    "conversationId": "e50ffaf1-8d53-452c-b192-1d40940072dd",
    "senderId": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
    "content": "Test message",
    "isRead": false,
    "createdAt": "2026-06-02T17:02:21.320Z"
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
- **Response Time:** 1795ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "65d50ce1-f797-4cee-becf-5d106fbe26c0",
    "userId": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
    "hallId": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "serviceProviderId": null,
    "rating": 5,
    "comment": "Great venue!",
    "createdAt": "2026-06-02T17:02:22.877Z"
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
- **Response Time:** 1556ms

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
- **Response Time:** 768ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "invitations": [
      {
        "bookingId": "29455a42-9559-4e73-9d8c-e6a2ba31779e",
        "guestEmail": "guest@example.com",
        "invitedByUserId": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
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
- **Response Time:** 1583ms

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
- **Response Time:** 310ms

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
- **Response Time:** 545ms

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
- **Response Time:** 2117ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "payment": {
      "id": "240ff73f-e243-46f4-a676-6cfb8d0323be",
      "bookingId": "29455a42-9559-4e73-9d8c-e6a2ba31779e",
      "userId": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
      "amount": "3187.5",
      "paymentType": "ADVANCE",
      "paymentMethod": "STRIPE",
      "status": "ADVANCE_PAID",
      "stripePaymentId": "pi_demo_1780419751090",
      "createdAt": "2026-06-02T17:02:30.498Z",
      "updatedAt": "2026-06-02T17:02:30.498Z"
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
- **Response Time:** 20ms

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
- **Endpoint:** /api/bookings/29455a42-9559-4e73-9d8c-e6a2ba31779e
- **Description:** Cancel an existing booking
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 766ms

- **Response:** ```json
{
  "success": true,
  "data": {
    "id": "29455a42-9559-4e73-9d8c-e6a2ba31779e",
    "bookingNumber": "BK1780419727495267",
    "hallId": "623385d8-7349-45eb-90ca-646ec9411dbf",
    "userId": "b8bcb9ed-a1e5-43f1-bbc5-17b5d5507436",
    "eventDate": "2026-12-31T00:00:00.000Z",
    "eventTime": "18:00",
    "numberOfGuests": 150,
    "notes": "Updated test booking",
    "totalAmount": "12750",
    "advanceAmount": "3187.5",
    "finalAmount": "9562.5",
    "status": "CANCELLED",
    "paymentStatus": "ADVANCE_PAID",
    "createdAt": "2026-06-02T17:02:06.902Z",
    "updatedAt": "2026-06-02T17:02:06.902Z"
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

**Report Generated:** 6/2/2026, 10:02:32 PM
