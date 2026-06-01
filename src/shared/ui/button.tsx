import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  [
    'btn group/button',
    'active:not-aria-[haspopup]:translate-y-px',
    '[&_svg]:pointer-events-none',
    '[&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'btn-default',
        outline: 'btn-outline',
        secondary: 'btn-secondary',
        ghost: 'btn-ghost',
        destructive: 'btn-destructive',
        link: 'btn-link',
      },

      size: {
        default:
          'btn-size-default has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5',

        xs: "btn-size-xs has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&_svg:not([class*='size-'])]:size-3",

        sm: 'btn-size-sm has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2',

        lg: 'btn-size-lg has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3',

        icon: 'btn-size-icon',

        'icon-xs': "btn-size-icon-xs [&_svg:not([class*='size-'])]:size-3",

        'icon-sm': 'btn-size-icon-sm',

        'icon-lg': 'btn-size-icon-lg',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
