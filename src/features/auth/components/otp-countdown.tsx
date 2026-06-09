'use client';

import { Button } from '@/shared/components/ui/button';

interface OtpCountdownProps {
  remainingSeconds: number;
  isPending?: boolean;
  onResend?: () => void;
}

export function OtpCountdown({
  remainingSeconds,
  isPending,
  onResend,
}: OtpCountdownProps) {
  const canResend = remainingSeconds <= 0;

  if (canResend) {
    return (
      <Button
        type='button'
        variant='link'
        className='h-auto p-0'
        disabled={isPending}
        onClick={onResend}
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
