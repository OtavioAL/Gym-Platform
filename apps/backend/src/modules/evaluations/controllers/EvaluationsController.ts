import { Request, Response } from 'express';

import { CreateEvaluationService } from '../services/CreateEvaluationService';
import { UpdateEvaluationService } from '../services/UpdateEvaluationService';
import { ListEvaluationsService } from '../services/ListEvaluationsService';
import { createEvalSchema } from '@shared/validations/create-evaluations';
import { BmiAssessmentRepository } from '../repositories/implementations/BmiAssessmentRepository';
import { UsersRepository } from '../../users/repositories/implementations/UsersRepository';
import { updateEvalSchema } from '@shared/validations/update-evaluations';

export class EvaluationsController {
  async create(req: Request, res: Response) {
    const data = createEvalSchema.parse(req.body);

    const current = (req as any).user;

    const out = await new CreateEvaluationService(
      new BmiAssessmentRepository(),
      new UsersRepository(),
    ).execute(current, data);

    return res.status(201).json(out);
  }
  async update(req: Request, res: Response) {
    const input = updateEvalSchema.parse(req.body);

    const current = (req as any).user;

    const out = await new UpdateEvaluationService(new BmiAssessmentRepository()).execute(
      req.params.id,
      current.role,
      input,
    );

    return res.json(out);
  }
  async list(req: Request, res: Response) {
    const { studentId, evaluatorId } = req.query as any;

    const out = await new ListEvaluationsService(new BmiAssessmentRepository()).execute({
      studentId,
      evaluatorId,
    });

    return res.json(out);
  }
}
