'use client';
import dynamic from 'next/dynamic';
import { FC, useCallback, useMemo } from 'react';

import type { Post } from '@/entities/post';

import { FeedListType } from '../types/feed.types';
import { useInfiniteHomeFeedQuery } from '@/features/feed/queries/use-infinite-home-feed-query';
import { MasonryFeedSkeleton } from '@/features/feed/ui/masonry-feed-skeleton';
import { ListFeedSkeleton } from '@/features/feed/ui/list-feed-skeleton';
import { VirtualListProps } from '@/shared/ui/virtual-list';
import { MasonryListProps } from '@/shared/ui/masonry';

type Props = {
  listType: FeedListType;
};

const ListFeedItem = dynamic(() =>
  import('@/features/feed/ui/list-feed-item').then((mod) => mod.ListFeedItem),
);

const MasonryFeedItem = dynamic(() =>
  import('@/features/feed/ui/masonry-feed-item').then(
    (mod) => mod.MasonryFeedItem,
  ),
);

const VirtualList = dynamic(
  () => import('@/shared/ui/virtual-list').then((mod) => mod.VirtualList),
  {
    ssr: false,
    loading: () => <ListFeedSkeleton />,
  },
) as FC<VirtualListProps<Post>>;

const MasonryList = dynamic(
  () => import('@/shared/ui/masonry').then((mod) => mod.MasonryList),
  {
    ssr: false,
    loading: () => <MasonryFeedSkeleton />,
  },
) as FC<MasonryListProps<Post>>;

export function FeedList({ listType }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteHomeFeedQuery();

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const getItemId = useCallback(
    (index: number) => posts[index]?.id ?? index,
    [posts],
  );

  if (isLoading) {
    return listType === 'masonry' ? (
      <MasonryFeedSkeleton />
    ) : (
      <ListFeedSkeleton />
    );
  }

  if (listType === 'list') {
    return (
      <VirtualList
        items={posts}
        totalCount={posts.length}
        getItemId={getItemId}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={handleLoadMore}
        renderItem={({ item }) => <ListFeedItem post={item} />}
      />
    );
  }

  return (
    <MasonryList
      items={posts}
      totalCount={posts.length}
      getItemId={getItemId}
      hasMore={hasNextPage}
      isLoadingMore={isFetchingNextPage}
      onLoadMore={handleLoadMore}
      renderItem={({ index, item }) => (
        <MasonryFeedItem post={item} index={index} />
      )}
    />
  );
}
