import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required. Never use a default secret.');
}

const publicRoutes = [
  '/api/auth/register',
  '/api/auth/login',
  '/api/auth/refresh',
  '/api/auth/logout',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-otp',
  '/api/halls/search',
  '/api/health',
  '/api/stats',
  '/api/docs',
  '/swagger',
  '/api/regions',
  '/api/districts',
  '/api/singers',
  '/api/cars',
  '/api/menus',
];

// ==================== RATE LIMITING ====================
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const rateLimitedPaths = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/verify-otp',
  '/api/auth/reset-password',
];

function checkRateLimit(ip: string, pathname: string): boolean {
  if (!rateLimitedPaths.some((p) => pathname.startsWith(p))) return true;
  const key = `${ip}:${pathname}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT_MAX_REQUESTS;
}

// Periodic cleanup
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap) {
      if (now > entry.resetAt) rateLimitMap.delete(key);
    }
  }, 300_000);
}

async function verifyAccessToken(token: string) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return {
      userId: String(payload.userId),
      email: String(payload.email),
      role: String(payload.role),
    };
  } catch {
    return null;
  }
}

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://wedding-platforom.vercel.app',
];

function setCorsHeaders(response: NextResponse, origin: string | null) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-user-id, x-user-role, x-user-email'
  );
  return response;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const origin = request.headers.get('origin');

  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    const preflight = new NextResponse(null, { status: 204 });
    return setCorsHeaders(preflight, origin);
  }

  // Rate limiting
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(clientIp, pathname)) {
    return setCorsHeaders(
      NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.', statusCode: 429 },
        { status: 429 }
      ),
      origin
    );
  }

  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return setCorsHeaders(NextResponse.next(), origin);
  }

  // Public GET-only routes: halls detail/list and services
  const publicGetRoutes = ['/api/halls', '/api/services'];
  if (request.method === 'GET' && publicGetRoutes.some((r) => pathname === r || pathname.startsWith(`${r}/`))) {
    return setCorsHeaders(NextResponse.next(), origin);
  }

  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return setCorsHeaders(
      NextResponse.json(
        { success: false, error: 'Unauthorized - Missing token', statusCode: 401 },
        { status: 401 }
      ),
      origin
    );
  }

  const decoded = await verifyAccessToken(token);
  if (!decoded) {
    return setCorsHeaders(
      NextResponse.json(
        { success: false, error: 'Unauthorized - Invalid token', statusCode: 401 },
        { status: 401 }
      ),
      origin
    );
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', decoded.userId);
  requestHeaders.set('x-user-email', decoded.email);
  requestHeaders.set('x-user-role', decoded.role);

  return setCorsHeaders(
    NextResponse.next({ request: { headers: requestHeaders } }),
    origin
  );
}

export const config = {
  matcher: ['/api/:path*'],
};
