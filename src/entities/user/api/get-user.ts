import { User } from '../types/user.types';
import { UserApi } from './user.api';

export const getUser = async (userId: User['id']) => {
  return UserApi.getById(userId);
};
