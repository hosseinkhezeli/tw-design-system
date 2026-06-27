/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { IconCircleCheckFilled, IconLoader2, IconX } from '@tabler/icons-react';
import { UseFormRegister } from 'react-hook-form';

import { cn } from '@/shared/utils';
import { TextInput } from '@/shared/ui/text-input';

type Props = {
  register: UseFormRegister<any>;
  error?: string;
  isChecking: boolean;
  isAvailable: boolean | null;
};

export const UsernameInput = ({
  register,
  error,
  isChecking,
  isAvailable,
}: Props) => {
  const { minLength } = register('username');

  const showStatus = !error && (isChecking || isAvailable !== null);

  return (
    <div className='w-full space-y-2'>
      <TextInput
        register={register}
        name='username'
        label='نام کاربری'
        error={error}
        dir='ltr'
        style={{ direction: 'ltr' }}
        minLength={minLength}
      />

      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          showStatus ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        {isChecking && (
          <div className='flex items-center gap-2 text-muted-foreground text-sm'>
            <IconLoader2 size={16} className='animate-spin' />
            <span>در حال بررسی نام کاربری...</span>
          </div>
        )}

        {!isChecking && isAvailable === true && (
          <div className='flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-500'>
            <IconCircleCheckFilled size={16} />
            <span>این نام کاربری در دسترس است</span>
          </div>
        )}

        {!isChecking && isAvailable === false && (
          <div className='flex items-center gap-2 text-sm text-destructive'>
            <IconX size={16} />
            <span>این نام کاربری قبلاً انتخاب شده است</span>
          </div>
        )}
      </div>
    </div>
  );
};
