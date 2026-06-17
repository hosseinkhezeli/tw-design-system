'use client';

import { useId } from 'react';
import {
  Field,
  FieldDescription,
  FieldError,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { cn } from '@/shared/utils';

export type TextInputProps<T extends FieldValues = FieldValues> = {
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  className?: string;
  helperText?: string;
} & Omit<React.ComponentProps<typeof Input>, 'name'>;

export function TextInput<T extends FieldValues>({
  label = '',
  placeholder = '',
  register,
  name,
  error,
  className,
  helperText,
  ...props
}: TextInputProps<T>) {
  const id = useId();

  return (
    <Field>
      <Input
        id={id}
        type='text'
        inputMode='text'
        placeholder={label ?? placeholder}
        className={cn(className, 'placeholder:text-right')}
        autoComplete='off'
        {...register(name)}
        {...props}
      />
      {error && <FieldError>{error}</FieldError>}
      {helperText && <FieldDescription>{helperText}</FieldDescription>}
    </Field>
  );
}
