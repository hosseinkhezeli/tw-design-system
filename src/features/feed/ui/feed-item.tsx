import { Post, PostCard } from '@/entities/post';
import { FeedPost } from '../api/types';

export function FeedItem({ post }: { post: FeedPost }) {
  return <PostCard post={post as unknown as Post} />;
}
