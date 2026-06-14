/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
