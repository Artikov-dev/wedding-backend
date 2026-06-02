# API Test Results Report

**Generated:** 2026-06-02T04:59:56.708Z
**API Base URL:** http://localhost:3000

## Summary

- **Total Tests:** 9
- **Passed:** 3
- **Failed:** 6
- **Success Rate:** 33.33%

---

## Test Results by Category

### 1. Health & Documentation (1/2)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| Health Check | GET | `/api/health` | ❌ | 728ms |
| Get OpenAPI Specification | GET | `/api/docs` | ✅ | 22ms |


### 2. Authentication (2/5)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| User Registration | POST | `/api/auth/register` | ❌ | 996ms |
| User Login | POST | `/api/auth/login` | ❌ | 828ms |
| Request Password Reset | POST | `/api/auth/forgot-password` | ❌ | 825ms |
| Verify OTP | POST | `/api/auth/verify-otp` | ✅ | 391ms |
| Reset Password | POST | `/api/auth/reset-password` | ✅ | 249ms |


### 3. Halls Management (0/1)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| Search Halls | GET | `/api/halls/search?city=New York&capacity=100&minPrice=1000&maxPrice=10000` | ❌ | 898ms |


### 4. Bookings (0/0)

| No tests found |

### 5. Services (0/1)

| Test Name | Method | Endpoint | Status | Response Time |
|-----------|--------|----------|--------|----------------|
| List Service Providers | GET | `/api/services` | ❌ | 730ms |


### 6. Favorites (0/0)

| No tests found |

### 7. Chat & Messaging (0/0)

| No tests found |

### 8. Reviews (0/0)

| No tests found |

### 9. Invitations (0/0)

| No tests found |

### 10. Notifications (0/0)

| No tests found |

### 11. Payments (0/0)

| No tests found |

---

## Detailed Test Results


### Test 1: Health Check

- **Method:** GET
- **Endpoint:** /api/health
- **Description:** Verify API and database connectivity
- **Status:** ❌ FAILED
- **Status Code:** 503
- **Response Time:** 728ms
- **Error:** Expected status 200, got 503
- **Response:** ```json
{
  "status": "unhealthy",
  "timestamp": "2026-06-02T04:59:51.757Z",
  "database": "disconnected",
  "error": "Database connection failed"
}
```

---


### Test 2: Get OpenAPI Specification

- **Method:** GET
- **Endpoint:** /api/docs
- **Description:** Retrieve OpenAPI JSON document
- **Status:** ✅ PASSED
- **Status Code:** 200
- **Response Time:** 22ms

- **Response:** ```json
{
  "openapi": "3.1.0",
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
- **Status:** ❌ FAILED
- **Status Code:** 500
- **Response Time:** 996ms
- **Error:** Expected status 201, 409, got 500
- **Response:** ```json
{
  "success": false,
  "error": "Failed to register user",
  "message": "Failed to register user",
  "statusCode": 500
}
```

---


### Test 4: User Login

- **Method:** POST
- **Endpoint:** /api/auth/login
- **Description:** Authenticate user with email and password
- **Status:** ❌ FAILED
- **Status Code:** 500
- **Response Time:** 828ms
- **Error:** Expected status 200, 401, 400, got 500
- **Response:** ```json
{
  "success": false,
  "error": "Failed to login",
  "message": "Failed to login",
  "statusCode": 500
}
```

---


### Test 5: Request Password Reset

- **Method:** POST
- **Endpoint:** /api/auth/forgot-password
- **Description:** Start password reset flow by email
- **Status:** ❌ FAILED
- **Status Code:** 500
- **Response Time:** 825ms
- **Error:** Expected status 200, 400, 404, got 500
- **Response:** ```json
{
  "success": false,
  "error": "Failed to process forgot password request",
  "message": "Failed to process forgot password request",
  "statusCode": 500
}
```

---


### Test 6: Verify OTP

- **Method:** POST
- **Endpoint:** /api/auth/verify-otp
- **Description:** Validate an email OTP code
- **Status:** ✅ PASSED
- **Status Code:** 400
- **Response Time:** 391ms

- **Response:** ```json
{
  "success": false,
  "error": "Required",
  "message": "Validation error",
  "statusCode": 400
}
```

---


### Test 7: Reset Password

- **Method:** POST
- **Endpoint:** /api/auth/reset-password
- **Description:** Confirm OTP and set a new password
- **Status:** ✅ PASSED
- **Status Code:** 400
- **Response Time:** 249ms

- **Response:** ```json
{
  "success": false,
  "error": "Required",
  "message": "Validation error",
  "statusCode": 400
}
```

---


### Test 8: Search Halls

- **Method:** GET
- **Endpoint:** /api/halls/search?city=New York&capacity=100&minPrice=1000&maxPrice=10000
- **Description:** Search halls by city, capacity, price, and rating
- **Status:** ❌ FAILED
- **Status Code:** 500
- **Response Time:** 898ms
- **Error:** Expected status 200, got 500
- **Response:** ```json
{
  "success": false,
  "error": "Failed to search halls",
  "message": "Failed to search halls",
  "statusCode": 500
}
```

---


### Test 9: List Service Providers

- **Method:** GET
- **Endpoint:** /api/services
- **Description:** Search service providers with optional filters
- **Status:** ❌ FAILED
- **Status Code:** 500
- **Response Time:** 730ms
- **Error:** Expected status 200, got 500
- **Response:** ```json
{
  "success": false,
  "error": "Failed to retrieve services",
  "message": "Failed to retrieve services",
  "statusCode": 500
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

**Report Generated:** 6/2/2026, 9:59:56 AM
