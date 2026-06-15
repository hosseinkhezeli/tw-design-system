import { User } from '../types/user.types';
import { UserApi } from './user.api';

export const followUser = (targetUserId: User['id']) =>
  UserApi.follow(targetUserId);
