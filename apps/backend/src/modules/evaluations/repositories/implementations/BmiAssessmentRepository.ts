import { Repository } from 'typeorm';
import { BmiAssessment } from '../../entities/BmiAssessment';
import AppDataSource from '../../../../database/data-source';
import { IBmiAssessmentRepository } from '../IBmiAssessmentRepository';

export class BmiAssessmentRepository implements IBmiAssessmentRepository {
  private repository: Repository<BmiAssessment>;

  constructor() {
    this.repository = AppDataSource.getRepository(BmiAssessment);
  }

  async findAll(studentId?: string, evaluatorId?: string): Promise<BmiAssessment[]> {
    return this.repository.find({
      relations: ['classification', 'evaluator', 'student'],
      order: { createdAt: 'DESC' },
      where: [{ student: { id: studentId } }, { evaluator: { id: evaluatorId } }],
    });
  }

  async findById(id: string): Promise<BmiAssessment | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['classification', 'evaluator', 'student'],
    });
  }

  async create(data: Partial<BmiAssessment>): Promise<BmiAssessment> {
    const assessment = this.repository.create(data);
    return this.repository.save(assessment);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async save(user: BmiAssessment) {
    return this.repository.save(user);
  }
}
