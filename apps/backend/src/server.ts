import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './shared/middlewares/errorHandler';
import AppDataSource from './database/data-source';
import { env } from './config/env';
import { routes } from './shared/routes/routes';

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use('/', routes);

app.use(errorHandler);

AppDataSource.initialize().then(() => {
  app.listen(Number(env.PORT), () => console.log(`API running on http://localhost:${env.PORT}`));
});
