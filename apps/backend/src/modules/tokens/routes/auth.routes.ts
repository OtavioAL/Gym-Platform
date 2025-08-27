import { Router, type Router as ExpressRouter } from 'express';
import { AuthController } from '../controllers/AuthController';

const authRoutes: ExpressRouter = Router();

const auth = new AuthController();

authRoutes.post('/login', (req, res) => auth.login(req, res));
authRoutes.post('/refresh', (req, res) => auth.refresh(req, res));

export { authRoutes };
