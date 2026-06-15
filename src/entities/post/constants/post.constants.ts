export const POST_TYPE = {
  IMAGE: 'IMAGE',
  CAROUSEL: 'CAROUSEL',
  VIDEO: 'VIDEO',
  REEL: 'REEL',
} as const;

export const POST_VISIBILITY = {
  PUBLIC: 'PUBLIC',
  FOLLOWERS_ONLY: 'FOLLOWERS_ONLY',
  PRIVATE: 'PRIVATE',
} as const;

export const POST_CONSTANTS = {
  MAX_CAPTION_LENGTH: 2200,
  MAX_TAGS: 15,
  MAX_MEDIA_PER_POST: 10,
  ALLOWED_MEDIA_TYPES: ['image/jpeg', 'image/png', 'video/mp4'] as const,
} as const;
