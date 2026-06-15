import { PostMedia } from '../types/post.types';

export const getMediaUrl = (
  media: PostMedia,
  variant: 'original' | 'thumbnail' = 'original',
): string => {
  return variant === 'thumbnail' && media.thumbnailUrl
    ? media.thumbnailUrl
    : media.url;
};
