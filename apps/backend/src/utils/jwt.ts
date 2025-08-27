import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

const JWT_SECRET: string = (env.JWT_SECRET as string) ?? 'secret';

export function generateToken(payload: object): string {
  const options = { expiresIn: env.JWT_EXPIRES_IN } as SignOptions;
  return jwt.sign(payload, JWT_SECRET, options);
}

export function generateRefreshToken(payload: object): string {
  const options = { expiresIn: env.JWT_REFRESH_EXPIRES_IN } as SignOptions;
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
