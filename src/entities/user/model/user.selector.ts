import { User } from '../types/user.types';

export const UserSelectors = {
  getDisplayName: (user: User): string => user.fullName || `@${user.username}`,

  getFollowerCountLabel: (user: User): string =>
    user.followersCount.toLocaleString(),

  hasInterests: (user: User): boolean => user.interests.length > 0,
} as const;
