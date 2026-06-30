import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/config/query-keys';
import { getHomeFeed } from '../api/get-home-feed';
import { FEED_PAGE_SIZE } from '../constants/feed.constants';

export function useInfiniteHomeFeedQuery() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.feed.list(),

    initialPageParam: 0,

    queryFn: async ({ pageParam }) => {
      return getHomeFeed({
        offset: pageParam,
        limit: FEED_PAGE_SIZE,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce(
        (acc, page) => acc + page.items.length,
        0,
      );
      const next = loadedItems >= lastPage.total ? undefined : loadedItems;

      return next;
    },
  });
}
