'use client';

import { StepTransition } from '@/shared/components/ui/transitions/step-transition';
import { REGISTER_STEPS } from '../../constants/auth.constants';
import { useRegisterFlow } from '../../hooks/use-register-flow';
import { AuthFooterLink } from '../components/auth-footer-link';
import { CaptchaChallenge } from '../components/captcha-challenge';
import { OtpVerificationForm } from '../forms/otp-verification-form';
import { RegisterInfoForm } from '../forms/register-info-form';
import { AuthCardLayout } from '../layouts/auth-card-layout';
import { AuthHeader } from '../components/auth-header';

export function RegisterContainer() {
  const {
    step,
    currentHeader,
    isRegisterPending,
    isOtpLoading,
    handleInfoSubmit,
    handleCaptchaSuccess,
    handleOtpComplete,
    handleResendOtp,
    registeredPhoneNumber,
    handleStepBack,
  } = useRegisterFlow();

  return (
    <AuthCardLayout
      {...(step !== REGISTER_STEPS.USER_INFO && {
        onStepBack: handleStepBack,
      })}
    >
      <StepTransition stepKey={step}>
        <AuthHeader
          title={currentHeader.title}
          subtitle={currentHeader.subtitle}
        />
        {step === REGISTER_STEPS.USER_INFO && (
          <>
            <RegisterInfoForm
              onSubmit={handleInfoSubmit}
              isPending={isRegisterPending}
            />
            <AuthFooterLink
              text='قبلاً ثبت‌نام کردی؟'
              actionLabel='وارد شو!'
              action='login'
            />
          </>
        )}

        {step === REGISTER_STEPS.CAPTCHA && (
          <CaptchaChallenge onSuccess={handleCaptchaSuccess} />
        )}

        {step === REGISTER_STEPS.OTP && (
          <OtpVerificationForm
            phoneNumber={registeredPhoneNumber}
            onSubmit={handleOtpComplete}
            onResend={handleResendOtp}
            isPending={isOtpLoading}
            isResendPending={isOtpLoading}
          />
        )}
      </StepTransition>
    </AuthCardLayout>
  );
}
