'use client';

import { StepTransition } from '@/shared/components/ui/transitions/step-transition';
import { LOGIN_STEPS } from '../../constants/auth.constants';
import { useLoginFlow } from '../../hooks/use-login-flow';
// import { AuthFooterLink } from '../components/auth-footer-link';
// import { CaptchaChallenge } from '../components/captcha-challenge';
import { PhoneNumberForm } from '../forms/phone-number-form';
import { OtpVerificationForm } from '../forms/otp-verification-form';
import { AuthCardLayout } from '../layouts/auth-card-layout';
import { AuthHeader } from '../components/auth-header';

export function LoginContainer() {
  const {
    step,
    currentHeader,
    handleResendOtp,
    goToPreviousStep,
    handleOtpSubmit,
    handlePhoneSubmit,
    isRequestingOtp,
    isVerifyingOtp,
    otpRequestId,
  } = useLoginFlow();

  return (
    <AuthCardLayout
      {...(step !== LOGIN_STEPS.PHONE_NUMBER && {
        onStepBack: goToPreviousStep,
      })}
    >
      <StepTransition stepKey={step}>
        <AuthHeader
          title={currentHeader.title}
          subtitle={currentHeader.subtitle}
        />
        {step === LOGIN_STEPS.PHONE_NUMBER && (
          <>
            <PhoneNumberForm
              onSubmit={handlePhoneSubmit}
              isPending={isRequestingOtp}
            />
          </>
        )}
        {step === LOGIN_STEPS.OTP && (
          <OtpVerificationForm
            onResend={handleResendOtp}
            onSubmit={handleOtpSubmit}
            requestId={otpRequestId}
            isPending={isVerifyingOtp}
            isResendPending={isRequestingOtp}
          />
        )}
      </StepTransition>
    </AuthCardLayout>
  );
}
