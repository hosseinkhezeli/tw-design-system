import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography/typography';
import { IconPlus } from '@tabler/icons-react';

export function CreateHighlightButton({ onClick }: any) {
  return (
    <li className='flex flex-col items-center gap-2'>
      <Button
        variant='outline'
        onClick={onClick}
        className='rounded-full min-h-15 min-w-15 aspect-square'
      >
        <IconPlus />
      </Button>
      <Typography variant={'muted'}>جریان جدید</Typography>
    </li>
  );
}
