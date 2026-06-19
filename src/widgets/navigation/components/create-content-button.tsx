import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils';
import { NavigationItemModel } from '../models/navigation-item.model';
import Link from 'next/link';
import { navigationItemMapper } from '../utils/navigation-item-mapper';

type Props = {
  item: NavigationItemModel['args'];
};

export function CreateContentButton({ item }: Props) {
  const IconComponent = navigationItemMapper[item.id];
  return (
    <Button
      variant='default'
      size='icon'
      className={cn(
        'h-12 w-12 rounded-full relative overflow-hidden',
        'bg-linear-to-br from-fuchsia-500 from-20% via-rose-600 to-80% to-rose-900',
        'bg-size-[100%_100%] animate-gradient',
        'hover:scale-105 active:scale-95 transition-all duration-200',
        'backdrop-blur-xl',
      )}
      asChild
    >
      {item.href && (
        <Link href={item.href}>
          {/* Glass highlight layer */}
          <div className='absolute blur-xs inset-0 bg-linear-to-br from-white from-5% to-transparent to-35%' />

          {/* Inner glass content */}
          <div className='relative z-10 h-11.5 w-11.5 rounded-full flex items-center justify-center border-3 border-white/20'>
            <IconComponent active />
          </div>

          {/* Subtle shine layer */}
          <div className='absolute inset-0 bg-white/30 blur-md animate-shine' />

          {/* Extra vibrant glow */}
          <div className='absolute -inset-2 bg-linear-to-br to-fuchsia-500 via-rose-600 from-rose-900 rounded-full -z-10 blur-sm opacity-50' />
        </Link>
      )}
    </Button>
  );
}
