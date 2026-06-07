'use client';
import { ComponentProps } from 'react';
import { QuickLinkButton } from './quick-link-button';
import { cn } from '@/shared/utils';

const quickLinks = [
  {
    id: 'shop',
    title: 'فروشگاه',
    description: 'محصولات من',
  },
  {
    id: 'product',
    title: 'گربه خمیازه‌کش',
    description: 'خرید مستقیم با تخفیف',
  },
  {
    id: 'shops',
    title: 'فروشگاه',
    description: 'محصولات من',
  },
  {
    id: 'products',
    title: 'گربه خمیازه‌کش',
    description: 'خرید مستقیم با تخفیف',
  },
];

type Props = ComponentProps<'ul'>;

export function QuickLinksList({ className, ...props }: Props) {
  return (
    <ul
      className={cn(
        'flex gap-2 no-scrollbar overflow-x-auto snap-x snap-mandatory',
        className,
      )}
      {...props}
    >
      {quickLinks.map((link) => (
        <li key={link.id}>
          <QuickLinkButton link={link} />
        </li>
      ))}
    </ul>
  );
}
