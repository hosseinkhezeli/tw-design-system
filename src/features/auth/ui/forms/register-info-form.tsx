'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { RegisterSchema, registerSchema } from '../../schemas/register.schema';
import { PhoneNumberInput } from '../components/phone-number-input';
import { PasswordInput } from '../components/password-input';
import { TextInput } from '../components/text-input';

type Props = {
  onSubmit: (values: RegisterSchema) => void;
  isPending?: boolean;
};

export const RegisterInfoForm = ({ onSubmit, isPending }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-1'>
          <TextInput
            register={register}
            name='firstName'
            label='نام'
            error={errors['firstName']?.message}
          />
        </div>
        <div className='space-y-1'>
          <TextInput
            register={register}
            name='lastName'
            label='نام خانوادگی'
            error={errors['lastName']?.message}
          />
        </div>
      </div>

      <div className='space-y-1'>
        <PhoneNumberInput
          name='phone-number'
          register={register}
          error={errors['phone-number']?.message}
        />
      </div>

      <div className='space-y-1'>
        <PasswordInput
          name='password'
          register={register}
          error={errors['password']?.message}
        />
      </div>

      <div className='space-y-1'>
        <PasswordInput
          label='تکرار گذرواژه'
          name='confirmPassword'
          register={register}
          error={errors['confirmPassword']?.message}
        />
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? 'در حال ثبت...' : 'ثبت نام'}
      </Button>
    </form>
  );
};
