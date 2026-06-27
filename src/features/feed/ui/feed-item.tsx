import { MEDIA_ASPECT_RATIO } from '@/entities/media/constants/media.constants';
import { UserBadge } from '@/entities/user/ui/user-badge/user-badge';
import { LikePostButton } from '@/features/post/like/ui/like-post-button';
import { FeedPost } from '../api/types';
import { PostCardFull } from '@/entities/post/ui/post-card-full/post-card-full';

export function FeedItem({ post, index }: { post: FeedPost; index: number }) {
  const isEven = index % 2 === 0;
  const aspectRatio = isEven
    ? MEDIA_ASPECT_RATIO.FRAME
    : MEDIA_ASPECT_RATIO.SQUARE;
  const height = isEven ? 333 : 250;
  return (
    <PostCardFull
      key={post.id}
      post={post}
      imageAspectRatio={aspectRatio}
      imageHeight={height}
      authorSlot={<UserBadge user={post.author} />}
      actionSlot={
        <LikePostButton
          postId={post.id}
          initialIsLiked={post.viewer.isLiked}
          initialLikesCount={post.likesCount}
        />
      }
    />
  );
}
