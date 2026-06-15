import { httpClient } from '@/shared/lib/http/http-client';
import { Post } from '../types/post.types';
import { routes } from '../configs/api.routes';
import { CreatePostDto } from '../schemas/post.schema';

export const PostApi = {
  getById: (id: Post['id']) => httpClient.get<Post>(routes.getPostById(id)),

  create: (payload: CreatePostDto & { mediaIds: string[] }) => {
    return httpClient.post<Post>(routes.create, payload);
  },

  toggleLike: (postId: Post['id']) =>
    httpClient.post<null>(routes.toggleLike(postId)),

  update: (postId: Post['id'], payload: Partial<CreatePostDto>) =>
    httpClient.patch<Post>(routes.update(postId), payload),
} as const;
