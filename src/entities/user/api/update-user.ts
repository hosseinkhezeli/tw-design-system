import { UpdateProfileDto } from '../schemas/user.schema';
import { UserApi } from './user.api';

export const updateUser = async (data: UpdateProfileDto) => {
  return UserApi.update(data);
};
