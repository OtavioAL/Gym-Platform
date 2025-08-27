import { UserRole } from '@shared/types';
import { IUsersRepository } from '../repositories/IUsersRepository';

export class ListUsersService {
  constructor(private usersRepo: IUsersRepository) {}

  async execute(filter: { username?: string; role?: UserRole }) {
    return this.usersRepo.findAll(filter?.username, filter?.role);
  }
}
