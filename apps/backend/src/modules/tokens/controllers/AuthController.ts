import { Request, Response } from 'express';
import { AuthenticateService } from '../services/AuthenticateService';
import { RefreshTokenService } from '../services/RefreshTokenService';
import { UsersRepository } from '../../users/repositories/implementations/UsersRepository';
import { UserTokensRepository } from '../repositories/implementations/UserTokensRepository';
import { loginSchema } from '@shared/validations/auth';

export class AuthController {
  async login(req: Request, res: Response) {
    const { username, password } = loginSchema.parse(req.body);

    const service = new AuthenticateService(new UsersRepository(), new UserTokensRepository());

    const out = await service.execute(username, password);

    return res.json(out);
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;

    const service = new RefreshTokenService(new UserTokensRepository());

    const out = await service.execute(refreshToken);

    return res.json(out);
  }
}
