'use client';

import { Post } from '@/entities/post';
import { mockPosts } from '@/entities/post/mock/post.mock';
import { useFeedQuery } from '@/features/feed/queries/use-feed-query';
import { FeedItem } from '@/features/feed/ui/feed-item';
import { MasonryFeed } from '@/shared/components/masonry';  

export function FeedList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFeedQuery();

  const posts = mockPosts;

  return (
    <MasonryFeed
      items={posts}
      renderItem={({ index, item, measureRef }) => {
        return <FeedItem post={item} index={index} ref={measureRef} />;
      }}
      getItemId={(item) => {
        return item.id;
      }}
      getItemAspectRatio={(item: Post) => {
        return {
          height: 250,
          width: 250,
        };
      }}
    />
  );
}
