import type { AuthSession, LoginFormValues } from '../types/auth.types';

export async function login(payload: LoginFormValues): Promise<AuthSession> {
  throw new Error('Not implemented');
}
