import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeed } from '../api/get-feed';
import { FeedPage } from '../api/types';

export function useFeedQuery() {
  return useInfiniteQuery({
    queryKey: ['feed'],

    queryFn: ({ pageParam }): Promise<FeedPage> => getFeed(pageParam),

    initialPageParam: null as string | null,

    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
