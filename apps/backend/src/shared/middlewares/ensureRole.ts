import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from '../errors/error.messages';

export function ensureRole(...roles: Array<string>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) return res.status(403).json({ message: UNAUTHORIZED });
    next();
  };
}
