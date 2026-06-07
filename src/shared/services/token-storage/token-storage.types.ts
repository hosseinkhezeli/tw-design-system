export type RefreshTokenStorage = {
  getRefreshToken(): Promise<string | null>;

  setRefreshToken(token: string): Promise<void>;

  clear(): Promise<void>;
};
