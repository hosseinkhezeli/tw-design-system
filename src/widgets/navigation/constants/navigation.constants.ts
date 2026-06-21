export const NAVIGATION_ITEM_IDS = {
  categories: 'categories',
  profile: 'profile',
  explore: 'explore',
  feed: 'feed',
  'create-content': 'create-content',
  reels: 'reels',
  shop: 'shop',
  inbox: 'inbox',
} as const;

export type NavigationIds =
  (typeof NAVIGATION_ITEM_IDS)[keyof typeof NAVIGATION_ITEM_IDS];
