'use client';

import { StepTransition } from '@/shared/components/ui/transitions/step-transition';
import { FORGOT_PASSWORD_STEPS } from '../constants/auth.constants';
import { useForgotPasswordFlow } from '../hooks/use-forgot-password-flow';
import { AuthFooterLink } from '../ui/components/auth-footer-link';
import { CaptchaChallenge } from '../ui/components/captcha-challenge';
import { ForgotIdentifierForm } from '../ui/forms/forgot-password-form';
import { OtpVerificationForm } from '../ui/forms/otp-verification-form';
import { ResetPasswordForm } from '../ui/forms/reset-password-form';
import { AuthCardLayout } from '../ui/layouts/auth-card-layout';
import { AuthHeader } from '../ui/components/auth-header';

export function ForgotPasswordContainer() {
  const {
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
  } = useForgotPasswordFlow();

  return (
    <AuthCardLayout
      {...(step !== FORGOT_PASSWORD_STEPS.IDENTIFIER && {
        onStepBack: handleStepBack,
      })}
    >
      <StepTransition stepKey={step}>
        <AuthHeader
          title={currentHeader.title}
          subtitle={currentHeader.subtitle}
        />
        {step === FORGOT_PASSWORD_STEPS.IDENTIFIER && (
          <>
            <ForgotIdentifierForm
              onSubmit={handleIdentifierSubmit}
              isPending={isPending}
            />
            <AuthFooterLink
              text='رمز عبورت رو یادته؟'
              actionLabel='برگرد به صفحه ورود'
              action='login'
            />
          </>
        )}

        {step === FORGOT_PASSWORD_STEPS.CAPTCHA && (
          <CaptchaChallenge onSuccess={handleCaptchaSuccess} />
        )}

        {step === FORGOT_PASSWORD_STEPS.OTP && (
          <OtpVerificationForm
            phoneNumber={phoneNumber}
            onSubmit={handleOtpComplete}
            onResend={handleResendOtp}
            isPending={isPending}
            isResendPending={isPending}
          />
        )}

        {step === FORGOT_PASSWORD_STEPS.RESET_PASSWORD && (
          <ResetPasswordForm
            onSubmit={handleResetPasswordSubmit}
            isPending={isPending}
          />
        )}
      </StepTransition>
    </AuthCardLayout>
  );
}
