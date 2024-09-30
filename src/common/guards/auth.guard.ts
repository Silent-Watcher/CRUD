import { authMessages } from '$modules/auth/auth.messages';
import { userModel } from '$modules/user/user.model';
import { verifyToken } from '$utils/token.utils';
import httpErrors from 'http-errors';

import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from '$validation/schema/jwt.schema';

export async function checkIfTheUserVerified(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.cookies['access_token'];

    if (!accessToken)
      throw new httpErrors.Unauthorized(authMessages.unauthorizedUser);

    const payload = verifyToken(
      accessToken,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    if (!payload._id)
      throw new httpErrors.Unauthorized(authMessages.invalidCredentials);

    const authorizedUser = await userModel
      .findOne(
        {
          _id: payload._id,
          email: payload.email,
        },
        { email: 1, _id: 1 },
      )
      .lean();

    if (!authorizedUser)
      throw new httpErrors.Unauthorized(authMessages.invalidCredentials);

    req.user = authorizedUser;
    next();
  } catch (error) {
    next(error);
  }
}
