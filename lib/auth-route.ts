/**
 * Route-Level Authentication Utilities
 * 
 * Use these functions in your API routes instead of middleware
 * This avoids Edge Runtime limitations and provides better error handling
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, JWTPayload } from './auth';

/**
 * Extract and verify JWT token from request
 * 
 * @param request - Next.js request object
 * @returns Decoded token or null if invalid
 * 
 * @example
 * const payload = await getAuthUser(request);
 * if (!payload) {
 *   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 * }
 */
export function getAuthUser(request: NextRequest): JWTPayload | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7);
  return verifyToken(token);
}

/**
 * Check if user has required role(s)
 * 
 * @param userRole - User's current role
 * @param requiredRoles - Allowed roles
 * @returns true if user role matches any required role
 * 
 * @example
 * if (!hasRole(user.role, ['ADMIN', 'HALL_OWNER'])) {
 *   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
 * }
 */
export function hasRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Protected route wrapper - validates auth before route execution
 * 
 * @param handler - API route handler
 * @param requiredRoles - Optional array of allowed roles
 * @returns Wrapped handler with auth check
 * 
 * @example
 * export const POST = protectedRoute(async (request, { params }) => {
 *   // Your code here - auth is already validated
 * }, ['CUSTOMER', 'ADMIN']);
 */
export function protectedRoute(
  handler: (request: NextRequest, context: any) => Promise<NextResponse>,
  requiredRoles?: string[]
) {
  return async (request: NextRequest, context: any) => {
    // Check auth
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - Missing or invalid token',
          statusCode: 401,
        },
        { status: 401 }
      );
    }

    // Check role
    if (requiredRoles && !hasRole(user.role, requiredRoles)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Forbidden - Insufficient permissions',
          statusCode: 403,
        },
        { status: 403 }
      );
    }

    // Call actual handler with user info in request
    const requestWithUser = new NextRequest(request, {
      headers: new Headers(request.headers),
    });
    requestWithUser.headers.set('x-user-id', user.userId);
    requestWithUser.headers.set('x-user-email', user.email);
    requestWithUser.headers.set('x-user-role', user.role);

    return handler(requestWithUser, context);
  };
}

/**
 * Public route wrapper - no auth required
 * Just for consistency in route definitions
 */
export function publicRoute(
  handler: (request: NextRequest, context: any) => Promise<NextResponse>
) {
  return (request: NextRequest, context: any) => handler(request, context);
}

/**
 * Role-based route wrapper
 * Shorthand for protectedRoute with specific roles
 */
export const adminRoute = (handler: (request: NextRequest, context: any) => Promise<NextResponse>) =>
  protectedRoute(handler, ['ADMIN']);

export const hallOwnerRoute = (handler: (request: NextRequest, context: any) => Promise<NextResponse>) =>
  protectedRoute(handler, ['HALL_OWNER', 'ADMIN']);

export const serviceProviderRoute = (handler: (request: NextRequest, context: any) => Promise<NextResponse>) =>
  protectedRoute(handler, ['SERVICE_PROVIDER', 'ADMIN']);

export const customerRoute = (handler: (request: NextRequest, context: any) => Promise<NextResponse>) =>
  protectedRoute(handler, ['CUSTOMER', 'ADMIN']);
