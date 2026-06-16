'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { RegisterSchema, registerSchema } from '../../schemas/register.schema';
import { PhoneNumberInput } from '../components/phone-number-input';
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
            name='full_name'
            label='نام خانوادگی'
            error={errors['full_name']?.message}
          />
        </div>
      </div>

      <div className='space-y-1'>
        <PhoneNumberInput
          name='phone_number'
          register={register}
          error={errors['phone_number']?.message}
        />
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? 'در حال ثبت...' : 'ثبت نام'}
      </Button>
    </form>
  );
};
