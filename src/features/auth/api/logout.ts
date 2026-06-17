import { LogoutSchema } from '../schemas/logout.schema';
import { AuthApi } from './auth.api';

export const logout = async (payload: LogoutSchema) => {
  return AuthApi.logout(payload);
};
