import { CONFIGS } from '$app/configs';
import httpStatus from 'http-status';

import type { Application, NextFunction, Request, Response } from 'express';

const { DEBUG } = CONFIGS;

type HttpError = {
  status: number;
  error: {
    code: string;
    message: string;
  };
};

function handleExceptions(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err) {
    if (err instanceof Error) {
      const error = err as Error & { status?: number; code?: string };
      res
        .status((error.status as number) || httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status: res.statusCode,
          error: {
            code: error.code || 'INTERNAL SERVER ERROR',
            ...(DEBUG ? error : { message: 'an error occurred' }),
          },
        });
      return;
    }
    res
      .status((err as HttpError).status || httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        status: res.statusCode,
        error: {
          code: (err as HttpError)?.error?.code || 'INTERNAL SERVER ERROR',
          ...(DEBUG ? err : {}),
        },
      });
    return;
  } else {
    next();
  }
}

function handleNotFoundError(req: Request, res: Response, _next: NextFunction) {
  res.status(httpStatus.NOT_FOUND).send({
    status: res.statusCode,
    error: {
      code: 'NOT FOUND',
      message: `${req.method}:${req.path} not found`,
    },
  });
  return;
}

export function configureErrorHandler(app: Application) {
  app.use(handleExceptions);
  app.use(handleNotFoundError);
}
