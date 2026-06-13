import z from 'zod';
import { PASSWORD_MIN_LENGTH } from '../constants/auth.constants';

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'گذرواژه الزامی است')
      .min(PASSWORD_MIN_LENGTH, 'گذرواژه باید حداقل ۶ کاراکتر باشه'),
    confirmPassword: z
      .string()
      .min(1, 'گذرواژه الزامی است')
      .min(PASSWORD_MIN_LENGTH, 'گذرواژه باید حداقل ۶ کاراکتر باشه'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'تکرار گذرواژه با گذرواژه اصلی یکی نیست',
  });
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
