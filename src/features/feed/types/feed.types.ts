import { Post } from '@/entities/post';

export type FeedPost = Post;

export interface FeedResponse {
  readonly items: readonly FeedPost[];
  readonly total: number;
  readonly offset: number;
  readonly limit: number;
}
