/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FeedPage } from '../api/types';

export function updateFeedLike(oldData: any, postId: string): any {
  if (!oldData) return oldData;

  return {
    ...oldData,
    pages: oldData.pages.map((page: FeedPage) => ({
      ...page,
      items: page.items.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes + 1,
              liked: true,
            }
          : post,
      ),
    })),
  };
}
