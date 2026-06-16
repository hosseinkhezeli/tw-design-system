import { z } from 'zod';
import { phoneRegex } from '../utils/regex.ytils';
import { OTP_LENGTH } from '../constants/auth.constants';

export const otpSchema = z.object({
  otp_code: z
    .string()
    .min(1, 'وارد کردن کد ارسالی الزامی است')
    .min(OTP_LENGTH, 'کد رو به طور کامل وارد کن'),
  phone_number: z
    .string()
    .min(1, 'شماره تلفن الزامی است')
    .regex(phoneRegex, 'شماره تلفن وارد شده معتبر نیست'),
});

export type OtpSchema = z.infer<typeof otpSchema>;
