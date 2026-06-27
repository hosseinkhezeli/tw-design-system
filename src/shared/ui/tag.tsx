import { Slot } from '@radix-ui/react-slot';
import { IconX as X } from '@tabler/icons-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils';
import { ComponentPropsWithRef, ReactNode } from 'react';

const tagVariants = cva(
  [
    'inline-flex items-center gap-1',
    'rounded-full',
    'font-medium',
    'whitespace-nowrap',
    'select-none',
    'shrink-0',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
  ],
  {
    variants: {
      size: {
        sm: 'h-6 px-2 text-xs',
        md: 'h-8 px-3 text-sm',
      },

      variant: {
        filled: '',
        soft: '',
        outline: 'border bg-transparent',
      },

      color: {
        gray: '',
        blue: '',
        green: '',
        red: '',
      },

      selected: {
        true: '',
        false: '',
      },
    },

    compoundVariants: [
      // Gray
      {
        variant: 'filled',
        color: 'gray',
        className:
          'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900',
      },
      {
        variant: 'soft',
        color: 'gray',
        className:
          'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700',
      },
      {
        variant: 'outline',
        color: 'gray',
        className:
          'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800',
      },

      // Blue
      {
        variant: 'filled',
        color: 'blue',
        className: 'bg-blue-600 text-white hover:bg-blue-700',
      },
      {
        variant: 'soft',
        color: 'blue',
        className:
          'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900',
      },
      {
        variant: 'outline',
        color: 'blue',
        className:
          'border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950',
      },

      // Green
      {
        variant: 'filled',
        color: 'green',
        className: 'bg-emerald-600 text-white hover:bg-emerald-700',
      },
      {
        variant: 'soft',
        color: 'green',
        className:
          'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900',
      },
      {
        variant: 'outline',
        color: 'green',
        className:
          'border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950',
      },

      // Red
      {
        variant: 'filled',
        color: 'red',
        className: 'bg-red-600 text-white hover:bg-red-700',
      },
      {
        variant: 'soft',
        color: 'red',
        className:
          'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900',
      },
      {
        variant: 'outline',
        color: 'red',
        className:
          'border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950',
      },

      {
        selected: true,
        className:
          'ring-2 ring-primary ring-offset-2 dark:ring-offset-background',
      },
    ],

    defaultVariants: {
      size: 'md',
      variant: 'soft',
      color: 'gray',
      selected: false,
    },
  },
);

type TagProps = ComponentPropsWithRef<'div'> &
  VariantProps<typeof tagVariants> & {
    children: ReactNode;
    asChild?: boolean;
    removable?: boolean;
    onRemove?: () => void;
  };

export function Tag({
  ref,
  children,
  asChild,
  removable,
  className,
  onRemove,
  ...props
}: TagProps) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp ref={ref} className={cn(tagVariants(props), className)}>
      {children}

      {removable && (
        <button
          type='button'
          aria-label='Remove tag'
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className='ml-0.5 rounded-full p-0.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none'
        >
          <X className='size-3.5' />
        </button>
      )}
    </Comp>
  );
}
