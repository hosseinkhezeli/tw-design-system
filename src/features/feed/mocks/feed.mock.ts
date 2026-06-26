import { Post } from './../../../entities/post/types/post.types';
import type { FeedPage, FeedPost } from '../api/types';

const PAGE_SIZE = 20;

const DATABASE: FeedPost[] = Array.from({ length: 1000 }, (_, i) => {
  return {} as Post;
});

export async function getMockFeed(cursor: string | null) {
  await new Promise((res) => setTimeout(res, 1200));

  const start = cursor === null ? 0 : Number(cursor);

  const items = DATABASE.slice(start, start + PAGE_SIZE);

  const nextIndex = start + PAGE_SIZE;

  return {
    items,
    nextCursor: nextIndex >= DATABASE.length ? null : String(nextIndex),
  } satisfies FeedPage;
}

export async function mockLikePost(postId: string): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  const post = DATABASE.find((post) => post.id === postId);
}
