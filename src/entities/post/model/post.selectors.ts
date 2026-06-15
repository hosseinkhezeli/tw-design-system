import type { Post } from '../types/post.types';

export const PostSelectors = {
  getLikeCountLabel: (post: Post): string => post.likesCount.toLocaleString(),

  getEngagementScore: (post: Post): number =>
    post.likesCount + post.commentsCount * 2 + post.sharesCount * 3,

  hasCaption: (post: Post): boolean => !!post.caption?.trim(),
} as const;
