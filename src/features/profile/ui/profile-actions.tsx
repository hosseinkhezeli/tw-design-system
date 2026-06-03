import { Button } from '@/shared/components/ui/button';
import { IconEditCircle, IconSettings } from '@tabler/icons-react';

export function ProfileActions() {
  return (
    <div className='flex items-center gap-2'>
      <Button variant={'outline'}>
        ویرایش <IconEditCircle stroke={1.25} />
      </Button>
      <Button size={'icon'} variant={'outline'}>
        <IconSettings stroke={1.25} />
      </Button>
    </div>
  );
}
