'use client';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';

type Props = {
  onSuccess: (token: string) => void;
};

export const CaptchaChallenge = ({ onSuccess }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  // اینجا بعداً پکیج کپچا (مثل Turnstile یا reCAPTCHA) میاد
  // فعلاً برای شبیه‌سازی UI از یک دکمه استفاده می‌کنیم
  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      onSuccess('mock-captcha-token-123');
    }, 1000);
  };

  return (
    <div className='flex flex-col items-center space-y-4 p-4 border border-dashed border-gray-300 rounded-xl bg-white/30'>
      <p className='text-sm text-gray-600 text-center'>
        لطفا تایید کنید که ربات نیستید
      </p>
      <Button
        onClick={handleVerify}
        disabled={isLoading}
        variant='outline'
        className='w-full'
      >
        {isLoading ? 'در حال تایید...' : 'من ربات نیستم'}
      </Button>
    </div>
  );
};
