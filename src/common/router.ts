import { Router } from 'express';
import httpStatus from 'http-status';

import type { Application, NextFunction, Request, Response } from 'express';
const router = Router();

router.get('/health', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(httpStatus.OK).send({
      status: res.statusCode,
      code: 'OK',
      message: 'server is up and running...',
    });
  } catch (error) {
    next(error);
  }
});

export function startRouter(app: Application) {
  app.use(router);
}
