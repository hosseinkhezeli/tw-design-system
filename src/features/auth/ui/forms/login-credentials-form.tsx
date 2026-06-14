'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PasswordInput } from '../components/password-input';
import { Button } from '@/shared/components/ui/button';
import { LoginSchema, loginSchema } from '../../schemas/login.schema';
import { PhoneNumberInput } from '../components/phone-number-input';

type Props = {
  onSubmit: (values: LoginSchema) => void;
  isPending: boolean;
};

export function LoginCredentialsForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      'phone-number': '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-6'
    >
      <PhoneNumberInput
        name='phone-number'
        register={register}
        error={errors['phone-number']?.message}
      />

      <Button type='submit' className='w-full' isLoading={isSubmitting}>
        {isSubmitting ? 'در حال ورود...' : 'ورود'}
      </Button>
    </form>
  );
}
