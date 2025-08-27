import { z } from 'zod';
import 'dotenv/config';
import { logError } from './debug';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('3333'),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  DB_PATH: z.string().default('db.sqlite'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  logError('⛔️ environment variables verification failed!');
  logError(JSON.stringify(parsedEnv.error.format()));
  throw new Error(JSON.stringify(parsedEnv.error.format()));
}

export const env = parsedEnv.data;
