export const routes = {
  get_home_feed: '/feed',
  get_my_posts: '/users/me/posts',
  get_saved_posts: '/users/me/saved-posts',
  get_liked_posts: '/users/me/liked-posts',
  get_user_posts: (userId: string) => `/users/${userId}/posts`,
} as const;
