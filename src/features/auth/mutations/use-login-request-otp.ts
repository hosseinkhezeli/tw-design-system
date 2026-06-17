import { useMutation } from '@tanstack/react-query';

import { loginRequestOtp } from '../api/login-request-otp';

export function useLoginRequestOtp() {
  return useMutation({
    mutationFn: loginRequestOtp,
  });
}
