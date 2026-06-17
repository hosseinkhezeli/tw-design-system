import { z } from 'zod';
import { phoneRegex } from '../utils/regex.utils';
import { CAPTCHA_LENGTH } from '../constants/auth.constants';

export const loginRequestOtpSchema = z.object({
  phone_number: z
    .string()
    .min(1, 'شماره تلفن الزامی است')
    .regex(phoneRegex, 'شماره تلفن وارد شده معتبر نیست'),
  captcha: z
    .string()
    .min(CAPTCHA_LENGTH, 'وارد کردن کد امنیتی الزامی است')
    .optional(),
  captcha_request_id: z.string().optional(),
});

export type LoginRequestOtpSchema = z.infer<typeof loginRequestOtpSchema>;
