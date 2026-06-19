'use client';

import axios from 'axios';
import { env } from '@/shared/config/env';
import './interceptors/response.interceptor';
import { setupResponseInterceptor } from './interceptors/response.interceptor';

export const httpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

setupResponseInterceptor(httpClient);
