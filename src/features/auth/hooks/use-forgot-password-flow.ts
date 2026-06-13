import { useState, useMemo } from 'react';
import {
  FORGOT_PASSWORD_STEPS,
  ForgotPasswordStep,
} from '../constants/auth.constants';
import { ForgotPasswordSchema } from '../schemas/forgot-password.schema';
import { OtpSchema } from '../schemas/otp.schema';
import { ResetPasswordSchema } from '../schemas/reset-password.schema';

const FORGOT_BACK_MAP: Record<ForgotPasswordStep, ForgotPasswordStep | null> = {
  [FORGOT_PASSWORD_STEPS.RESET_PASSWORD]: FORGOT_PASSWORD_STEPS.IDENTIFIER,
  [FORGOT_PASSWORD_STEPS.OTP]: FORGOT_PASSWORD_STEPS.IDENTIFIER,
  [FORGOT_PASSWORD_STEPS.CAPTCHA]: FORGOT_PASSWORD_STEPS.IDENTIFIER,
  [FORGOT_PASSWORD_STEPS.IDENTIFIER]: null,
};

export const useForgotPasswordFlow = () => {
  const [step, setStep] = useState<ForgotPasswordStep>(
    FORGOT_PASSWORD_STEPS.IDENTIFIER,
  );
  const [phoneNumber, setPhoneNumber] = useState('');

  // این فلگ‌ها بعداً به وضعیت useMutation متصل می‌شن
  const [isPending, setIsPending] = useState(false);

  const handleIdentifierSubmit = async (values: ForgotPasswordSchema) => {
    setIsPending(true);
    // شبیه‌سازی درخواست به سرور
    setTimeout(() => {
      const isRateLimited = Math.random() > 0.7;
      setStep(
        isRateLimited
          ? FORGOT_PASSWORD_STEPS.CAPTCHA
          : FORGOT_PASSWORD_STEPS.OTP,
      );
      setPhoneNumber(values['phone-number']);
      setIsPending(false);
    }, 800);
  };

  const handleCaptchaSuccess = () => setStep(FORGOT_PASSWORD_STEPS.OTP);

  const handleOtpComplete = async (values: OtpSchema) => {
    setIsPending(true);
    // اینجا کد به بک‌اند ارسال می‌شه، توکن موقت (Reset Token) رو می‌گیریم
    setTimeout(() => {
      setStep(FORGOT_PASSWORD_STEPS.RESET_PASSWORD);
      setIsPending(false);
    }, 1000);
  };

  const handleResendOtp = () => setStep(FORGOT_PASSWORD_STEPS.CAPTCHA);

  const handleResetPasswordSubmit = async (values: ResetPasswordSchema) => {
    setIsPending(true);
    // ریکوئست تغییر رمز نهایی با استفاده از توکنی که در مرحله قبل گرفتیم
    setTimeout(() => {
      console.log('Password successfully reset for:', phoneNumber);
      // ریدایرکت کاربر به صفحه لاگین
      // window.location.href = '/login';
      setIsPending(false);
    }, 1000);
  };

  const currentHeader = useMemo(() => {
    const headers: Record<
      ForgotPasswordStep,
      { title: string; subtitle: string }
    > = {
      [FORGOT_PASSWORD_STEPS.IDENTIFIER]: {
        title: 'بازیابی رمز عبور 🔓',
        subtitle: 'شناسه کاربری خودت رو وارد کن',
      },
      [FORGOT_PASSWORD_STEPS.CAPTCHA]: {
        title: 'اعتبارسنجی امنیتی 🤖',
        subtitle: 'متن داخل تصویر رو وارد کن',
      },
      [FORGOT_PASSWORD_STEPS.OTP]: {
        title: 'تایید هویت 🔑',
        subtitle: `کد ارسال‌شده به ${phoneNumber} را وارد کن.`,
      },
      [FORGOT_PASSWORD_STEPS.RESET_PASSWORD]: {
        title: 'رمز عبور جدید ✨',
        subtitle: 'لطفا رمز عبور جدید و امنی انتخاب کن.',
      },
    };
    return headers[step];
  }, [step, phoneNumber]);

  const handleStepBack = () => {
    const previousStep = FORGOT_BACK_MAP[step];
    if (previousStep) setStep(previousStep);
  };

  return {
    step,
    currentHeader,
    isPending,
    phoneNumber,
    handleIdentifierSubmit,
    handleCaptchaSuccess,
    handleOtpComplete,
    handleResendOtp,
    handleResetPasswordSubmit,
    handleStepBack,
  };
};
