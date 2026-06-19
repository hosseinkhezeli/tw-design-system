import { z } from 'zod';
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from '@/entities/media/constants/media.constants';

export const registerFormSchema = z.object({
  full_name: z.string().min(2, 'نام و نام خانوادگی باید حداقل ۲ حرف باشد'),
  avatar: z
    .file()
    .optional()
    .refine(
      (file: File | undefined) => !file || file?.size <= MAX_FILE_SIZE,
      'حجم تصویر مجاز نیست',
    )
    .refine(
      (file: File | undefined) =>
        !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'فرمت‌های مجاز: jpeg, jpg, png, webp',
    ),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const registerDtoSchema = z.object({
  full_name: z.string(),
  avatar_media_id: z.string().nullable().optional(),
});

export type RegisterDto = z.infer<typeof registerDtoSchema>;
