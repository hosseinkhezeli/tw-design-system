import { User } from '../types/user.types';

export const routes = {
  getUser: (userId: User['id']) => `/users/${userId}`,
  unfollow: (userId: User['id']) => `/users/${userId}/unfollow`,
  follow: (userId: User['id']) => `/users/${userId}/follow`,
  update: `/users/me`,
};
