import { toEnglishDigits } from './digit-utils';

export const isNumericInput = (
  type?: React.HTMLInputTypeAttribute,
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'],
) => {
  return (
    type === 'number' ||
    type === 'tel' ||
    inputMode === 'numeric' ||
    inputMode === 'decimal'
  );
};

export const sanitizeNumericValue = (value: string, allowDecimal = false) => {
  const normalized = toEnglishDigits(value);

  if (allowDecimal) {
    const cleaned = normalized.replace(/[^\d.]/g, '');

    const [first, ...rest] = cleaned.split('.');

    return rest.length
      ? `${first}.${rest.join('').replace(/\./g, '')}`
      : cleaned;
  }

  return normalized.replace(/\D/g, '');
};
