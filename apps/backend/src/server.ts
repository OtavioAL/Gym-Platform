import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './shared/middlewares/errorHandler';
import { routes } from './shared/routes/routes';
import { env } from './config/env';
import { swaggerConfig } from './config/swagger';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app: Express = express();

const allowedOrigins = [env.FRONTEND_URL, 'http://127.0.0.1:3000'];

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} não permitido por CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(express.json());

app.use('/', routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(errorHandler);

export { app };
