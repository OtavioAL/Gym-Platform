import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';
import { AppError } from '../../../shared/errors/AppError';
import { UserTokensRepository } from '../repositories/implementations/UserTokensRepository';
import { generateToken, verifyToken } from 'apps/backend/src/utils/jwt';
import {
  EXPIRED_REFRESH_TOKEN,
  INVALID_REFRESH_TOKEN,
} from 'apps/backend/src/shared/errors/error.messages';

export class RefreshTokenService {
  constructor(private tokensRepo: UserTokensRepository) {}
  async execute(refreshToken: string) {
    const stored = await this.tokensRepo.findValid(refreshToken);
    if (!stored) throw new AppError(INVALID_REFRESH_TOKEN, 401);

    try {
      const payload = verifyToken(refreshToken);

      const accessToken = generateToken({
        sub: payload?.sub,
        role: stored.user.role,
      });

      return { accessToken };
    } catch {
      await this.tokensRepo.revoke(refreshToken);
      throw new AppError(EXPIRED_REFRESH_TOKEN, 401);
    }
  }
}
