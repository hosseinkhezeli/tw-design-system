import { z } from 'zod';

export const registerSchema = z.object({
  full_name: z.string().trim().min(1, 'وارد کردن نام الزامی است'),
  avatar_media_id: z.string().trim(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
