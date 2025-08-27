import { CreateUserInput } from '@shared/validations/create-user';
import { IUsersRepository } from '../repositories/IUsersRepository';
import bcrypt from 'bcryptjs';
import { UserRole, UserStatus } from '../enums';
import { AppError } from '../../../shared/errors/AppError';
import { UNAUTHORIZED, USER_ALREADY_EXISTS } from '../../../shared/errors/error.messages';
import { UserMapper } from '../mappers/UserMapper';

export class CreateUserService {
  constructor(private usersRepo: IUsersRepository) {}
  async execute(data: CreateUserInput, currentUserRole: UserRole) {
    if (currentUserRole === UserRole?.TRAINER && data?.role !== UserRole?.STUDENT)
      throw new AppError(UNAUTHORIZED, 403);

    if (currentUserRole === UserRole?.STUDENT) throw new AppError(UNAUTHORIZED, 403);

    const userAlreadyExists = await this.usersRepo.findByUsername(data?.username);
    if (userAlreadyExists) throw new AppError(USER_ALREADY_EXISTS, 400);

    const passwordHash = await bcrypt.hash(data?.password, 10);

    const userCreated = await this.usersRepo.create({
      ...data,
      role: UserRole[data.role.toUpperCase() as keyof typeof UserRole],
      password: passwordHash,
      status: UserStatus.ACTIVE,
    });

    return UserMapper.toDTO(userCreated);
  }
}
