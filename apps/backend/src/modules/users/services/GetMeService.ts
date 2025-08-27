import { AppError } from '../../../shared/errors/AppError';
import { UserDTO } from '../dtos/UserDTO';
import { UserMapper } from '../mappers/UserMapper';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { INACTIVE_USER, USER_NOT_FOUND } from '../../../shared/errors/error.messages';
import { UserStatus } from '../enums';

export class GetMeService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string): Promise<UserDTO> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError(USER_NOT_FOUND, 404);
    }
    if (user.status === UserStatus.INACTIVE) {
      throw new AppError(INACTIVE_USER, 400);
    }

    return UserMapper.toDTO(user);
  }
}
