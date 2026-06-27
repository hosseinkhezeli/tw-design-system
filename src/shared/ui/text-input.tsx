'use client';

import { type ReactNode, useId } from 'react';
import { Field, FieldDescription, FieldError } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';
import { cn } from '@/shared/utils';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from './input-group';
import { IconInfoCircle } from '@tabler/icons-react';

import {
  isNumericInput,
  sanitizeNumericValue,
} from '@/shared/lib/input/sanitize-numeric';

export type TextInputProps<T extends FieldValues = FieldValues> = {
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  className?: string;
  helperText?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
} & Omit<React.ComponentProps<typeof Input>, 'name'>;

export function TextInput<T extends FieldValues>({
  label,
  placeholder,
  register,
  name,
  error,
  className,
  helperText,
  endAdornment,
  startAdornment,
  onChange,
  type = 'text',
  inputMode,
  ...props
}: TextInputProps<T>) {
  const id = useId();
  const hasError = !!error;

  const registration = register(name);

  return (
    <Field {...(hasError && { 'aria-invalid': true })}>
      <InputGroup
        {...(hasError && { 'aria-invalid': true })}
        className={cn(className, 'placeholder:text-right min-w-56')}
      >
        {startAdornment && (
          <InputGroupAddon
            align='inline-start'
            className='animate-grow has-aria-invalid:ring-destructive has-aria-invalid:text-destructive'
            {...(hasError && { 'aria-invalid': true })}
          >
            {typeof startAdornment === 'string' ? (
              <InputGroupText>{startAdornment}</InputGroupText>
            ) : (
              startAdornment
            )}
          </InputGroupAddon>
        )}

        <InputGroupInput
          id={id}
          type={type}
          inputMode={inputMode}
          placeholder={placeholder || label}
          className={cn(className, 'placeholder:text-right')}
          autoComplete='off'
          {...registration}
          {...props}
          onChange={(e) => {
            if (isNumericInput(type, inputMode)) {
              e.target.value = sanitizeNumericValue(
                e.target.value,
                inputMode === 'decimal',
              );
            }

            registration.onChange(e);
            onChange?.(e);
          }}
        />

        {(endAdornment || error) && (
          <InputGroupAddon
            align='inline-end'
            className='animate-grow has-aria-invalid:ring-destructive has-aria-invalid:stroke-destructive'
            {...(hasError && { 'aria-invalid': true })}
          >
            {error ? (
              <IconInfoCircle className='text-destructive' />
            ) : typeof endAdornment === 'string' ? (
              <InputGroupText>{endAdornment}</InputGroupText>
            ) : (
              endAdornment
            )}
          </InputGroupAddon>
        )}
      </InputGroup>

      {error && <FieldError className='animate-grow'>{error}</FieldError>}

      {helperText && (
        <FieldDescription className='animate-grow'>
          {helperText}
        </FieldDescription>
      )}
    </Field>
  );
}
