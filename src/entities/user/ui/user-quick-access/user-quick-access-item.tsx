import { Button } from '@/shared/components/ui/button';
import { ReactNode } from 'react';

type Props = {
  title: string;
  icon: ReactNode;
};

export function UserQuickAccessItem({ title, icon }: Props) {
  return (
    <Button
      variant={'secondary'}
      size={'lg'}
      className='min-w-full max-w-full min-h-18 rounded-xl'
    >
      {title}
      {icon}
    </Button>
  );
}
