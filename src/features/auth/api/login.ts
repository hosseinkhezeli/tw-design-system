import { LoginSchema } from './../schemas/login.schema';
import type { AuthSession } from '../types/auth.types';

export async function login(payload: LoginSchema): Promise<AuthSession> {
  const AuthTokens = {
    accessToken: '',
    refreshToken: '',
  };

  const AuthUser = {
    id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    mobile: '',
  };

  const AuthSession = {
    user: AuthUser,
    tokens: AuthTokens,
  };
  Promise.allSettled([() => setTimeout(() => true, 1500)]);
  return AuthSession;
  // throw new Error('Not implemented');
}
