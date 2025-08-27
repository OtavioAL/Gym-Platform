import { Repository } from 'typeorm';
import { IUsersRepository } from '../IUsersRepository';
import { User } from '../../entities/User';
import AppDataSource from '../../../../database/data-source';
import { BmiAssessment } from '../../../evaluations/entities/BmiAssessment';
import { UserRole } from '@shared/types';

export class UsersRepository implements IUsersRepository {
  private orm: Repository<User>;
  constructor() {
    this.orm = AppDataSource.getRepository(User);
  }

  async create(data: Partial<User>) {
    return this.orm.save(this.orm.create(data));
  }
  async save(user: User) {
    return this.orm.save(user);
  }
  async findById(id: string) {
    return this.orm.findOne({ where: { id } });
  }
  async findByUsername(username: string) {
    return this.orm.findOne({ where: { username } });
  }
  async hasEvaluations(id: string) {
    const repo = AppDataSource.getRepository(BmiAssessment);
    const count = await repo.count({
      where: [
        {
          evaluator: { id },
          student: { id },
        },
      ],
    });
    return count > 0;
  }
  async delete(id: string) {
    await this.orm.delete(id);
  }
  async findAll(username?: string, role?: UserRole): Promise<User[]> {
    return this.orm.find({ where: { username, role } });
  }
}
