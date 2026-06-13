'use client';

import { StepTransition } from '@/shared/components/ui/transitions/step-transition';
import { LOGIN_STEPS } from '../constants/auth.constants';
import { useLoginFlow } from '../hooks/use-login-flow';
import { AuthFooterLink } from '../ui/components/auth-footer-link';
import { CaptchaChallenge } from '../ui/components/captcha-challenge';
import { LoginCredentialsForm } from '../ui/forms/login-credentials-form';
import { OtpVerificationForm } from '../ui/forms/otp-verification-form';
import { AuthCardLayout } from '../ui/layouts/auth-card-layout';
import { AuthHeader } from '../ui/components/auth-header';

export function LoginContainer() {
  const {
    step,
    currentHeader,
    isLoginPending,
    isOtpLoading,
    handleCredentialsSubmit,
    handleCaptchaSuccess,
    handleOtpComplete,
    handleResendOtp,
    phoneNumber,
    handleStepBack,
  } = useLoginFlow();

  return (
    <AuthCardLayout
      {...(step !== LOGIN_STEPS.CREDENTIALS && {
        onStepBack: handleStepBack,
      })}
    >
      <StepTransition stepKey={step}>
        <AuthHeader
          title={currentHeader.title}
          subtitle={currentHeader.subtitle}
        />
        {step === LOGIN_STEPS.CREDENTIALS && (
          <>
            <LoginCredentialsForm
              onSubmit={handleCredentialsSubmit}
              isPending={isLoginPending}
            />
            <AuthFooterLink
              text='حساب کاربری نداری؟'
              actionLabel='ثبت‌نام کن!'
              action='register'
            />
            <AuthFooterLink
              text='گذرواژه‌ات رو یادت رفته؟'
              actionLabel='بیا اینجا!'
              action='forgot-password'
            />
          </>
        )}

        {step === LOGIN_STEPS.CAPTCHA && (
          <CaptchaChallenge onSuccess={handleCaptchaSuccess} />
        )}

        {step === LOGIN_STEPS.OTP && (
          <OtpVerificationForm
            onSubmit={handleOtpComplete}
            onResend={handleResendOtp}
            isPending={isOtpLoading}
            isResendPending={isOtpLoading}
            phoneNumber={phoneNumber}
          />
        )}
      </StepTransition>
    </AuthCardLayout>
  );
}
