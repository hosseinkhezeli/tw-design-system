'use client';

import { usePathname } from 'next/navigation';

import { NavigationItem } from './navigation-item';
import { NavigationService } from '../services/navigation-service';
import { RouteMatcher } from '../utils/route-matcher';

export function BottomNavigation() {
  const pathname = usePathname();
  const items = NavigationService.getNavigationItems();
  return (
    <nav className='fixed bottom-0 inset-x-0 z-50 bg-background border-t border-t-accent/50'>
      <div className='mx-auto flex h-16 max-w-lg items-center justify-around'>
        {items.map(({ args }) => (
          <NavigationItem
            key={args.id}
            item={args}
            active={RouteMatcher.isActive(pathname, args.href)}
          />
        ))}
      </div>
    </nav>
  );
}
