'use client';
import { QuickLinkButton } from './quick-link-button';

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

export function QuickLinksList() {
  return (
    <div className='flex gap-2 no-scrollbar overflow-x-auto pb-4 px-4 -mx-4 snap-x snap-mandatory'>
      {quickLinks.map((link) => (
        <QuickLinkButton key={link.id} link={link} />
      ))}
    </div>
  );
}
