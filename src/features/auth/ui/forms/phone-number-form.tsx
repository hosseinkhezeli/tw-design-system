'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import {
  loginRequestOtpSchema,
  LoginRequestOtpSchema,
} from '../../schemas/login-request-otp.schema';
import { PhoneNumberInput } from '../components/phone-number-input';

type Props = {
  onSubmit: (values: LoginRequestOtpSchema) => void;
  isPending: boolean;
};

export function PhoneNumberForm({ onSubmit, isPending }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequestOtpSchema>({
    resolver: zodResolver(loginRequestOtpSchema),
    defaultValues: { phone_number: '' },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col px-2 gap-4 w-full'
    >
      <PhoneNumberInput
        name='phone_number'
        register={register}
        error={errors.phone_number?.message}
      />
      <Button
        type='submit'
        className='w-full'
        isLoading={isPending || isSubmitting}
      >
        {isPending || isSubmitting ? 'در حال ارسال...' : 'ورود / ثبت نام'}
      </Button>
    </form>
  );
}
