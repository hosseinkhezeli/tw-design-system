import { Button } from '@/shared/components/ui/button';
import { IconPlus } from '@tabler/icons-react';

export function CreateHighlightButton({ onClick }: any) {
  return (
    <Button variant='outline' onClick={onClick} className='rounded-full'>
      <IconPlus />
    </Button>
  );
}
