export const FEED_LIST_TYPE = {
  LIST: 'list',
  MASONRY: 'masonry',
} as const;

export type FeedListType = (typeof FEED_LIST_TYPE)[keyof typeof FEED_LIST_TYPE];
