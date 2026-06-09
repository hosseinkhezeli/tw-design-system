export type LoginStep = 'credentials' | 'otp';

export interface LoginState {
  step: LoginStep;
  'phone-number'?: string;
}

export interface LoginFormValues {
  'phone-number': string;
  password: string;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  'phone-number': string;
  password: string;
  confirmPassword: string;
}

export interface OtpFormValues {
  code: string;
}

export interface ForgotPasswordFormValues {
  'phone-number': string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordFormValues {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

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

export type AuthIdentifierType = 'mobile';

export type ForgotPasswordStep =
  | 'phone-number'
  | 'otp'
  | 'reset-password'
  | 'success';

export interface OtpCooldownState {
  expiresAt: number;
}

export interface SendOtpPayload {
  'phone-number': string;
}

export interface VerifyOtpPayload {
  'phone-number': string;
  code: string;
}
