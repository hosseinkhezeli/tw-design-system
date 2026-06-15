import { uploadMedia } from '@/entities/media';
import { createPost } from '@/entities/post';

export const CreatePostApi = {
  uploadMedia: uploadMedia,
  create: createPost,
} as const;
