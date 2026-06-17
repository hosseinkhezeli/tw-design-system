import { useState, useMemo, useCallback } from 'react';
import {
  LOGIN_BACK_MAP,
  LOGIN_STEPS,
  LoginStep,
} from '../constants/auth.constants';

import { useLogin } from '../mutations/use-login';
import { LoginSchema } from '../schemas/login.schema';
import { useLoginRequestOtp } from '../mutations/use-login-request-otp';
import { LoginRequestOtpSchema } from '../schemas/login-request-otp.schema';
import { navigation } from '@/shared/services/navigation';

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

      try {
        await requestOtp(values, {
          onSuccess: (res) => {
            setOtpRequestId(res?.request_id ?? null);
          },
          onSettled: () => {
            setStep(LOGIN_STEPS.OTP);
          },
        });
      } catch (error) {
        console.error('Failed to request OTP:', error);
      }
    },
    [requestOtp],
  );

  const handleResendOtp = useCallback(async () => {
    if (!phoneNumber) return;
    await handlePhoneSubmit({ phone_number: phoneNumber });
  }, [phoneNumber, handlePhoneSubmit]);

  const handleOtpSubmit = async (values: LoginSchema) => {
    try {
      await verifyOtp(values, {
        onSuccess: (res) => {
          const { new_user } = res ?? {};
          if (!new_user) {
             navigation.goToRegister();
             return;
          }
          navigation.goToExplore();
        },
      });
    } catch (error) {
      console.error('OTP verification failed:', error);
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
