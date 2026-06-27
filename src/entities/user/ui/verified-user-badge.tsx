import { IconStarFilled } from '@tabler/icons-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils';
import { Typography } from '@/shared/ui/typography';

export function VerifiedUserBadge() {
  return (
    <Button
      size='sm'
      variant='outline'
      className={cn(
        'relative bg-transparent border-dashed! shadow-none text-xs! ',
        'hover:bg-transparent',
      )}
    >
      <div
        className={cn(
          'relative bg-transparent border-0 shadow-none',
          'hover:bg-transparent',
        )}
      >
        {/* SVG defs for gradient */}
        <svg width='0' height='0' className='absolute' aria-hidden>
          <defs>
            <linearGradient
              id='verified-star-gradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#f0abfc' />
              <stop offset='35%' stopColor='#d946ef' />
              <stop offset='70%' stopColor='#e11d48' />
              <stop offset='100%' stopColor='#7f1d1d' />
            </linearGradient>
          </defs>
        </svg>
        {/* Big soft glow */}
        <IconStarFilled
          size={64}
          className='size-5 absolute inset-0 blur-xl opacity-50 scale-125'
          style={{
            fill: 'url(#verified-star-gradient)',
          }}
        />
        {/* Secondary glow */}
        <IconStarFilled
          size={64}
          className='size-5 absolute inset-0 blur-md opacity-70 scale-110'
          style={{
            fill: 'url(#verified-star-gradient)',
          }}
        />
        {/* Main star */}
        <div className='relative'>
          <IconStarFilled
            size={64}
            className='size-5'
            style={{
              fill: 'url(#verified-star-gradient)',
              filter:
                'drop-shadow(0 2px 4px rgb(255 255 255 / 0.15)) drop-shadow(0 8px 20px rgb(225 29 72 / 0.35))',
            }}
          />

          {/* Glass reflection */}
          <div
            className={cn(
              'absolute inset-0 pointer-events-none opacity-5',
              'bg-linear-to-br from-white/40 via-white/10 to-transparent',
              'mix-blend-color blur-[1px]',
            )}
            style={{
              maskImage:
                'radial-gradient(circle at 35% 25%, black 0%, black 30%, transparent 65%)',
            }}
          />

          {/* Specular highlight */}
          <div
            className='absolute top-[18%] left-[28%] h-3 w-3 rounded-full bg-white/30 blur-[2px]'
            aria-hidden
          />

          {/* Shine streak */}
          <div
            className={cn(
              'absolute inset-0 rotate-12',
              'bg-linear-to-r from-transparent via-white/25 to-transparent',
              'blur-sm opacity-60',
            )}
            style={{
              clipPath: 'polygon(40% 0%, 55% 0%, 75% 100%, 60% 100%)',
            }}
          />
        </div>
      </div>
      <Typography variant={'muted'} className=''>
        دریافت
      </Typography>
    </Button>
  );
}
