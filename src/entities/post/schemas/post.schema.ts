import { z } from 'zod';
import { POST_TYPE, POST_VISIBILITY } from '../constants/post.constants';
import { MEDIA_TYPE } from '@/entities/media';

export const PostSchema = z.object({
  id: z.uuid(),
  authorId: z.uuid(),
  caption: z.string().max(2200).optional(),
  media: z
    .array(
      z.object({
        id: z.string(),
        url: z.url(),
        type: z.enum(MEDIA_TYPE),
        width: z.number().positive(),
        height: z.number().positive(),
      }),
    )
    .min(1),
  type: z.enum(POST_TYPE),
  likesCount: z.number().nonnegative(),
  commentsCount: z.number().nonnegative(),
  visibility: z.enum(POST_VISIBILITY).default(POST_VISIBILITY.PUBLIC),
});

export const CreatePostSchema = z.object({
  caption: z.string().max(2200).optional(),
  tags: z.array(z.string().min(1).max(30)).max(15).default([]).optional(),
  location: z.string().max(100).optional(),
  visibility: z.enum(POST_VISIBILITY).default(POST_VISIBILITY.PUBLIC),
});

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
