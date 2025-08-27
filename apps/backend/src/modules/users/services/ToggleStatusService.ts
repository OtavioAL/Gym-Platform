import { IUsersRepository } from '../repositories/IUsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import { UserRole, UserStatus } from '../enums';
import { UNAUTHORIZED, USER_NOT_FOUND } from '../../../shared/errors/error.messages';
import { UserMapper } from '../mappers/UserMapper';

export class ToggleStatusService {
  constructor(private usersRepo: IUsersRepository) {}
  async execute(id: string, currentUserRole: UserRole) {
    if (currentUserRole !== UserRole.ADMIN) throw new AppError(UNAUTHORIZED, 403);
    const user = await this.usersRepo.findById(id);

    if (!user) throw new AppError(USER_NOT_FOUND, 404);

    user.status = user.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;

    const userUpdated = await this.usersRepo.save(user);

    return UserMapper.toDTO(userUpdated);
  }
}
