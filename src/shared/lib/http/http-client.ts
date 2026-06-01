'use client';

import axios from 'axios';
import { env } from '@/config/env';
import './interceptors/request.interceptor';
import './interceptors/response.interceptor';

export const httpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
