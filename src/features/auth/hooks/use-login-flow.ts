import { useState, useMemo } from 'react';
import { LOGIN_STEPS, LoginStep } from '../constants/auth.constants';
import { useLogin } from '../mutations/use-login';
import { LoginSchema } from '../schemas/login.schema';
import { OtpSchema } from '../schemas/otp.schema';

const LOGIN_BACK_MAP: Record<LoginStep, LoginStep | null> = {
  [LOGIN_STEPS.OTP]: LOGIN_STEPS.CREDENTIALS,
  [LOGIN_STEPS.CAPTCHA]: LOGIN_STEPS.CREDENTIALS,
  [LOGIN_STEPS.CREDENTIALS]: null,
};

export const useLoginFlow = () => {
  const [step, setStep] = useState<LoginStep>(LOGIN_STEPS.CREDENTIALS);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  const { mutateAsync: loginFn, isPending: isLoginPending } = useLogin();

  const handleCredentialsSubmit = async (values: LoginSchema) => {
    try {
      await loginFn(values, {
        onSuccess: () => {
          // در دنیای واقعی این فلگ از بک‌اند می‌آید
          const isRateLimited = Math.random() > 0.7;
          setStep(isRateLimited ? LOGIN_STEPS.CAPTCHA : LOGIN_STEPS.OTP);
          setPhoneNumber(values['phone_number']);
        },
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleCaptchaSuccess = () => setStep(LOGIN_STEPS.OTP);

  const handleOtpComplete = async (values: OtpSchema) => {
    setIsOtpLoading(true);
    setTimeout(() => {
      console.log(
        'Logged in with:',
        values['phone_number'],
        values['otp_code'],
      );
      setIsOtpLoading(false);
    }, 1000);
  };

  const handleResendOtp = () => setStep(LOGIN_STEPS.CAPTCHA);

  const currentHeader = useMemo(() => {
    const headers: Record<LoginStep, { title: string; subtitle: string }> = {
      [LOGIN_STEPS.CAPTCHA]: {
        title: 'اعتبارسنجی امنیتی 🤖',
        subtitle: 'متن داخل تصویر رو وارد کن',
      },
      [LOGIN_STEPS.CREDENTIALS]: {
        title: 'خوش اومدی 👋',
        subtitle: 'برای ادامه وارد حساب کاربری خودت شو.',
      },
      [LOGIN_STEPS.OTP]: {
        title: 'کد تایید 🔑',
        subtitle: `کد ارسال‌شده به شماره ${phoneNumber} را وارد کن.`,
      },
    };
    return headers[step];
  }, [step, phoneNumber]);

  const handleStepBack = () => {
    const previousStep = LOGIN_BACK_MAP[step];
    if (previousStep) {
      setStep(previousStep);
    }
  };

  return {
    step,
    currentHeader,
    isLoginPending,
    isOtpLoading,
    handleCredentialsSubmit,
    handleCaptchaSuccess,
    handleOtpComplete,
    handleResendOtp,
    handleStepBack,
    phoneNumber,
  };
};
