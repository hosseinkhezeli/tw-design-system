'use client';

import { useFeedQuery } from '@/features/feed/queries/use-feed-query';
import { FeedItem } from '@/features/feed/ui/feed-item';
import { FeedSkeleton } from '@/features/feed/ui/feed-skeleton';
import { VirtualList } from '@/shared/components/virtual-list';

export function FeedList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFeedQuery();

  if (isLoading) {
    return <FeedSkeleton />;
  }

  const posts = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <VirtualList
      items={posts}
      estimateSize={850}
      scrollContainerClassName='h-svh pb-[65px] overflow-y-auto'
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      renderItem={(post) => <FeedItem post={post} />}
    />
  );
}
