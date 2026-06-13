'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from '../../schemas/forgot-password.schema';
import { PhoneNumberInput } from '../components/phone-number-input';

type Props = {
  onSubmit: (values: ForgotPasswordSchema) => void;
  isPending?: boolean;
};

export const ForgotIdentifierForm = ({ onSubmit, isPending }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 w-full'>
      <div className='space-y-1'>
        <PhoneNumberInput
          register={register}
          name='phone-number'
          error={errors?.['phone-number']?.message}
        />
      </div>
      <Button type='submit' className='w-full' isLoading={isPending}>
        {isPending ? 'در حال بررسی...' : 'مرحله بعد'}
      </Button>
    </form>
  );
};
