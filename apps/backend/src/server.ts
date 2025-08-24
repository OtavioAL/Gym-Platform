import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './shared/middlewares/errorHandler';
import { routes } from './shared/routes/routes';

const app: Express = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use('/', routes);

app.use(errorHandler);

export { app };
