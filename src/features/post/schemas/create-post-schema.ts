import { z } from 'zod';
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from '../constants/post.constants';

export const mediaItemSchema = z.object({
  file: z
    .instanceof(File, { message: 'فایل نامعتبر است' })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      'حجم فایل نباید بیشتر از ۵ مگابایت باشد',
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'فقط فرمت‌های JPG, PNG و WebP پشتیبانی می‌شوند',
    ),

  type: z.enum(['IMAGE', 'VIDEO']).default('IMAGE'),

  previewUrl: z.string().optional(),
});
export const createPostSchema = z.object({
  media: z
    .array(mediaItemSchema)
    .min(1, 'انتخاب حداقل یک تصویر الزامی است')
    .max(1, 'در نسخه فعلی، پست‌ها فقط می‌توانند تک‌عکسی باشند'),

  caption: z
    .string()
    .trim()
    .max(2200, 'کپشن نمی‌تواند بیشتر از ۲۲۰۰ کاراکتر باشد')
    .optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type MediaItemFormValues = z.input<typeof mediaItemSchema>;
export type MediaItem = z.output<typeof mediaItemSchema>;
