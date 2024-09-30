import { join } from 'node:path';
import { cwd, env } from 'process';

export const CONFIGS = Object.freeze({
  DEBUG: env.APP_ENV == 'development',
  ENV: env.NODE_ENV,
  VIEWS: {
    PATH: join(cwd(), 'resources', 'views'),
    ENGINE: 'ejs',
    STATICS: join(cwd(), 'public'),
  },
  LAYOUTS: {
    HOME: join(cwd(), 'resources', 'layouts', 'layout'),
  },
  DB: {
    HOST: env.MONGO_HOST,
    PORT: parseInt(env.MONGO_PORT),
    USER: env.MONGO_USER,
    PASSWORD: env.MONGO_PASS,
    NAME: env.DB_NAME,
    URL: env.DB_URL,
  },
  APP: {
    PORT: parseInt(env.APP_PORT) || 3000,
    NAME: env.APP_NAME,
    URL: env.APP_URL,
  },
});
