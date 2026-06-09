'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { OtpInput } from '../components/otp-input';
import { OtpCountdown } from '../components/otp-countdown';

type FormValues = {
  code: string;
};

interface LoginOtpFormProps {
  mobile: string;
  remainingSeconds: number;
  isPending?: boolean;
  isResendPending?: boolean;
  onSubmit: (code: string) => void;
  onResend: () => void;
}

export function LoginOtpForm({
  mobile,
  remainingSeconds,
  isPending,
  isResendPending,
  onSubmit,
  onResend,
}: LoginOtpFormProps) {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      code: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(({ code }) => onSubmit(code))}
      className='space-y-6'
    >
      <div className='space-y-2 text-center'>
        <h2 className='font-semibold'>کد تأیید</h2>

        <p className='text-muted-foreground text-sm'>
          کد ارسال شده به شماره
          <br />
          {mobile}
          <br />
          را وارد کنید.
        </p>
      </div>

      <OtpInput
        name='code'
        watch={watch}
        setValue={setValue}
        error={errors.code?.message}
      />

      <div className='flex justify-center'>
        <OtpCountdown
          remainingSeconds={remainingSeconds}
          isPending={isResendPending}
          onResend={onResend}
        />
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? 'در حال ورود...' : 'تأیید و ورود'}
      </Button>
    </form>
  );
}
