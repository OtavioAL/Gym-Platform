import { BmiAssessmentRepository } from '../repositories/implementations/BmiAssessmentRepository';

export class ListEvaluationsService {
  constructor(private evalRepo: BmiAssessmentRepository) {}
  async execute(filter: { studentId?: string; evaluatorId?: string }) {
    return this.evalRepo.findAll();
  }
}
