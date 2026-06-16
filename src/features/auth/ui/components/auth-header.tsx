import { Typography } from '@/shared/components/ui/typography/typography';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <Typography as={'header'} className='space-y-2 text-center'>
      <Typography as={'h1'} className='text-2xl font-bold'>
        {title}
      </Typography>

      {subtitle && <Typography className='text-muted-foreground text-sm'>{subtitle}</Typography>}
    </Typography>
  );
}
