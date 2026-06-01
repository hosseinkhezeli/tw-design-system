export const QUERY_KEYS = {
  feed: ['feed'],
  reels: ['reels'],
  stories: ['stories'],
  shop: ['shop'],
  profile: (id: string) => ['profile', id],
};
