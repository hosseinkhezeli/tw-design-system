export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthUser {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
}

export interface AuthSession {
  user: AuthUser;
  tokens: AuthTokens;
}
