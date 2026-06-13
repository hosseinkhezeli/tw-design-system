'use client';

import * as React from 'react';
import { useId } from 'react';
import { Field, FieldLabel, FieldError } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { cn } from '@/shared/utils';

export type PhoneNumberInputProps<T extends FieldValues = FieldValues> = {
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  className?: string;
} & Omit<React.ComponentProps<typeof Input>, 'name'>;

export function PhoneNumberInput<T extends FieldValues>({
  label = 'شماره همراه',
  placeholder = '۰۹xxxxxxxxx',
  register,
  name,
  error,
  className,
  ...props
}: PhoneNumberInputProps<T>) {
  const id = useId();

  return (
    <Field>
      <Input
        id={id}
        type='tel'
        inputMode='numeric'
        placeholder={label ?? placeholder}
        className={cn(className, 'placeholder:text-right')}
        dir='ltr'
        autoComplete='off'
        {...register(name)}
        {...props}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
