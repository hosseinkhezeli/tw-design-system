'use client';
import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography/typography';
import { cn } from '@/shared/utils';

export interface QuickLink {
  id: string;
  title: string;
  description: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface QuickLinkButtonProps {
  link: QuickLink;
  className?: string;
}

export function QuickLinkButton({ link, className }: QuickLinkButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (link.onClick) {
      e.preventDefault();
      link.onClick();
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        'group rounded-lg flex-col min-w-40  items-start h-full py-2 max-h-18',
        link.isActive && 'border-primary/50 bg-primary/5',
        className,
      )}
      variant={'secondary'}
    >
      <Typography
        className={cn('block text-foreground', link.isActive && 'text-primary')}
      >
        {link.title}
      </Typography>
      <Typography className={cn('block text-muted-foreground')}>
        {link.description}
      </Typography>
    </Button>
  );
}
