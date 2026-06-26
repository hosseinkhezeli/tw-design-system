import { EMPTY_STRING_PLACEHOLDER } from '@/shared/config/ui';

class NumericFormatter {
  static formatNumber(value: number | undefined | null): string {
    // Fixed: Now allows 0 to be formatted correctly
    if (value != null) return new Intl.NumberFormat('en-US').format(value);
    return EMPTY_STRING_PLACEHOLDER;
  }

  static formatPrice(value: number | undefined | null): string {
    if (value != null) return `${this.formatNumber(value)} تومان`;
    return EMPTY_STRING_PLACEHOLDER;
  }

  // New method for social counts
  static formatCompact(value: number | undefined | null): string {
    if (value == null) return EMPTY_STRING_PLACEHOLDER;

    // 1. Under 10,000: show exact number (e.g., ۹,۹۹۹)
    if (value < 10000) {
      return this.formatNumber(value);
    }

    // 2. Under 1,000,000: Divide by 1k, keep 1 decimal, add هزار
    if (value < 1000000) {
      const thousands = value / 1000;
      const formatted = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 1,
      }).format(thousands);

      return `${formatted} هزار`;
    }

    // 3. 1,000,000 and above: Divide by 1m, keep 1 decimal, add میلیون
    const millions = value / 1000000;
    const formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 1,
    }).format(millions);

    return `${formatted} میلیون`;
  }
}

// Ensure "this" context is preserved if you export them like this
export const formatNumber =
  NumericFormatter.formatNumber.bind(NumericFormatter);
export const formatPrice = NumericFormatter.formatPrice.bind(NumericFormatter);
export const formatCompact =
  NumericFormatter.formatCompact.bind(NumericFormatter);
