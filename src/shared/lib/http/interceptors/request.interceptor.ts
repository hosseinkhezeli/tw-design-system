import { authService } from '@/features/auth/services/auth.service';
import { httpClient } from '../http-client';


httpClient.interceptors.request.use((config) => {
  const token = authService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
