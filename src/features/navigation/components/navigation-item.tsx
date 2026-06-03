'use client';

import Link from 'next/link';

import { cn } from '@/shared/utils/cn';
import { NavigationItemModel } from '../models/navigation-item.model';
import { Button } from '@/shared/components/ui/button';

type Props = {
  item: NavigationItemModel['args'];
  active: boolean;
};

export function NavigationItem({ item, active }: Props) {
  return (
    <Button variant='ghost' asChild className='size-10 p-0'>
      <Link
        href={item.href}
        className={cn(
          'flex items-center justify-center transition-transform',
          active && 'scale-110',
        )}
      >
        {item.renderIcon(active)}
      </Link>
    </Button>
  );
}
