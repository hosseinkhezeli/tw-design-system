'use client';

import { Post } from '@/entities/post';
import { mockPosts } from '@/entities/post/mock/post.mock';
import { useFeedQuery } from '@/features/feed/queries/use-feed-query';
import { FeedItem } from '@/features/feed/ui/feed-item';
import { MasonryFeed } from '@/shared/ui/masonry';
import { MasonryList } from '@/shared/ui/masonry/ui/masonry-list';

export function FeedList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFeedQuery();

  const posts = mockPosts;

  return (
    <MasonryList
      items={posts}
      renderItem={({ index, item }) => {
        return <FeedItem post={item} index={index} />;
      }}
      getItemId={(index) => {
        return mockPosts[index].id;
      }}
      totalCount={mockPosts.length}
    />
  );
}
