import { mockPosts } from '@/entities/post/mock/post.mock';

import type { FeedResponse } from '../types/feed.types';
import { FeedPaginationSchema } from '../schema/feed.schema';
import { FEED_PAGE_SIZE } from '../constants/feed.constants';

export const feedMocks = {
  get_home_feed: (payload: FeedPaginationSchema): FeedResponse => {
    const { offset, limit } = payload;

    return {
      items: mockPosts?.slice(offset, offset + limit),
      total: mockPosts.length,
      limit: FEED_PAGE_SIZE,
      offset: offset + FEED_PAGE_SIZE,
    };
  },
} as const;
