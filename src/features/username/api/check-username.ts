import { CheckUsernameReq } from '../types/username.types';
import { UsernameApi } from './username.api';

export const checkUsername = async (payload: CheckUsernameReq) => {
  return UsernameApi.check_username(payload);
};
