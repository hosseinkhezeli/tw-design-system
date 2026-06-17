'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { RegisterSchema, registerSchema } from '../../schemas/register.schema';
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 flex flex-col px-2 gap-4'
    >
      <TextInput
        register={register}
        name='full_name'
        label='نام و نام خانوادگی'
        error={errors['full_name']?.message}
        helperText='این اسمی هستش که همه روی پروفایل شما میبینن'
      />

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? 'در حال ثبت...' : 'ثبت نام'}
      </Button>
    </form>
  );
};
