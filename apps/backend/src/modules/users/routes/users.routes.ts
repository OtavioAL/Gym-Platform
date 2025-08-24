import { Router, type Router as ExpressRouter } from 'express';
import { ensureAuthenticated } from 'apps/backend/src/shared/middlewares/ensureAuthenticated';
import { UsersController } from '../controllers/UsersController';
import { ensureRole } from 'apps/backend/src/shared/middlewares/ensureRole';

const userRoutes: ExpressRouter = Router();

const userControlle = new UsersController();

userRoutes.post('/users', ensureAuthenticated, ensureRole('admin', 'trainer'), (req, res) =>
  userControlle.create(req, res),
);
userRoutes.put('/users/:id', ensureAuthenticated, ensureRole('admin', 'trainer'), (req, res) =>
  userControlle.update(req, res),
);
userRoutes.patch('/users/:id/status', ensureAuthenticated, ensureRole('admin'), (req, res) =>
  userControlle.toggle(req, res),
);
userRoutes.delete('/users/:id', ensureAuthenticated, ensureRole('admin'), (req, res) =>
  userControlle.remove(req, res),
);

export { userRoutes };
