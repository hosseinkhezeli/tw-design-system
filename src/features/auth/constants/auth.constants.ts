export const OTP_LENGTH = 6;
export const CAPTCHA_LENGTH = 6;
export const MIN_FULLNAME_CHARACTERS = 2;

export const OTP_COOLDOWN_SECONDS = 90;

export const LOGIN_STEPS = {
  PHONE_NUMBER: 'PHONE_NUMBER',
  CAPTCHA: 'CAPTCHA',
  OTP: 'OTP',
} as const;

export type LoginStep = keyof typeof LOGIN_STEPS;

export const LOGIN_BACK_MAP: Record<LoginStep, LoginStep | null> = {
  [LOGIN_STEPS.OTP]: LOGIN_STEPS.PHONE_NUMBER,
  [LOGIN_STEPS.CAPTCHA]: LOGIN_STEPS.PHONE_NUMBER,
  [LOGIN_STEPS.PHONE_NUMBER]: null,
};
