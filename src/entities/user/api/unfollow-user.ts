import { User } from '../types/user.types';
import { UserApi } from './user.api';

export const unfollowUser = (targetUserId: User['id']) =>
  UserApi.unfollow(targetUserId);
