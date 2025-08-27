import { UserRole } from '@shared/types';
import { AppError } from '../../../shared/errors/AppError';
import { EVALUATION_NOT_FOUND, UNAUTHORIZED } from '../../../shared/errors/error.messages';
import { BmiAssessmentRepository } from '../repositories/implementations/BmiAssessmentRepository';

export class DeleteEvaluationService {
  constructor(private evalRepo: BmiAssessmentRepository) {}
  async execute(id: string, currentUserRole: UserRole) {
    if (currentUserRole !== UserRole.ADMIN) throw new AppError(UNAUTHORIZED, 403);

    const evaluation = this.evalRepo.findById(id);
    if (!evaluation) throw new AppError(EVALUATION_NOT_FOUND, 404);

    await this.evalRepo.delete(id);
  }
}
