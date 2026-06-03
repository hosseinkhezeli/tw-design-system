import { Slot } from 'radix-ui';
import { TypographyProps } from './typography.types';
import { cn } from '@/shared/utils/cn';
import { typographyVariants } from './variants';
import { ElementType } from 'react';

export function Typography({
  children,
  variant,
  as: Comp = 'span',
  asChild = false,
  className,
}: TypographyProps) {
  const Component = (asChild ? Slot : Comp) as ElementType;

  return (
    <Component className={cn(typographyVariants({ variant }), className)}>
      {children}
    </Component>
  );
}
