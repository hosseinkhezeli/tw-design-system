import { z } from 'zod';
import { phoneRegex } from '../utils/regex.ytils';

export const forgotPasswordSchema = z.object({
  'phone-number': z
    .string()
    .min(1, 'شماره تلفن الزامی است')
    .regex(phoneRegex, 'شماره تلفن وارد شده معتبر نیست'),
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
