'use client';

import { useId } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/shared/components/ui/input-otp';
import { OTP_LENGTH } from '../../constants/auth.constants';
import { cn } from '@/shared/utils';

export type OtpInputProps<T extends FieldValues = FieldValues> = {
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  className?: string;
  length?: number;
  maxLength?: number;
} & Omit<React.ComponentProps<typeof InputOTP>, 'name'>;

export function OtpInput<T extends FieldValues>({
  label = 'کد تأیید',
  error,
  name,
  length = OTP_LENGTH,
  maxLength = OTP_LENGTH,
  disabled,
  register,
  className = '',
}: OtpInputProps<T>) {
  const id = useId();

  const { ref, onChange, onBlur, name: fieldName } = register(name);

  return (
    <Field>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      <InputOTP
        className={cn(className, 'ltr')}
        id={id}
        ref={ref}
        name={fieldName}
        maxLength={maxLength}
        disabled={disabled}
        inputMode='numeric'
        dir='ltr'
        autoComplete='one-time-code'
        style={{ direction: 'ltr' }}
        onBlur={onBlur}
        onChange={(value) => {
          onChange({
            target: {
              name: fieldName,
              value,
            },
            type: 'change',
          });
        }}
      >
        <InputOTPGroup
          className='w-max mx-auto justify-center'
          style={{ direction: 'ltr' }}
          dir='ltr'
        >
          {Array.from({ length }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              {...(error && { 'aria-invalid': 'true' })}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
