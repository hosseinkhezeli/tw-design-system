'use client';

import { useState, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { navigation } from '@/shared/services/navigation';
import {
  LoginStep,
  LOGIN_STEPS,
  LOGIN_BACK_MAP,
} from '@/features/auth/constants/auth.constants';
import { useLogin } from '@/features/auth/mutations/use-login';
import { useLoginRequestOtp } from '@/features/auth/mutations/use-login-request-otp';
import { LoginRequestOtpSchema } from '@/features/auth/schemas/login-request-otp.schema';
import { LoginSchema } from '@/features/auth/schemas/login.schema';

export const useLoginFlow = () => {
  const [step, setStep] = useState<LoginStep>(LOGIN_STEPS.PHONE_NUMBER);

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [otpRequestId, setOtpRequestId] = useState<string | null>(null);

  const { mutateAsync: requestOtp, isPending: isRequestingOtp } =
    useLoginRequestOtp();

  const { mutateAsync: verifyOtp, isPending: isVerifyingOtp } = useLogin();

  const handlePhoneSubmit = useCallback(
    async (values: LoginRequestOtpSchema) => {
      setPhoneNumber(values.phone_number);
      toast.loading('در حال ارسال کد تایید...', { id: 'login-flow' });

      try {
        const res = await requestOtp(values);

        setOtpRequestId(res?.request_id ?? null);
        setStep(LOGIN_STEPS.OTP);

        toast.success('کد تایید ارسال شد 📩', { id: 'login-flow' });
      } catch (error) {
        console.error('Failed to request OTP:', error);
        toast.error('ارسال کد با خطا مواجه شد.', {
          id: 'login-flow',
          description:
            error instanceof Error ? error.message : 'لطفا دوباره تلاش کنید',
        });
      }
    },
    [requestOtp],
  );

  const handleResendOtp = useCallback(async () => {
    if (!phoneNumber) return;
    // The toast notifications inside handlePhoneSubmit will automatically handle UI feedback here
    await handlePhoneSubmit({ phone_number: phoneNumber });
  }, [phoneNumber, handlePhoneSubmit]);

  const handleOtpSubmit = async (values: LoginSchema) => {
    toast.loading('در حال بررسی کد...', { id: 'login-flow' });

    try {
      const res = await verifyOtp(values);
      const { new_user } = res ?? {};

      toast.success('ورود موفقیت‌آمیز! 🚀', { id: 'login-flow' });

      // Note: Double check this routing logic with your backend response.
      // Usually `new_user: true` means they need to register.
      if (!new_user) {
        navigation.goToRegister();
        return;
      }

      navigation.goToExplore();
    } catch (error) {
      console.error('OTP verification failed:', error);
      toast.error('کد وارد شده نامعتبر است.', {
        id: 'login-flow',
        description: 'لطفا کد را بررسی کرده و مجدد تلاش کنید.',
      });
    }
  };

  const currentHeader = useMemo(() => {
    const headers: Record<LoginStep, { title: string; subtitle: string }> = {
      [LOGIN_STEPS.PHONE_NUMBER]: {
        title: 'خوش اومدی 👋',
        subtitle: 'برای ادامه وارد حساب کاربری خودت شو.',
      },
      [LOGIN_STEPS.CAPTCHA]: {
        title: 'اعتبارسنجی امنیتی 🤖',
        subtitle: 'متن داخل تصویر رو وارد کن',
      },
      [LOGIN_STEPS.OTP]: {
        title: 'کد تایید 🔑',
        subtitle: `کد ارسال‌شده به شماره ${phoneNumber} را وارد کن.`,
      },
    };
    return headers[step];
  }, [step, phoneNumber]);

  const goToPreviousStep = () => {
    const previousStep = LOGIN_BACK_MAP[step];
    if (previousStep) setStep(previousStep);
  };

  return {
    step,
    phoneNumber,
    otpRequestId,

    isRequestingOtp,
    isVerifyingOtp,

    handlePhoneSubmit,
    handleOtpSubmit,
    handleResendOtp,
    goToPreviousStep,

    currentHeader,
  };
};
