import { UserRole } from '@shared/types';
import { BmiAssessmentRepository } from '../repositories/implementations/BmiAssessmentRepository';
import { AppError } from 'apps/backend/src/shared/errors/AppError';
import { UNAUTHORIZED } from 'apps/backend/src/shared/errors/error.messages';

export class MeEvaluationsService {
  constructor(private evalRepo: BmiAssessmentRepository) {}
  async execute({ studentId, currentRole }: { studentId: string; currentRole: UserRole }) {
    if (currentRole !== UserRole.STUDENT) {
      throw new AppError(UNAUTHORIZED, 403);
    }

    return this.evalRepo.findAll(studentId);
  }
}
