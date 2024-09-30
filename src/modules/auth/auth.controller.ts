import type { LoginDto, RegisterDto } from '$validation/schema/auth.schema';
import type { Request, Response, NextFunction } from 'express';
import { CONFIGS } from '$app/configs';
import { Controller } from '$interfaces/Controller';
import httpStatus from 'http-status';

import { authMessages } from './auth.messages';
import authService from './auth.service';

class AuthController extends Controller {
  private service;

  constructor() {
    super();
    this.service = authService;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as RegisterDto;

      // check for duplicate email value
      const isEmailValueDuplicated = await this.service.isEmailAlreadyExists(
        dto.email,
      );

      if (isEmailValueDuplicated) {
        res.status(httpStatus.CONFLICT).send({
          status: res.statusCode,
          error: {
            code: 'CONFLICT',
            message: authMessages.duplicateEmailValue,
          },
        });
        return;
      }

      const { email, displayName } = await this.service.register(dto);

      res.status(httpStatus.OK).send({
        status: res.statusCode,
        code: 'OK',
        message: authMessages.registeredSuccessfully,
        user: {
          ...(displayName
            ? { displayName: displayName, email: email }
            : { email: email }),
        },
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as LoginDto;

      const token = await this.service.login(dto);

      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: !CONFIGS.DEBUG,
          maxAge: CONFIGS._1DAY.ms,
          path: '/',
        })
        .status(httpStatus.OK)
        .send({
          status: res.statusCode,
          code: 'OK',
          message: authMessages.loginSuccessfully,
        });
      return;
    } catch (error) {
		console.log(error);
      next(error);
    }
  }

  logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('access_token');
      delete req.user;
      res.send({
        status: res.statusCode,
        code: 'OK',
        message: authMessages.logoutSuccessfully,
      });
      return;
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
