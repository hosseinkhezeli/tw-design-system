'use client';

import { useId } from 'react';
import { Field, FieldError } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { cn } from '@/shared/utils';
import { TextInput } from '@/shared/ui/text-input';

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
    <TextInput
      register={register}
      name={name}
      id={id}
      type='tel'
      inputMode='numeric'
      label={label ?? placeholder}
      className={cn(className, '')}
      dir='ltr'
      autoComplete='off'
      error={error}
      {...props}
    />
  );
}
