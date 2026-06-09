'use client';

import { useId } from 'react';
import {
  FieldValues,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/components/ui/input-otp';


export type OtpInputProps<T extends FieldValues = FieldValues> = {
  label?: string;
  error?: string;
  name: Path<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  length?: number;
  disabled?: boolean;
};

export function OtpInput<T extends FieldValues>({
  label = 'کد تأیید',
  error,
  name,
  watch,
  setValue,
  length = 6,
  disabled,
}: OtpInputProps<T>) {
  const id = useId();

  const value = (watch(name) as string) ?? '';

  return (
    <Field>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      <InputOTP
        id={id}
        maxLength={length}
        value={value}
        disabled={disabled}
        onChange={(value) => {
          setValue(name, value as T[Path<T>], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        }}
      >
        <InputOTPGroup className='w-full justify-center'>
          {Array.from({ length }).map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
