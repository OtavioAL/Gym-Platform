import { Repository, LessThan } from 'typeorm';
import { UserToken } from '../../entities/UserToken';
import AppDataSource from '../../../../database/data-source';
import { User } from '../../../users/entities/User';
import { IUserTokensRepository } from '../IUserTokensRepository';

export class UserTokensRepository implements IUserTokensRepository {
  private orm: Repository<UserToken>;
  constructor() {
    this.orm = AppDataSource.getRepository(UserToken);
  }

  async createRefresh(user: User, token: string, expiresAt: Date) {
    const model = this.orm.create({ refreshToken: token, expiresAt: expiresAt, user });
    return this.orm.save(model);
  }
  async findValid(token: string) {
    return this.orm.findOne({ where: { refreshToken: token }, relations: ['user'] });
  }
  async purgeExpired(now = new Date()) {
    await this.orm.delete({ expiresAt: LessThan(now) } as any);
  }
  async revoke(token: string) {
    await this.orm.delete({ refreshToken: token } as any);
  }
}
