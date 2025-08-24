import { Router, type Router as ExpressRouter } from 'express';
import { AuthController } from '../controllers/AuthController';

const authRoutes: ExpressRouter = Router();

const auth = new AuthController();

authRoutes.post('/auth/login', (req, res) => auth.login(req, res));
authRoutes.post('/auth/refresh', (req, res) => auth.refresh(req, res));

export { authRoutes };
