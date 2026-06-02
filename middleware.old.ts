/**
 * DEPRECATED: middleware.ts is no longer used
 * 
 * Auth checks are now handled at the route level in individual API handlers.
 * See lib/auth.ts for authentication utilities.
 * 
 * Migration Guide:
 * 1. Each route handler now imports auth utilities directly
 * 2. Public routes don't require token validation
 * 3. Protected routes validate token in the handler
 * 4. This approach is more flexible and avoids Edge Runtime limitations
 */

// This file is kept for reference only and is NOT loaded by Next.js
// To re-enable middleware in the future, rename this file to middleware.ts
// and update it to use the new Next.js proxy pattern

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, JWTPayload } from './lib/auth';

// Routes that don't require authentication
const publicRoutes = [
  '/api/auth/register',
  '/api/auth/login',
  '/api/auth/refresh',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-otp',
  '/api/halls/search',
  '/api/services',
  '/api/health',
  '/api/docs',
  '/swagger',
];

// Route-role mappings for RBAC
const rolePermissions: Record<string, string[]> = {
  '/api/admin': ['ADMIN'],
  '/api/halls/create': ['HALL_OWNER', 'ADMIN'],
  '/api/services': ['SERVICE_PROVIDER', 'ADMIN'],
  '/api/bookings': ['CUSTOMER', 'ADMIN'],
  '/api/payments': ['CUSTOMER', 'HALL_OWNER', 'ADMIN'],
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for token in protected routes
  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized - Missing token', statusCode: 401 },
      { status: 401 }
    );
  }

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized - Invalid token', statusCode: 401 },
      { status: 401 }
    );
  }

  // Check RBAC
  for (const [route, roles] of Object.entries(rolePermissions)) {
    if (pathname.startsWith(route)) {
      if (!roles.includes(decoded.role)) {
        return NextResponse.json(
          { success: false, error: 'Forbidden - Insufficient permissions', statusCode: 403 },
          { status: 403 }
        );
      }
      break;
    }
  }

  // Add user to request
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', decoded.userId);
  requestHeaders.set('x-user-email', decoded.email);
  requestHeaders.set('x-user-role', decoded.role);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/api/:path*'],
};
