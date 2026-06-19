import { EMPTY_STRING_PLACEHOLDER } from '@/shared/config/ui';

class NumericFormatter {
  static formatNumber(value: number | undefined | null): string {
    if (value) return new Intl.NumberFormat('fa-IR').format(value);
    return EMPTY_STRING_PLACEHOLDER;
  }

  static formatPrice(value: number | undefined | null): string {
    if (value) return `${this.formatNumber(value)} تومان`;
    return EMPTY_STRING_PLACEHOLDER;
  }
}

export const formatNumber = NumericFormatter.formatNumber;
export const formatPrice = NumericFormatter.formatPrice;
