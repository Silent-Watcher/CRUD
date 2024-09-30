import { checkIfTheUserVerified } from '$guards/auth.guard';
import { removeEmptyValues } from '$middlewares/omitEmpty.middleware';
import { validateBody } from '$validation/dataValidator';
import { zLoginDto, zRegisterDto } from '$validation/schema/auth.schema';
import { Router } from 'express';

import authController from './auth.controller';

const router = Router();

router.post(
  '/register',
  removeEmptyValues(),
  validateBody(zRegisterDto),
  authController.register,
);

router.post(
  '/login',
  removeEmptyValues(),
  validateBody(zLoginDto),
  authController.login,
);

router.get('/logout', checkIfTheUserVerified, authController.logout);

export default router;
