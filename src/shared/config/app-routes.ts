export const APP_ROUTES = {
  categories: '/categories',
  feed: '/feed',
  reels: '/reels',
  explore: '/explore',

  shop: '/shop', // Marketplace

  inbox: '/inbox',
  notifications: '/notifications',

  cart: '/cart',
  wishlist: '/wishlist',
  orders: '/orders',

  settings: '/settings',
  terms: '/terms',
  privacy: '/privacy',

  auth: {
    login: '/login',
    register: '/register',
  },

  profile: {
    me: '/profile/me',
    user: (username: string) => `/profile/${username}`,

    likes: '/profile/likes',
    bookmarks: '/profile/bookmarks',
    comments: '/profile/comments',
    posts: '/profile/posts',
    reports: '/profile/reports',
  },

  seller: {
    dashboard: '/seller',
    orders: '/seller/orders',
    products: '/seller/products',
    analytics: '/seller/analytics',
    inventory: '/seller/inventory',
    discounts: '/seller/discounts',
    settings: '/seller/settings',
  },

  product: {
    detail: (slug: string) => `/shop/product/${slug}`,
  },
} as const;
