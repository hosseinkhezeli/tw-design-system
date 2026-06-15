import type { Post } from '../types/post.types';
import { PostApi } from './post.api';

export const getPost = async (postId: Post['id']) => {
  return PostApi.getById(postId);
};
