import { Post } from '../../types/post.types';
import { PostCaption } from '../post-caption/post-caption';
import { PostMedia } from '../post-media/post-media';

interface PostCardProps {
  readonly post: Post;
  readonly showAuthor?: boolean;
  readonly className?: string;
}

export const PostCard = ({
  post,
  showAuthor = true,
  className,
}: PostCardProps) => (
  <div
    className={`border border-border rounded-3xl overflow-hidden bg-card ${className || ''}`}
  >
    {showAuthor && (
      <div className='flex items-center gap-3 p-4 border-b'>
        {/* Author info would come from joined user data */}
        <div className='font-semibold'>@{post.authorId}</div>
      </div>
    )}

    <PostMedia media={post.media} type={post.type} />

    <div className='p-4'>
      <PostCaption caption={post.caption} />
      {/* Stats, actions would be in features/post/interact */}
    </div>
  </div>
);
