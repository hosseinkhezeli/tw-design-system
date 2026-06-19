'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { TextInput } from '../components/text-input';
import { RegisterAvatarInput } from '../components/register-avatar-input';

import {
  RegisterFormValues,
  registerFormSchema,
} from '../../schemas/register.schema';

type Props = {
  onSubmit: (values: RegisterFormValues) => void;
  isPending?: boolean;
};

export const RegisterInfoForm = ({ onSubmit, isPending }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 items-center justify-center flex flex-col px-2 gap-4'
    >
      <RegisterAvatarInput name='avatar' register={register} />

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
