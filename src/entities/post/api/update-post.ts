import type { CreatePostDto } from '../schemas/post.schema';
import type { Post } from '../types/post.types';
import { PostApi } from './post.api';

export const updatePost = (
  postId: Post['id'],
  payload: Partial<CreatePostDto>,
) => PostApi.update(postId, payload);
