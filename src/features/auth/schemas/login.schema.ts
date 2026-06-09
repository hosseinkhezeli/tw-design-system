import { z } from 'zod';
import { phoneRegex } from '../utils/regex.ytils';

export const loginSchema = z.object({
  'phone-number': z
    .string()
    .min(1, 'شماره تلفن الزامی است')
    .regex(phoneRegex, 'شماره تلفن وارد شده معتبر نیست'),
  password: z
    .string()
    .min(1, 'گذرواژه الزامی است')
    .min(6, 'گذرواژه باید حداقل ۶ کاراکتر باشد'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
