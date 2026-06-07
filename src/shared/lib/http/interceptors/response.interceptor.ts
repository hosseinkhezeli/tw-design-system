// import { routes } from '@/api/authentication/routes';
import { authService } from '@/features/auth/services/auth.service';
import { httpClient } from '../http-client';
import { AxiosError } from 'axios';

httpClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config!;

    const status = error.response?.status;

    const isAuthError = status === 401;

    // const isRefreshRequest = originalRequest?.url?.includes(routes.refresh);
    const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh');

    // blob parsing
    if (
      error.response?.data instanceof Blob &&
      originalRequest?.responseType === 'blob'
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
      await authService.logout();

      return Promise.reject(error);
    }

    if (originalRequest?._retry) {
      return Promise.reject(error);
    }

    if (originalRequest) originalRequest._retry = true;

    try {
      const newAccessToken = await authService.refreshToken();

      originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);

      return httpClient(originalRequest);
    } catch (refreshError) {
      await authService.logout();

      return Promise.reject(refreshError);
    }
  },
);
