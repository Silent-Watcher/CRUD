import { CONFIGS } from '$app/configs';
import jwt from 'jsonwebtoken';

import type { JwtPayload } from '$validation/schema/jwt.schema';

export function signToken(
  payload: JwtPayload,
  secret: string = CONFIGS.JWT.SECRET,
): string {
  return jwt.sign(payload, secret);
}

export function verifyToken(
  token: string,
  secret: string = CONFIGS.JWT.SECRET,
) {
  return jwt.verify(token, secret);
}
