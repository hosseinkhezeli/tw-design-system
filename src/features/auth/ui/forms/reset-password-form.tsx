'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from '../../schemas/reset-password.schema';
import { PasswordInput } from '../components/password-input';

type Props = {
  onSubmit: (values: ResetPasswordSchema) => void;
  isPending?: boolean;
};

export const ResetPasswordForm = ({ onSubmit, isPending }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 w-full'>
      <div className='space-y-1'>
        <PasswordInput
          name='password'
          register={register}
          label='رمز عبور جدید'
          error={errors?.password?.message}
        />
      </div>
      <div className='space-y-1'>
        <PasswordInput
          name='confirmPassword'
          register={register}
          label='تکرار رمز عبور جدید'
          error={errors?.confirmPassword?.message}
        />
      </div>
      <Button type='submit' className='w-full' isLoading={isPending}>
        {isPending ? 'در حال ذخیره...' : 'تغییر رمز عبور'}
      </Button>
    </form>
  );
};
