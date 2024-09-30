import { z } from 'zod';

export const zRegisterDto = z
  .object({
    email: z.string().trim().email('invalid email format!'),
    password: z
      .string()
      .trim()
      .min(8, 'password should be at least 8 characters'),
    confirmPassword: z.string().trim().min(8),
  })
  .strict()
  .refine(({ password, confirmPassword }) => password == confirmPassword, {
    message: 'The passwords did not match',
    path: ['confirmPassword'],
  });

export type RegisterDto = z.infer<typeof zRegisterDto>;

export const zLoginDto = z.object({
  email: z.string().trim().email('invalid email format!'),
  password: z
    .string()
    .trim()
    .min(8, 'password should be at least 8 characters'),
});

export type LoginDto = z.infer<typeof zLoginDto>;
