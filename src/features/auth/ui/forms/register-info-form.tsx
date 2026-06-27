'use client';

import { useUsernameAvailability } from '@/features/username/hooks/use-username-availability';
import { UsernameInput } from '@/features/username/ui/components/username-input';
import { Button } from '@/shared/ui/button';
import { TextInput } from '@/shared/ui/text-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useAuthStore } from '../../model/use-auth.store';
import {
  RegisterFormValues,
  registerFormSchema,
} from '../../schemas/register.schema';
import { RegisterAvatarInput } from '../components/register-avatar-input';

type Props = {
  onSubmit: (values: RegisterFormValues) => void;
  isPending?: boolean;
};

export const RegisterInfoForm = ({ onSubmit, isPending }: Props) => {
  const { user } = useAuthStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),

    mode: 'onChange',

    defaultValues: {
      username: user?.username ?? '',
    },
  });

  const username = useWatch({
    control,
    name: 'username',
  });

  const { isAvailable, isChecking } = useUsernameAvailability(username);

  const isSubmitDisabled = isPending || isChecking || isAvailable === false;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center justify-center gap-4 px-2 w-full'
    >
      <RegisterAvatarInput name='avatar' register={register} />

      <UsernameInput
        register={register}
        error={errors.username?.message}
        isChecking={isChecking}
        isAvailable={isAvailable}
      />

      <TextInput
        register={register}
        name='full_name'
        label='نام و نام خانوادگی'
        error={errors.full_name?.message}
        helperText='این اسمی هستش که همه روی پروفایل شما میبینن'
      />

      <Button type='submit' className='w-full' disabled={isSubmitDisabled}>
        {isPending ? 'در حال ثبت...' : 'ثبت نام'}
      </Button>
    </form>
  );
};
