'use client';
import { Button } from '@/shared/components/ui/button';
import { useEffect, useState } from 'react';
import { OTP_COOLDOWN_SECONDS } from '../../constants/auth.constants';

interface OtpCountdownProps {
  isPending?: boolean;
  onResend?: () => void;
}

export function OtpCountdown({ isPending, onResend }: OtpCountdownProps) {
  const [remainingSeconds, setRemainingSeconds] =
    useState(OTP_COOLDOWN_SECONDS);
  const canResend = remainingSeconds <= 0;

  useEffect(() => {
    if (remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(interval);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds]);

  const handleResend = () => {
    onResend?.();
    setRemainingSeconds(OTP_COOLDOWN_SECONDS);
  };

  if (canResend) {
    return (
      <Button
        type='button'
        variant='link'
        className='h-auto p-0'
        disabled={isPending}
        onClick={handleResend}
      >
        ارسال مجدد کد
      </Button>
    );
  }

  return (
    <p className='text-muted-foreground text-sm'>
      ارسال مجدد تا {remainingSeconds} ثانیه دیگر
    </p>
  );
}
