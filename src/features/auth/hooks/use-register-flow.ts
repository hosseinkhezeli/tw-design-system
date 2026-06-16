'use client';
import { useState, useMemo } from 'react';
import { REGISTER_STEPS, RegisterStep } from '../constants/auth.constants';
import { RegisterSchema } from '../schemas/register.schema';
import { OtpSchema } from '../schemas/otp.schema';

// import { useRegister } from './use_register'; // هوک React Query که بعدا می‌سازیم

const REGISTER_BACK_MAP: Record<RegisterStep, RegisterStep | null> = {
  [REGISTER_STEPS.OTP]: REGISTER_STEPS.USER_INFO,
  [REGISTER_STEPS.CAPTCHA]: REGISTER_STEPS.USER_INFO,
  [REGISTER_STEPS.USER_INFO]: null,
};

export const useRegisterFlow = () => {
  const [step, setStep] = useState<RegisterStep>(REGISTER_STEPS.USER_INFO);
  const [registeredPhoneNumber, setRegisteredPhoneNumber] = useState('');
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isRegisterPending, setIsRegisterPending] = useState(false);
  // const { mutateAsync: registerFn, isPending: isRegisterPending } = useRegister();

  const handleInfoSubmit = async (values: RegisterSchema) => {
    try {
      // شبیه‌سازی درخواست به بک‌اند
      // await registerFn(values);
      const isRateLimited = Math.random() > 0.7;
      setStep(isRateLimited ? REGISTER_STEPS.CAPTCHA : REGISTER_STEPS.OTP);
      setRegisteredPhoneNumber(values['phone_number']);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleCaptchaSuccess = () => setStep(REGISTER_STEPS.OTP);

  const handleOtpComplete = async (values: OtpSchema) => {
    setIsOtpLoading(true);
    // شبیه‌سازی تایید نهایی اکانت
    setTimeout(() => {
      console.log(
        'Registered and verified:',
        values['phone_number'],
        values['otp_code'],
      );
      setIsOtpLoading(false);
    }, 1000);
  };

  const handleResendOtp = () => setStep(REGISTER_STEPS.CAPTCHA);

  const currentHeader = useMemo(() => {
    const headers: Record<RegisterStep, { title: string; subtitle: string }> = {
      [REGISTER_STEPS.CAPTCHA]: {
        title: 'اعتبارسنجی امنیتی 🤖',
        subtitle: 'متن داخل تصویر رو وارد کن',
      },
      [REGISTER_STEPS.USER_INFO]: {
        title: 'عضویت 🌟',
        subtitle: 'مشخصات خودت رو برای شروع وارد کن.',
      },
      [REGISTER_STEPS.OTP]: {
        title: 'تایید شماره 🔑',
        subtitle: `کد ارسال‌شده به شماره ${registeredPhoneNumber} را وارد کن.`,
      },
    };
    return headers[step];
  }, [step, registeredPhoneNumber]);

  const handleStepBack = () => {
    const previousStep = REGISTER_BACK_MAP[step];
    if (previousStep) setStep(previousStep);
  };

  return {
    step,
    currentHeader,
    isRegisterPending,
    isOtpLoading,
    registeredPhoneNumber,
    handleInfoSubmit,
    handleCaptchaSuccess,
    handleOtpComplete,
    handleResendOtp,
    handleStepBack,
  };
};
