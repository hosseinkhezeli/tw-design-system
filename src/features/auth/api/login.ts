import { LoginSchema } from '../schemas/login.schema';
import { AuthApi } from './auth.api';

export const login = async (payload: LoginSchema) => {
  return AuthApi.login(payload);
};
