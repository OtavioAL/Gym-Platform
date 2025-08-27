import { UserRole, UserStatus } from '@shared/types';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { AppError } from 'apps/backend/src/shared/errors/AppError';
import {
  INACTIVE_USER,
  UNAUTHORIZED,
  USER_NOT_FOUND,
} from 'apps/backend/src/shared/errors/error.messages';
import { UserMapper } from '../mappers/UserMapper';

export class GetUserService {
  constructor(private usersRepo: IUsersRepository) {}
  async execute(id: string, currentUserRole: UserRole) {
    if (currentUserRole !== UserRole.ADMIN && currentUserRole !== UserRole.TRAINER)
      throw new AppError(UNAUTHORIZED, 403);

    const user = await this.usersRepo.findById(id);
    if (!user) throw new AppError(USER_NOT_FOUND, 404);

    if (user.status === UserStatus.INACTIVE) throw new AppError(INACTIVE_USER, 400);

    return UserMapper.toDTO(user);
  }
}
