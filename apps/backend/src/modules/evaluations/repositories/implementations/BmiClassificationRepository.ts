import { Repository } from 'typeorm';
import { BmiClassification } from '../../entities/BmiClassification';
import AppDataSource from '../../../../database/data-source';
import { IBmiClassificationRepository } from '../IBmiClassificationRepository';
import { BmiClassificationEnum } from '../../../users/enums';

export class BmiClassificationRepository implements IBmiClassificationRepository {
  private repository: Repository<BmiClassification>;

  constructor() {
    this.repository = AppDataSource.getRepository(BmiClassification);
  }

  async findAll(): Promise<BmiClassification[]> {
    return this.repository.find();
  }

  async findByLabel(label: BmiClassificationEnum): Promise<BmiClassification | null> {
    return this.repository.findOne({ where: { label } });
  }

  async create(data: Partial<BmiClassification>): Promise<BmiClassification> {
    const classification = this.repository.create(data);
    return this.repository.save(classification);
  }
}
