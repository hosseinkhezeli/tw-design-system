export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
}

export interface AuthUser {
  id: string;
  full_name?: string;
  phone_number?: string;
}

export interface AuthSession {
  user: AuthUser;
  tokens: AuthTokens;
  new_user: boolean;
}
