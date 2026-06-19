import { z } from 'zod';
// import { POST_VISIBILITY } from '@/entities/post';

export const CreatePostSchema = z.object({
  caption: z.string().max(2200).optional(),
  // tags: z.array(z.string().min(1).max(30)).max(15).default([]).optional(),
  // location: z.string().max(100).optional(),
  // visibility: z.enum(POST_VISIBILITY).default(POST_VISIBILITY.PUBLIC),
});

export type CreatePostDto = z.infer<typeof CreatePostSchema>;

export const CreatePostFormSchema = CreatePostSchema.extend({
  mediaFiles: z.array(z.instanceof(File)).min(1).max(10),
});

export type CreatePostFormDto = z.infer<typeof CreatePostFormSchema>;
