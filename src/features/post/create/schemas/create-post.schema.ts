import { z } from 'zod';
import { CreatePostSchema } from '@/entities/post/schemas/post.schema';

export const CreatePostFormSchema = CreatePostSchema.extend({
  mediaFiles: z.array(z.instanceof(File)).min(1).max(10),
});

export type CreatePostFormDto = z.infer<typeof CreatePostFormSchema>;
