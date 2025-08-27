import { Router, type Router as ExpressRouter } from 'express';
import { ensureAuthenticated } from 'apps/backend/src/shared/middlewares/ensureAuthenticated';
import { ensureRole } from 'apps/backend/src/shared/middlewares/ensureRole';
import { EvaluationsController } from '../controllers/EvaluationsController';
import { UserRole } from '../../users/enums';

const evaluationsRoutes: ExpressRouter = Router();

const evaluationsController = new EvaluationsController();

evaluationsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureRole(UserRole.ADMIN, UserRole.TRAINER, UserRole.STUDENT),
  (req, res) => evaluationsController.list(req, res),
);
evaluationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureRole(UserRole.ADMIN, UserRole.TRAINER),
  (req, res) => evaluationsController.create(req, res),
);
evaluationsRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureRole(UserRole.ADMIN, UserRole.TRAINER),
  (req, res) => evaluationsController.update(req, res),
);

evaluationsRoutes.delete('/:id', ensureAuthenticated, ensureRole(UserRole.ADMIN), (req, res) =>
  evaluationsController.delete(req, res),
);

export { evaluationsRoutes };
