import { PropsWithChildren, ReactNode } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './drawer';
import { cn } from '@/shared/utils';
import { IconX } from '@tabler/icons-react';
import { Button } from './button';

type Props = PropsWithChildren & {
  title?: ReactNode;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  fullScreen?: boolean;
  handleOnly?: boolean;
};

export default function BottomSheet({
  onOpen,
  onClose,
  open = false,
  title = '',
  fullScreen = false,
  handleOnly = false,
  children,
}: Props) {
  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        } else {
          onOpen?.();
        }
      }}
      handleOnly={fullScreen || handleOnly}
      shouldScaleBackground={!fullScreen}
      preventScrollRestoration
      autoFocus
    >
      <DrawerContent
        className={cn(
          'max-w-xl mx-auto transition-all duration-300',
          'before:rounded-b-none! before:translate-y-4 before:opacity-75 before:overflow-hidden',

          fullScreen && [
            'h-full max-h-screen min-h-screen rounded-t-none max-w-full border-none',
            '[&>div:first-child]:hidden before:hidden bg-background',
            '[&_.bg-muted]:hidden',
          ],
        )}
      >
        <div className='relative'>
          <div
            className={cn(
              'absolute transition-all duration-500 z-20 bg-linear-to-br from-white from-5% to-transparent to-35%',
              open
                ? 'opacity-20 blur-2xl inset-2'
                : 'opacity-0 blur-xs -inset-2',
            )}
          />
          <DrawerHeader className='relative'>
            <DrawerTitle className='text-center'>{title}</DrawerTitle>

            {/* 👇 Full Screen Close Button */}
            {fullScreen && (
              <Button
                onClick={onClose}
                type='button'
                variant={'outline'}
                size={'icon-sm'}
                className='absolute left-4 top-1/2 -translate-y-1/2 z-30'
                aria-label='Close'
              >
                <IconX />
              </Button>
            )}
          </DrawerHeader>
        </div>
        <div
          className={cn(
            'flex-1 overflow-y-auto px-4 pb-6',
            fullScreen && 'h-full',
          )}
        >
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
