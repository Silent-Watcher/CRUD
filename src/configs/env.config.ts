import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import logger from './logger.config';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),

  APP_ENV: z.enum(['development', 'production']),
  APP_NAME: z.literal('CRUD'),
  APP_URL: z.string().trim().url(),
  APP_PORT: z.string(),

  MONGO_HOST: z.string(),
  MONGO_USER: z.string(),
  MONGO_PASS: z.string(),
  MONGO_PORT: z.string(),

  DB_NAME: z.string(),
  DB_URL: z.string(),
});

const envParsedResult = environmentSchema.safeParse(process.env);

if (!envParsedResult.success) {
  logger.error(fromZodError(envParsedResult.error).message);
  throw new Error('There is an error with env variables!');
}

type EnvVarSchemaType = z.infer<typeof environmentSchema>;

declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace NodeJS {
    interface ProcessEnv extends EnvVarSchemaType {}
  }
}
