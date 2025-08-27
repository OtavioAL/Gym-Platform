import { Router, type Router as ExpressRouter } from 'express';
import { userRoutes } from '../../modules/users/routes/users.routes';
import { authRoutes } from '../../modules/tokens/routes/auth.routes';
import { evaluationsRoutes } from '../../modules/evaluations/routes/evaluations.routes';

const routes: ExpressRouter = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/evaluations', evaluationsRoutes);

export { routes };
