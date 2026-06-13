'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { OtpInput } from '../components/otp-input';
import { OtpCountdown } from '../components/otp-countdown';
import { OTP_LENGTH } from '../../constants/auth.constants';
import { OtpSchema, otpSchema } from '../../schemas/otp.schema';
import { zodResolver } from '@hookform/resolvers/zod';

interface OtpVerificationFormProps {
  isPending?: boolean;
  isResendPending?: boolean;
  onSubmit: (values: OtpSchema) => void;
  onResend: () => void;
  phoneNumber?: string;
}

export function OtpVerificationForm({
  isPending,
  isResendPending,
  onSubmit,
  onResend,
  phoneNumber,
}: OtpVerificationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      'otp-code': '',
      'phone-number': phoneNumber,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className='space-y-6'
    >
      <OtpInput
        name='otp-code'
        register={register}
        error={errors?.['otp-code']?.message}
        maxLength={OTP_LENGTH}
      />

      <div className='flex justify-center'>
        <OtpCountdown isPending={isResendPending} onResend={onResend} />
      </div>

      <Button type='submit' className='w-full' isLoading={isPending}>
        {isPending ? 'در حال ورود...' : 'تأیید و ورود'}
      </Button>
    </form>
  );
}
