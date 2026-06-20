import {
  MAX_HASHTAGS,
  MAX_TITLE_CHARACTERS,
} from './../constants/post.constants';
import { z } from 'zod';
import { MAX_CAPTION_CHARACTERS } from '../constants/post.constants';
import { POST_VISIBILITY } from '@/entities/post';

export const createPostSchema = z.object({
  title: z.string().max(MAX_TITLE_CHARACTERS).optional(),
  caption: z.string().max(MAX_CAPTION_CHARACTERS).optional(),
  hashtags: z.array(z.string()).max(MAX_HASHTAGS).default([]).optional(),
  visibility: z
    .enum(POST_VISIBILITY)
    .default(POST_VISIBILITY.PUBLIC)
    .optional(),
});

export type CreatePostDto = z.infer<typeof createPostSchema>;

export const createPostFormSchema = createPostSchema.extend({
  mediaFiles: z.array(z.instanceof(File)).min(1).max(10),
});

export type CreatePostFormDto = z.infer<typeof createPostFormSchema>;
