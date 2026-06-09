'use client';

import { useState } from 'react';
import { AuthFooterLink } from '../components/auth-footer-link';
import { AuthHeader } from '../components/auth-header';
import { LoginCredentialsForm } from '../forms/login-credentials-form';
import { useLogin } from '../hooks/use-login';
import { LoginOtpForm } from '../forms/login-otp-form';

export function LoginContainer() {
  const loginMutation = useLogin();

  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');

  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className='mx-auto flex min-h-svh max-w-md flex-col justify-center gap-8 px-6'>
      <AuthHeader
        title='خوش اومدی 👋'
        description='برای ادامه وارد حساب کاربری خودت شو.'
      />
      {step === 'credentials' ? (
        <LoginCredentialsForm
          isPending={loginMutation.isPending}
          onSubmit={(values) => {
            loginMutation.mutate(values);
            setStep('otp');
            setPhoneNumber(values['phone-number']);
          }}
        />
      ) : (
        <LoginOtpForm
          mobile={phoneNumber}
          remainingSeconds={90}
          onSubmit={(code) => {
            console.log(code);
          }}
          onResend={() => {
            console.log('resend');
          }}
        />
      )}

      <AuthFooterLink
        text='حساب کاربری نداری؟'
        actionLabel='ثبت‌نام کن!'
        action={'sign-up'}
      />
    </div>
  );
}
