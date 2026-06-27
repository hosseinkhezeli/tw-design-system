import { cva } from 'class-variance-authority';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',

      title: 'text-lg font-semibold',
      subtitle: 'text-md font-medium',
      body: 'text-sm leading-7',
      caption: 'text-xs',
      muted: 'text-xs',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});
