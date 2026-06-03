'use client';

import { VirtualList } from '@/shared/components/virtual-list';

import { useFeedQuery } from '../queries/use-feed-query';
import { PostCard } from './post-card';
import { FeedSkeleton } from './feed-skeleton';

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
      renderItem={(post) => <PostCard post={post} />}
    />
  );
}
