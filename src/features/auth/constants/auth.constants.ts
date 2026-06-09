export const OTP_LENGTH = 6;

export const OTP_COOLDOWN_SECONDS = 90;

export const OTP_STORAGE_KEY = 'auth:otp-cooldown';

export const PASSWORD_MIN_LENGTH = 8;

export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  CHANGE_PASSWORD: '/account/change-password',
} as const;
