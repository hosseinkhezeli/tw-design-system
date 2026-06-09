import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '../constants/auth.constants';

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, 'validation.required'),

    lastName: z.string().trim().min(1, 'validation.required'),

    identifier: z.string().trim().min(1, 'validation.required'),

    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `validation.password_min_${PASSWORD_MIN_LENGTH}`,
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'validation.password_mismatch',
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
