import { POST_VISIBILITY } from '../constants/post.constants';
import type { Post } from '../types/post.types';

export const PostUtils = {
  canBeShared: (post: Post): boolean =>
    post.visibility === POST_VISIBILITY.PUBLIC,

  calculateTotalMediaSize: (post: Post): number => post.media.length,
} as const;
