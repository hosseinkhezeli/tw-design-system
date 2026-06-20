'use client';

import { useId } from 'react';
import {
  Field,
  FieldDescription,
  FieldError,
} from '@/shared/components/ui/field';
import { Textarea } from '@/shared/components/ui/textarea';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { cn } from '@/shared/utils';

export type TextareaInputProps<T extends FieldValues = FieldValues> = {
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  className?: string;
  helperText?: string;
} & Omit<React.ComponentProps<typeof Textarea>, 'name'>;

export function TextareaInput<T extends FieldValues>({
  label = '',
  placeholder = '',
  register,
  name,
  error,
  className,
  helperText,
  ...props
}: TextareaInputProps<T>) {
  const id = useId();

  return (
    <Field>
      <Textarea
        id={id}
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
