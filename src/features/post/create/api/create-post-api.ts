import { uploadMedia } from '@/entities/media';
import { Post } from '@/entities/post';
import { CreatePostDto } from '../schemas/create-post.schema';
import { httpClient } from '@/shared/lib/http/http-client';
import { routes } from '../config/api.routes';

export const CreatePostApi = {
  uploadMedia: uploadMedia,
  create: (payload: CreatePostDto & { mediaIds: string[] }) => {
    return httpClient.post<Post>(routes.createPost, payload);
  },
} as const;
