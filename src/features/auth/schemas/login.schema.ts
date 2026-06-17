import { z } from 'zod';
import { OTP_LENGTH } from '../constants/auth.constants';

export const loginSchema = z.object({
  otp: z
    .string()
    .min(1, 'وارد کردن کد ارسالی الزامی است')
    .min(OTP_LENGTH, 'کد رو به طور کامل وارد کن'),
  request_id: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
