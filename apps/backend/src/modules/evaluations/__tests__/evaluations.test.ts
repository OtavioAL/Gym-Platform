import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BmiClassificationEnum, UserRole, UserStatus } from '../../users/enums';
import { AppError } from '../../../shared/errors/AppError';
import { CreateEvaluationService } from '../services/CreateEvaluationService';
import { UpdateEvaluationService } from '../services/UpdateEvaluationService';
import { ListEvaluationsService } from '../services/ListEvaluationsService';

vi.mock('../../../../utils/imc', () => ({
  calculateBMI: vi.fn(() => 25),
  calculateIMC: vi.fn(() => BmiClassificationEnum.NORMAL_WEIGHT),
}));

const fakeStudent = {
  id: 'student-1',
  username: 'student@example.com',
  role: UserRole.STUDENT,
  status: UserStatus.ACTIVE,
};

const fakeEval = {
  id: 'eval-1',
  bmi: 22,
  height: 1.75,
  weight: 68,
  student: fakeStudent,
};

describe('Evaluation Services', () => {
  let evalRepo: any;
  let usersRepo: any;
  let classificationRepo: any;

  beforeEach(() => {
    evalRepo = {
      create: vi.fn(),
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
    };
    usersRepo = {
      findById: vi.fn(),
    };
    classificationRepo = {
      findByLabel: vi.fn().mockResolvedValue({ id: 1 }),
    };
  });

  describe('CreateEvaluationService', () => {
    it('should create a valid evaluation', async () => {
      usersRepo.findById.mockResolvedValue(fakeStudent);
      evalRepo.create.mockResolvedValue(fakeEval);

      const service = new CreateEvaluationService(evalRepo, usersRepo, classificationRepo);
      const result = await service.execute(
        { id: 'trainer-1', role: UserRole.TRAINER },
        { userId: fakeStudent.id, height: 1.75, weight: 68 },
      );

      expect(result).toEqual(fakeEval);
    });

    it('should throw if student not found', async () => {
      usersRepo.findById.mockResolvedValue(null);
      const service = new UpdateEvaluationService(evalRepo, classificationRepo);

      await expect(
        service.execute('trainer-1', UserRole.TRAINER, { height: 1.75, weight: 68 }),
      ).rejects.toThrow(AppError);
    });

    it('should throw if student is inactive', async () => {
      usersRepo.findById.mockResolvedValue({ ...fakeStudent, status: UserStatus.INACTIVE });
      const service = new CreateEvaluationService(evalRepo, usersRepo, classificationRepo);

      await expect(
        service.execute(
          { id: 'trainer-1', role: UserRole.TRAINER },
          { userId: fakeStudent.id, height: 1.75, weight: 68 },
        ),
      ).rejects.toThrow(AppError);
    });

    it('should throw if current user is student', async () => {
      const service = new CreateEvaluationService(evalRepo, usersRepo, classificationRepo);

      await expect(
        service.execute(
          { id: 'student-1', role: UserRole.STUDENT },
          { userId: fakeStudent.id, height: 1.75, weight: 68 },
        ),
      ).rejects.toThrow(AppError);
    });
  });

  describe('UpdateEvaluationService', () => {
    it('should update evaluation', async () => {
      evalRepo.findById.mockResolvedValue(fakeEval);
      evalRepo.save.mockResolvedValue({ ...fakeEval, weight: 70 });

      const service = new UpdateEvaluationService(evalRepo, classificationRepo);
      const result = await service.execute('eval-1', UserRole.TRAINER, { weight: 70 });

      expect(result.weight).toBe(70);
    });

    it('should throw if not found', async () => {
      evalRepo.findById.mockResolvedValue(null);
      const service = new UpdateEvaluationService(evalRepo, classificationRepo);

      await expect(service.execute('eval-1', UserRole.ADMIN, { weight: 70 })).rejects.toThrow(
        AppError,
      );
    });

    it('should throw if student tries to update', async () => {
      const service = new UpdateEvaluationService(evalRepo, classificationRepo);
      await expect(service.execute('eval-1', UserRole.STUDENT, { weight: 70 })).rejects.toThrow(
        AppError,
      );
    });
  });

  describe('ListEvaluationsService', () => {
    it('should list evaluations', async () => {
      evalRepo.findAll.mockResolvedValue([fakeEval]);
      const service = new ListEvaluationsService(evalRepo);

      const result = await service.execute({});
      expect(result).toHaveLength(1);
    });
  });
});
