import { CheckUsernameReq } from '../types/username.types';

export const usernameMocks = {
  check_username: (payload: CheckUsernameReq) => {
    console.log('Check username:', payload.username);
    return true;
  },
};
