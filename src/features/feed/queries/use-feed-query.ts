import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeed } from '../api/get-feed';
import { QUERY_KEYS } from '@/shared/config/query-keys';

export function useFeedQuery() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.feed.list(),
    queryFn: async ({ pageParam }) => await getFeed(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
