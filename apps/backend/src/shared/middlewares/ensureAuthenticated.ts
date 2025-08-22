import { Request, Response, NextFunction } from 'express';
import { INVALID_TOKEN } from '../errors/error.messages';
import { verifyToken } from '../../utils/jwt';
import { AuthTokenPayload } from '../../@types/express/jwt-payload';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: INVALID_TOKEN });
  const [, token] = auth.split(' ');
  try {
    const payload = verifyToken(token) as AuthTokenPayload;

    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ message: INVALID_TOKEN });
  }
}
