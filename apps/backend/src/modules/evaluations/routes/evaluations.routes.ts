import { Router, type Router as ExpressRouter } from 'express';
import { ensureAuthenticated } from 'apps/backend/src/shared/middlewares/ensureAuthenticated';
import { ensureRole } from 'apps/backend/src/shared/middlewares/ensureRole';
import { EvaluationsController } from '../controllers/EvaluationsController';

const evaluationsRoutes: ExpressRouter = Router();

const evaluationsController = new EvaluationsController();

evaluationsRoutes.get(
  '/evaluations',
  ensureAuthenticated,
  ensureRole('admin', 'professor', 'aluno'),
  (req, res) => evaluationsController.list(req, res),
);
evaluationsRoutes.post(
  '/evaluations',
  ensureAuthenticated,
  ensureRole('admin', 'professor'),
  (req, res) => evaluationsController.create(req, res),
);
evaluationsRoutes.put(
  '/evaluations/:id',
  ensureAuthenticated,
  ensureRole('admin', 'professor'),
  (req, res) => evaluationsController.update(req, res),
);

export { evaluationsRoutes };
