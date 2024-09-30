import { Controller } from '$app/common/interfaces/Controller';
import httpStatus from 'http-status';

import type { Request, Response, NextFunction } from 'express';
class UserController extends Controller {
  constructor() {
    super();
  }

  whoami(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(httpStatus.OK).send({
        status: res.statusCode,
        code: 'OK',
        message: 'Hello user',
        user: req.user,
      });
      return;
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
