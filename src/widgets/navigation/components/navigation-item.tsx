'use client';

import Link from 'next/link';

import { cn } from '@/shared/utils/cn';
import { NavigationItemModel } from '../models/navigation-item.model';
import { Button } from '@/shared/components/ui/button';
import { navigationItemMapper } from '../utils/navigation-item-mapper';
import { NAVIGATION_ITEM_IDS } from '../constants/navigation.constants';
import { CreateContentButton } from './create-content-button';

type Props = {
  item: NavigationItemModel['args'];
  active: boolean;
};

export function NavigationItem({ item, active }: Props) {
  const IconComponent = navigationItemMapper[item.id];
  if (item.id === NAVIGATION_ITEM_IDS['create-content']) {
    return <CreateContentButton item={item} />;
  }
  return (
    <Button variant='ghost' asChild className='size-10 p-0'>
      {item.href && (
        <Link
          href={item.href}
          className={cn(
            'flex items-center justify-center transition-transform',
            active && 'scale-110',
          )}
        >
          <IconComponent active={active} />
        </Link>
      )}
    </Button>
  );
}
