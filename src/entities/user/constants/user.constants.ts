export const UserConstants = {
  MAX_BIO_LENGTH: 500,
  MAX_INTERESTS: 15,
  DEFAULT_AVATAR_URL: '/assets/images/default-avatar.png',
  USERNAME_REGEX: /^[a-zA-Z0-9_]+$/,
} as const;

export enum UserVerificationStatus {
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
}
