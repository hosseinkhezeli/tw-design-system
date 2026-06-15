import { Post } from '../types/post.types';

export const routes = {
  getPostById: (postId: Post['id']) => `/posts/${postId}/`,
  create: '/posts/',
  toggleLike: (postId: Post['id']) => `/posts/${postId}/like/`,
  update: (postId: Post['id']) => `/posts/${postId}/`,
};
