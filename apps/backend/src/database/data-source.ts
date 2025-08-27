import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../config/env';

export default new DataSource({
  type: 'sqlite',
  database: env.DB_PATH,
  entities: ['src/modules/**/entities/*.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
});
