import { useEffect } from 'react';

interface UseInfiniteScrollOptions {
  virtualItems: Array<{ originalIndex: number }>;
  totalCount: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  fetchThreshold?: number;
}

export function useInfiniteScroll({
  virtualItems,
  totalCount,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  fetchThreshold = 5,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || virtualItems.length === 0) {
      return;
    }

    const lastVisibleItem = virtualItems[virtualItems.length - 1];

    if (lastVisibleItem.originalIndex >= totalCount - fetchThreshold) {
      fetchNextPage();
    }
  }, [
    virtualItems,
    totalCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    fetchThreshold,
  ]);
}
