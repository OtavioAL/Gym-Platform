import { BmiClassificationEnum } from '../../users/enums';
import { BmiClassification } from '../entities/BmiClassification';

export interface IBmiClassificationRepository {
  findAll(): Promise<BmiClassification[]>;
  findByLabel(label: BmiClassificationEnum): Promise<BmiClassification | null>;
  create(data: Partial<BmiClassification>): Promise<BmiClassification>;
}
