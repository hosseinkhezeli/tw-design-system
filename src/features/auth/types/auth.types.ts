export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  full_name?: string;
  phone_number?: string;
}

export interface AuthSession {
  user: AuthUser;
  tokens: AuthTokens;
  new_user: boolean;
}

export interface CaptchaRes {
  captcha_base64: string;
  captcha_request_id: string;
}

export interface RequestOtpRes {
  expires_in: number;
  request_id: string;
}

