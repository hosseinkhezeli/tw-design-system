'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { OtpInput } from '../components/otp-input';
import { OtpCountdown } from '../components/otp-countdown';
import { OTP_LENGTH } from '../../constants/auth.constants';
import { LoginSchema, loginSchema } from '../../schemas/login.schema';

interface OtpVerificationFormProps {
  isPending?: boolean;
  isResendPending?: boolean;
  onSubmit: (values: LoginSchema) => void;
  onResend: () => void;
  requestId: string | null;
}

export function OtpVerificationForm({
  isPending,
  isResendPending,
  onSubmit,
  onResend,
  requestId,
}: OtpVerificationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      otp: '',
      request_id: requestId ?? '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col px-2 gap-4 w-full'
    >
      <OtpInput
        name='otp'
        register={register}
        error={errors.otp?.message}
        maxLength={OTP_LENGTH}
      />
      <div className='flex justify-center'>
        <OtpCountdown isPending={isResendPending} onResend={onResend} />
      </div>
      <Button
        type='submit'
        className='w-full'
        isLoading={isPending}
        disabled={isPending || isResendPending}
      >
        {isPending ? 'در حال ورود...' : 'تأیید و ورود'}
      </Button>
    </form>
  );
}
