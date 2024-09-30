import { checkIfTheUserVerified } from '$guards/auth.guard';
import authRouter from '$modules/auth/auth.routes';
import taskRouter from '$modules/task/task.routes';
import userRouter from '$modules/user/user.routes';
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

router.use('/auth', authRouter);

router.use('/user', checkIfTheUserVerified, userRouter);

router.use('/tasks' , checkIfTheUserVerified , taskRouter )

export function startRouter(app: Application) {
  app.use(router);
}
