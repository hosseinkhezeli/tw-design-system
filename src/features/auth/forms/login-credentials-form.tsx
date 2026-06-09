'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '../schemas/login.schema';
import { PasswordInput } from '../components/password-input';
import { Button } from '@/shared/components/ui/button';

import { LoginFormValues } from '../types/auth.types';
import { PhoneNumberInput } from '../components/phone-number-input';

type Props = {
  onSubmit: (values: LoginFormValues) => void;
  isPending: boolean;
};

export function LoginCredentialsForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      'phone-number': '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
      <PhoneNumberInput
        name='phone-number'
        register={register}
        error={errors['phone-number']?.message}
      />

      <PasswordInput
        name='password'
        register={register}
        error={errors.password?.message}
      />

      <Button
        type='submit'
        className='w-full'
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? 'در حال ورود...' : 'ورود'}
      </Button>
    </form>
  );
}
