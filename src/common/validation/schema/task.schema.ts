import { Types } from 'mongoose';
import { z } from 'zod';

export const zTask = z
  .object({
	id: z.union([z.instanceof(Types.ObjectId) , z.string()]).optional(),
    title: z.string().trim().min(3, 'task title should be at least 3 chars'),
    isDone: z.boolean().default(false).optional(),
    user: z.union([z.string(), z.instanceof(Types.ObjectId)]),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export type Task = z.infer<typeof zTask>;
