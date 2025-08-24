import { IUsersRepository } from '../repositories/IUsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import { UserRole } from '../enums';
import { UNAUTHORIZED, USER_HAS_LINKED_REVIES } from '../../../shared/errors/error.messages';

export class DeleteUserService {
  constructor(private usersRepo: IUsersRepository) {}
  async execute(id: string, currentUserRole: UserRole) {
    if (currentUserRole !== UserRole.ADMIN) throw new AppError(UNAUTHORIZED, 403);

    const has = await this.usersRepo.hasEvaluations(id);

    if (has) throw new AppError(USER_HAS_LINKED_REVIES);

    await this.usersRepo.delete(id);
  }
}
