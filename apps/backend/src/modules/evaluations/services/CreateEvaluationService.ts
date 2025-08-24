import { IUsersRepository } from '../../users/repositories/IUsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import { BmiAssessmentRepository } from '../repositories/implementations/BmiAssessmentRepository';
import { CreateEvalInput } from '@shared/validations/create-evaluations';
import { BmiClassificationEnum, UserRole, UserStatus } from '../../users/enums';
import {
  INACTIVE_STUDENT,
  INVALID_USER_TYPE,
  STUDENT_CANNOT_REGISTER_EVALUATION,
  USER_NOT_FOUND,
} from '../../../shared/errors/error.messages';
import { calculateBMI, calculateIMC } from './bmi';
import { BmiClassificationRepository } from '../repositories/implementations/BmiClassificationRepository';

export class CreateEvaluationService {
  constructor(
    private evalRepo: BmiAssessmentRepository,
    private usersRepo: IUsersRepository,
    private classificationRepo: BmiClassificationRepository,
  ) {}

  async execute(currentUser: { id: string; role: UserRole }, data: CreateEvalInput) {
    if (currentUser.role === UserRole.STUDENT)
      throw new AppError(STUDENT_CANNOT_REGISTER_EVALUATION, 403);

    const student = await this.usersRepo.findById(data.userId);

    if (!student) throw new AppError(USER_NOT_FOUND, 404);
    if (student.role !== UserRole.STUDENT) throw new AppError(INVALID_USER_TYPE);
    if (student.status === UserStatus.INACTIVE) throw new AppError(INACTIVE_STUDENT, 400);

    const bmi = calculateBMI(data.weight, data.height);
    const classification: BmiClassificationEnum = calculateIMC(bmi);

    const classificationEntity = await this.classificationRepo.findByLabel(classification);

    return this.evalRepo.create({
      evaluator: { id: currentUser.id } as any,
      bmi,
      height: data.height,
      weight: data.weight,
      student,
      classification: classificationEntity ?? undefined,
    });
  }
}
