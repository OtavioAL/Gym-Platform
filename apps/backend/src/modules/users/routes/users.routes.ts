import { Router, type Router as ExpressRouter } from 'express';
import { ensureAuthenticated } from 'apps/backend/src/shared/middlewares/ensureAuthenticated';
import { UsersController } from '../controllers/UsersController';
import { ensureRole } from 'apps/backend/src/shared/middlewares/ensureRole';
import { UserRole } from '../enums';

const userRoutes: ExpressRouter = Router();

const userController = new UsersController();

userRoutes.post(
  '/',
  ensureAuthenticated,
  ensureRole(UserRole.ADMIN, UserRole.TRAINER),
  (req, res) => userController.create(req, res),
);
userRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureRole(UserRole.ADMIN, UserRole.TRAINER),
  (req, res) => userController.update(req, res),
);
userRoutes.patch('/:id/status', ensureAuthenticated, ensureRole(UserRole.ADMIN), (req, res) =>
  userController.toggle(req, res),
);
userRoutes.delete('/:id', ensureAuthenticated, ensureRole(UserRole.ADMIN), (req, res) =>
  userController.remove(req, res),
);

userRoutes.get('/me', ensureAuthenticated, (req, res) => userController.me(req, res));

userRoutes.get('/', ensureAuthenticated, ensureRole(UserRole.ADMIN, UserRole.TRAINER), (req, res) =>
  userController.list(req, res),
);

userRoutes.get(
  '/:id',
  ensureAuthenticated,
  ensureRole(UserRole.ADMIN, UserRole.TRAINER),
  (req, res) => userController.get(req, res),
);

export { userRoutes };
