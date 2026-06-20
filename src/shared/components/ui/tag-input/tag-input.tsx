/* eslint-disable react-hooks/refs */
'use client';

import { useId, useState } from 'react';
import { IconInfoCircle, IconX } from '@tabler/icons-react';
import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
} from '@/shared/components/ui/field';

import { cn } from '@/shared/utils';
import { InputGroup, InputGroupInput, InputGroupAddon } from '../input-group';

export type TagInputProps<T extends FieldValues = FieldValues> = {
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  helperText?: string;
  className?: string;
  disabled?: boolean;
  maxTags?: number;
  maxTagLength?: number;
  defaultValue?: string[];
};

export function TagInput<T extends FieldValues>({
  label,
  placeholder,
  register,
  name,
  error,
  helperText,
  className,
  disabled,
  maxTags = 30,
  maxTagLength = 30,
  defaultValue = [],
}: TagInputProps<T>) {
  const id = useId();
  const registration = register(name);

  const [tags, setTags] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState('');

  const hasError = !!error;

  const emitChange = (nextTags: string[]) => {
    setTags(nextTags);

    registration.onChange({
      target: {
        name: registration.name,
        value: nextTags,
      },
      type: 'change',
    } as never);
  };

  const emitBlur = () => {
    registration.onBlur({
      target: {
        name: registration.name,
        value: tags,
      },
      type: 'blur',
    } as never);
  };

  const addTag = (rawValue: string) => {
    const tag = rawValue.trim();

    if (!tag) return;
    if (tag.length > maxTagLength) return;
    if (tags.length >= maxTags) return;

    const exists = tags.some(
      (item) => item.toLowerCase() === tag.toLowerCase(),
    );

    if (exists) return;

    emitChange([...tags, tag]);
  };

  const removeTag = (tagToRemove: string) => {
    emitChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const commitTag = () => {
    if (!inputValue.trim()) return;

    addTag(inputValue);
    setInputValue('');
  };

  return (
    <Field {...(hasError && { 'aria-invalid': true })}>
      <InputGroup
        {...(hasError && { 'aria-invalid': true })}
        className={cn(
          'max-h-80 min-h-max overflow-y-auto flex-wrap px-2  gap-2 ring-0! outline-0! border-0!',
          className,
        )}
        onClick={() => {
          const input = document.getElementById(id) as HTMLInputElement | null;
          input?.focus();
        }}
      >
        <input
          type='hidden'
          name={registration.name}
          ref={registration.ref}
          onBlur={registration.onBlur}
          onChange={registration.onChange}
          defaultValue={JSON.stringify(defaultValue)}
        />

        {tags.map((tag) => (
          <span
            key={tag}
            className='bg-secondary text-secondary-foreground inline-flex h-7 items-center gap-1 rounded-md px-2 text-sm'
          >
            <span>{tag}</span>

            {!disabled && (
              <button
                type='button'
                aria-label={`Remove ${tag}`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                <IconX size={14} />
              </button>
            )}
          </span>
        ))}

        <InputGroupInput
          id={id}
          value={inputValue}
          disabled={disabled}
          autoComplete='off'
          placeholder={tags.length ? '' : (placeholder ?? label)}
          className='border-0 shadow-none focus-visible:ring-0 my-2 h-maxasdas'
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={() => {
            commitTag();
            emitBlur();
          }}
          onKeyDown={(e) => {
            const shouldCreateTag =
              e.key === ' ' || e.key === 'Enter' || e.key === ',';

            if (shouldCreateTag) {
              e.preventDefault();
              commitTag();
              return;
            }

            if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
              e.preventDefault();
              emitChange(tags.slice(0, -1));
            }
          }}
        />

        {error && (
          <InputGroupAddon
            align='inline-end'
            className='animate-grow has-aria-invalid:text-destructive'
            aria-invalid
          >
            <IconInfoCircle className='text-destructive' />
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
