import {
  EVALUATION_NOT_FOUND,
  STUDENT_CANNOT_REGISTER_EVALUATION,
} from 'apps/backend/src/shared/errors/error.messages';
import { AppError } from '../../../shared/errors/AppError';
import { BmiClassificationEnum, UserRole } from '../../users/enums';
import { BmiAssessmentRepository } from '../repositories/implementations/BmiAssessmentRepository';
import { UpdateEvalInput } from '@shared/validations/update-evaluations';
import { calculateBMI, calculateIMC } from './bmi';
import { BmiClassificationRepository } from '../repositories/implementations/BmiClassificationRepository';

export class UpdateEvaluationService {
  constructor(private evalRepo: BmiAssessmentRepository) {}
  async execute(id: string, currentRole: UserRole, data: UpdateEvalInput) {
    if (currentRole === UserRole.STUDENT)
      throw new AppError(STUDENT_CANNOT_REGISTER_EVALUATION, 403);

    const evaluation = await this.evalRepo.findById(id);
    if (!evaluation) throw new AppError(EVALUATION_NOT_FOUND, 404);

    if (data?.height) evaluation.height = data.height;
    if (data?.weight) evaluation.weight = data.weight;
    if (data?.height || data?.weight) {
      evaluation.bmi = calculateBMI(data.weight ?? 1, data.height ?? 1);
      const classification: BmiClassificationEnum = calculateIMC(evaluation?.bmi);

      const classificationRepository = new BmiClassificationRepository();

      const classificationId = await classificationRepository.findByLabel(classification);

      if (classificationId) evaluation.classification = classificationId;
    }

    return this.evalRepo.save(evaluation);
  }
}
