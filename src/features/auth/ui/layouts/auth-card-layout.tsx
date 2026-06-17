import { ReactNode } from 'react';
import { cn } from '@/shared/utils';
import { Button } from '@/shared/components/ui/button';
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
        'rounded-3xl',
        'px-8 py-12',
        'border border-foreground/20',
        'bg-foreground/10 backdrop-blur-xl',
        'shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]',
        'transition-all duration-300',
        className,
      )}
    >
      {onStepBack && (
        <Button
          onClick={onStepBack}
          size={'icon-sm'}
          variant={'outline'}
          className='absolute top-2 left-2'
        >
          <IconArrowLeft />
        </Button>
      )}
      {children}
    </div>
  );
};
