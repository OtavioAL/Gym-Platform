import AppDataSource from './database/data-source';
import { app } from './server';
import { env } from './config/env';

AppDataSource.initialize().then(() => {
  app.listen(Number(env.PORT), () => console.log(`API running on http://localhost:${env.PORT}`));
});
