import { httpClient } from '@/shared/lib/http/http-client';
import { Post } from '../types/post.types';
import { routes } from '../configs/api.routes';

export const PostApi = {
  getById: (id: Post['id']) => httpClient.get<Post>(routes.getPostById(id)),
} as const;
