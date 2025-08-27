import { BmiAssessment } from '../entities/BmiAssessment';

export interface IBmiAssessmentRepository {
  findAll(studentId?: string, evaluatorId?: string): Promise<BmiAssessment[]>;
  findById(id: string): Promise<BmiAssessment | null>;
  create(assessment: Partial<BmiAssessment>): Promise<BmiAssessment>;
  delete(id: string): Promise<void>;
  save(assessment: BmiAssessment): Promise<BmiAssessment>;
}
