import { z } from 'zod';
import { phoneRegex } from '../utils/regex.ytils';

export const registerSchema = z.object({
  full_name: z.string().trim().min(1, 'وارد کردن نام الزامی است'),
  avatar_media_id: z.string().trim(),
  phone_number: z
    .string()
    .min(1, 'شماره تلفن الزامی است')
    .regex(phoneRegex, 'شماره تلفن وارد شده معتبر نیست'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
