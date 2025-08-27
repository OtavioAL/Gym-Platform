import { UserRole } from '@shared/types';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(data: Partial<User>): Promise<User>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  hasEvaluations(id: string): Promise<boolean>;
  delete(id: string): Promise<void>;
  findAll(username?: string, role?: UserRole): Promise<User[]>;
}
