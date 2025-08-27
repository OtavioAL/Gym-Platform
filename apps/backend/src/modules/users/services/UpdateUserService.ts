import { UpdateUserInput } from '@shared/validations/update-user';
import { IUsersRepository } from '../repositories/IUsersRepository';
import bcrypt from 'bcryptjs';
import { UserRole, UserStatus } from '../enums';
import { AppError } from '../../../shared/errors/AppError';
import { UNAUTHORIZED, USER_NOT_FOUND } from '../../../shared/errors/error.messages';
import { UserMapper } from '../mappers/UserMapper';

export class UpdateUserService {
  constructor(private usersRepo: IUsersRepository) {}
  async execute(id: string, data: UpdateUserInput, currentUserRole: UserRole) {
    if (currentUserRole === UserRole.STUDENT) throw new AppError(UNAUTHORIZED, 403);
    if (currentUserRole === UserRole.TRAINER && data?.role && data?.role !== UserRole.STUDENT) {
      throw new AppError(UNAUTHORIZED, 403);
    }
    const { username, password, role, status } = data;

    const user = await this.usersRepo.findById(id);
    if (!user) throw new AppError(USER_NOT_FOUND, 404);

    if (username) user.username = username;
    if (role) user.role = UserRole[role.toUpperCase() as keyof typeof UserRole];

    if (status) user.status = UserStatus[status.toUpperCase() as keyof typeof UserStatus];
    if (password) user.password = await bcrypt.hash(password, 10);

    const userUpdated = await this.usersRepo.save(user);

    return UserMapper.toDTO(userUpdated);
  }
}
