// Types
export type { User, UserProfile, UserRelation } from './types/user.types';

// Schemas & DTOs
export {
  UserSchema,
  UpdateProfileSchema,
  type UpdateProfileDto,
} from './schemas/user.schema';

// API
export * from './api/get-user';
export * from './api/update-user';
export * from './api/follow-user';
export * from './api/unfollow-user';

// Domain Model
export { UserModel } from './model/user.model';
export { UserSelectors } from './model/user.selector';
export { useUserStore } from './model/user.store';

// UI Components (Primitives only)
export { UserAvatar } from './ui/user-avatar/user-avatar';
export { UserAvatarSkeleton } from './ui/user-avatar/user-avatar.skeleton';
export { UserBio } from './ui/user-bio/user-bio';
export { UserStats } from './ui/user-stats/user-stats';
export { UserStatsList } from './ui/user-stats/user-stats-list';
export { UserCard } from './ui/user-card/user-card';
export { UserInterestTags } from './ui/uesr-interest-tags/user-interest-tags';

// Utilities
export { formatBio } from './lib/format-bio';
export { getFullName } from './lib/get-full-name';
export { UserUtils } from './lib/user.utils';
export {
  UserConstants,
  UserVerificationStatus,
} from './constants/user.constants';
