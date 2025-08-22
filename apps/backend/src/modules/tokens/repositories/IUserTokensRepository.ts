import { User } from '../../users/entities/User';
import { UserToken } from '../entities/UserToken';

export interface IUserTokensRepository {
  createRefresh(user: User, token: string, expiresAt: Date): Promise<UserToken>;
  findValid(token: string): Promise<UserToken | null>;
  purgeExpired(now: Date): Promise<void>;
  revoke(token: string): Promise<void>;
}
