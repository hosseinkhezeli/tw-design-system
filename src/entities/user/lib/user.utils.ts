import { User } from '../types/user.types';

export const UserUtils = {
  isProfileComplete: (user: User): boolean => {
    return !!(user.bio?.trim() && user.interests.length > 2);
  },

  calculateEngagementScore: (user: User): number => {
    return Math.floor(user.followersCount * 0.6 + user.postsCount * 0.4);
  },
} as const;
