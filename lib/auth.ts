import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from './db';

const JWT_SECRET = (process.env.JWT_SECRET || 'your-secret-key') as Secret;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare password with hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT token
 */
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  } as SignOptions);
}

/**
 * Generate refresh token
 */
export async function generateRefreshToken(userId: string): Promise<string> {
  const refreshToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '30d',
  } as SignOptions);

  await prisma.refreshToken.create({
    data: {
      userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  return refreshToken;
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Verify refresh token
 */
export async function verifyRefreshToken(token: string): Promise<JWTPayload | null> {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;

    const refreshTokenRecord = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!refreshTokenRecord || refreshTokenRecord.expiresAt < new Date()) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Generate OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Verify OTP
 */
export async function verifyOTP(userId: string, code: string, purpose: string): Promise<boolean> {
  const otp = await prisma.oTP.findUnique({
    where: { userId },
  });

  if (!otp || otp.code !== code || otp.purpose !== purpose) {
    return false;
  }

  if (otp.expiresAt < new Date()) {
    await prisma.oTP.delete({ where: { userId } });
    return false;
  }

  return true;
}

/**
 * Revoke refresh token
 */
export async function revokeRefreshToken(token: string): Promise<void> {
  await prisma.refreshToken.deleteMany({ where: { token } });
}

/**
 * Create OTP
 */
export async function createOTP(userId: string, purpose: string): Promise<string> {
  const code = generateOTP();

  // Delete existing OTP if any
  await prisma.oTP.deleteMany({ where: { userId } });

  await prisma.oTP.create({
    data: {
      userId,
      code,
      purpose,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
  });

  return code;
}
