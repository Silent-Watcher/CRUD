import { z } from 'zod';

import { zUser } from './user.schema';

export const zJwtPayload = z.object({
  _id: zUser.shape._id,
  email: zUser.shape.email,
});

export type JwtPayload = z.infer<typeof zJwtPayload>;
