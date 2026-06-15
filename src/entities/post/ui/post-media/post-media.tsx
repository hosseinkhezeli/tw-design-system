import { POST_TYPE } from '../../constants/post.constants';
import type {
  PostType,
  PostMedia as PostMediaType,
} from '../../types/post.types';

interface PostMediaProps {
  readonly media: readonly PostMediaType[];
  readonly type: PostType;
}

export const PostMedia = ({ media, type }: PostMediaProps) => {
  const primary = media[0];

  if (type === POST_TYPE.VIDEO || type === POST_TYPE.REEL) {
    return (
      <video
        src={primary.url}
        controls
        className='w-full aspect-square object-cover'
      />
    );
  }

  return (
    <img
      src={primary.url}
      alt={primary.altText}
      className='w-full aspect-square object-cover'
    />
  );
};
