import { RefreshTokenStorage } from './token-storage.types';

const REFRESH_TOKEN_KEY = 'refresh-token';

export class WebTokenStorage implements RefreshTokenStorage {
  async getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  async setRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  async clear() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
