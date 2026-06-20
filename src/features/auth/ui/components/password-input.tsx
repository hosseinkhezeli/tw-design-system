'use client';

import * as React from 'react';
import { useId } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError } from '@/shared/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/components/ui/input-group';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { cn } from '@/shared/utils';

export type PasswordInputProps<T extends FieldValues = FieldValues> = {
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  className?: string;
} & Omit<React.ComponentProps<typeof InputGroupInput>, 'name'>;

export function PasswordInput<T extends FieldValues>({
  label = 'گذرواژه',
  placeholder = 'رمز عبور خود را وارد کنید',
  register,
  name,
  error,
  className = '',
  ...props
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = React.useState(false);
  const id = useId();

  return (
    <Field>
      <InputGroup>
        <InputGroupInput
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={label ?? placeholder}
          className={cn(className, 'placeholder:text-right placeholder:pr-2')}
          autoComplete='off'
          dir='ltr'
          {...register(name)}
          {...props}
        />
        <InputGroupAddon align='inline-end'>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <IconEyeOff className='size-4 text-muted-foreground' />
            ) : (
              <IconEye className='size-4 text-muted-foreground' />
            )}
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
