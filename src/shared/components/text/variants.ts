import { TextProps } from './text.types';

export const textVariants = {
  sm: {
    title: 'caption',
    text: 'caption',
  },
  default: {
    title: 'body',
    text: 'body',
  },
  lg: {
    title: 'h3',
    text: 'body',
  },
} as const satisfies Record<
  NonNullable<TextProps['size']>,
  {
    title: string;
    text: string;
  }
>;
