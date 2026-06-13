import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '../constants/auth.constants';
import { phoneRegex } from '../utils/regex.ytils';

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, 'وارد کردن نام الزامی است'),
    lastName: z.string().trim().min(1, 'وارد کردن نام خانوادگی الزامی است'),
    'phone-number': z
      .string()
      .min(1, 'شماره تلفن الزامی است')
      .regex(phoneRegex, 'شماره تلفن وارد شده معتبر نیست'),

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

export type RegisterSchema = z.infer<typeof registerSchema>;
