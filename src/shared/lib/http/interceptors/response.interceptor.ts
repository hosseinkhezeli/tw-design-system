import axios, { AxiosInstance, AxiosError } from 'axios';
import { env } from '@/shared/config/env';

let refreshPromise: Promise<void> | null = null;

export const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;
      if (!originalRequest) return Promise.reject(error);

      const status = error.response?.status;
      const isAuthError = status === 401;
      const isRefreshRequest = originalRequest.url?.includes('/auth/refresh');

      if (
        error.response?.data instanceof Blob &&
        originalRequest.responseType === 'blob'
      ) {
        try {
          const text = await error.response.data.text();
          error.response.data = JSON.parse(text);
        } catch {}
      }

      if (!isAuthError) {
        return Promise.reject(error);
      }

      if (isRefreshRequest) {
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            await axios.post(
              '/auth/refresh',
              {},
              {
                baseURL: env.NEXT_PUBLIC_API_URL,
                withCredentials: true,
              },
            );
          } catch (refreshError) {
            if (typeof window !== 'undefined') window.location.href = '/login';
            throw refreshError;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      try {
        await refreshPromise;
        return instance(originalRequest);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    },
  );
};
