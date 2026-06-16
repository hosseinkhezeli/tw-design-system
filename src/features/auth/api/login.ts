import { LoginSchema } from './../schemas/login.schema';
import type { AuthSession } from '../types/auth.types';

export async function login(payload: LoginSchema): Promise<AuthSession> {
  const AuthTokens: AuthSession['tokens'] = {
    access_token: 'Bearer test_access_token',
    refresh_token: 'Bearer test_refresh_token',
  };

  const AuthUser: AuthSession['user'] = {
    id: 'uuid',
    phone_number: '',
    full_name: '',
  };

  const AuthSession: AuthSession = {
    user: AuthUser,
    tokens: AuthTokens,
    new_user: true,
  };
  Promise.allSettled([() => setTimeout(() => true, 1500)]);
  return AuthSession;
  // throw new Error('Not implemented');
}
