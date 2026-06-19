'use client';

import { LOGIN_STEPS } from "@/features/auth/constants/auth.constants";
import { AuthHeader } from "@/features/auth/ui/components/auth-header";
import { OtpVerificationForm } from "@/features/auth/ui/forms/otp-verification-form";
import { PhoneNumberForm } from "@/features/auth/ui/forms/phone-number-form";
import { AuthCardLayout } from "@/features/auth/ui/layouts/auth-card-layout";
import { StepTransition } from "@/shared/components/ui/transitions/step-transition";
import { useLoginFlow } from "../hooks/use-login-flow";

// import { AuthFooterLink } from '../components/auth-footer-link';
// import { CaptchaChallenge } from '../components/captcha-challenge';

export function LoginWidget() {
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
