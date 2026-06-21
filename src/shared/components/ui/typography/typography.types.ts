import { typographyVariants } from './variants';
import type { VariantProps } from 'class-variance-authority';
import type { ElementType, ReactNode } from 'react';

export type TypographyProps = {
  children: ReactNode;
  as?: ElementType;
  asChild?: boolean;
  className?: string;
} & VariantProps<typeof typographyVariants> ;
