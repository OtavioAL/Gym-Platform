import { IUsersRepository } from '../../users/repositories/IUsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import bcrypt from 'bcryptjs';
import { env } from '../../../config/env';
import { UserTokensRepository } from '../repositories/implementations/UserTokensRepository';
import { INACTIVE_USER, INVALID_CREDENTIALS } from '../../../shared/errors/error.messages';
import { UserStatus } from '../../users/enums';
import { generateRefreshToken, generateToken } from '../../../utils/jwt';
import { parseTimeToMilliseconds } from '../../../utils/parse-time';

export class AuthenticateService {
  constructor(
    private usersRepo: IUsersRepository,
    private tokensRepo: UserTokensRepository,
  ) {}

  async execute(username: string, password: string) {
    const user = await this.usersRepo.findByUsername(username);

    if (!user) throw new AppError(INVALID_CREDENTIALS, 401);

    if (user.status === UserStatus.INACTIVE) throw new AppError(INACTIVE_USER, 403);
    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordMatch) throw new AppError(INVALID_CREDENTIALS, 401);

    const payloadToken = {
      sub: user.id,
      role: user.role,
    };

    const accessToken = generateToken(payloadToken);

    const refreshToken = generateRefreshToken(payloadToken);

    const expiresAt = new Date(Date.now() + parseTimeToMilliseconds(env.JWT_REFRESH_EXPIRES_IN));

    await this.tokensRepo.createRefresh(user, refreshToken, expiresAt);

    return {
      accessToken,
      refreshToken,
      user: { id: user?.id, name: user.name, role: user.role },
    };
  }
}
