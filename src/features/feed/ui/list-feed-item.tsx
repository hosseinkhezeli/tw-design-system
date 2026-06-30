import { MEDIA_ASPECT_RATIO } from '@/entities/media/constants/media.constants';
import { UserBadge } from '@/entities/user/ui/user-badge/user-badge';
import { LikePostButton } from '@/features/post/like/ui/like-post-button';
import { PostCardFull } from '@/entities/post/ui/post-card-full/post-card-full';
import { FeedPost } from '../types/feed.types';
import { PostMediaInteraction } from '@/features/post-media-interactions/ui/post-media-interaction';

export function ListFeedItem({ post }: { post: FeedPost }) {
  const aspectRatio = MEDIA_ASPECT_RATIO.FRAME_ROTATED;
  const height = 333;
  return (
    <PostCardFull
      key={post?.id}
      post={post}
      authorSlot={<UserBadge user={post?.author} size={'lg'} />}
      actionSlot={
        <LikePostButton
          postId={post?.id}
          initialIsLiked={post?.viewer?.isLiked}
          initialLikesCount={post?.likesCount}
        />
      }
      mediaSlot={
        <PostMediaInteraction
          post={post}
          imageAspectRatio={aspectRatio}
          imageHeight={height}
        />
      }
    />
  );
}
