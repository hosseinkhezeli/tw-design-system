import { ReactNode } from 'react';
import { cn } from '@/shared/utils';
import { Button } from '@/shared/ui/button';
import { IconArrowLeft } from '@tabler/icons-react';

type Props = {
  children: ReactNode;
  className?: string;
  onStepBack?: () => void;
};

export const AuthCardLayout = ({
  children,
  className = '',
  onStepBack,
}: Props) => {
  return (
    <div
      className={cn(
        'flex relative w-full max-w-sm flex-col items-center justify-center gap-8',
        'overflow-y-auto max-h-svh',
        'px-8 py-12',
        'transition-all duration-300',
        className,
      )}
    >
      {onStepBack && (
        <Button
          onClick={onStepBack}
          size={'icon-sm'}
          variant={'outline'}
          className='absolute top-2 left-2 animate-grow'
        >
          <IconArrowLeft />
        </Button>
      )}
      {children}
    </div>
  );
};
