export const APP_ROUTES = {
  feed: '/feed',
  reels: '/reels',
  explore: '/explore',
  shop: '/shop',
  inbox: '/inbox',
  notifications: '/notifications',

  auth: {
    login: '/login',
    register: '/register',
  },

  profile: {
    me: '/profile/me',
    user: (username: string) => `/profile/${username}`,
  },

  product: {
    detail: (slug: string) => `/shop/product/${slug}`,
  },
} as const;
