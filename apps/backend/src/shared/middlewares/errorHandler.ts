import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { INTERNAL_SERVER_ERROR, VALIDATION_ERROR } from '../errors/error.messages';
import { ZodError } from 'zod';

export function errorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
  if (error?.name === 'ZodError' || error instanceof ZodError) {
    return res.status(400).json({ message: VALIDATION_ERROR, issues: error.issues });
  }
  if (error instanceof AppError)
    return res.status(error.statusCode).json({ message: error.message });
  console.error(error);
  return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
}
