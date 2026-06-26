import { Post } from '@/entities/post';

export type FeedPost = Post;

export type FeedPage = {
  items: FeedPost[];
  nextCursor: string | null;
};
