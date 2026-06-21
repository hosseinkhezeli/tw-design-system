import { PropsWithChildren, ReactNode } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from './drawer';
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
      autoFocus
      modal
      repositionInputs
    >
      <DrawerContent
        className={cn(
          'max-w-xl mx-auto transition-all ',
          'before:rounded-b-none! before:translate-y-4 before:opacity-75 before:overflow-hidden',

          fullScreen && [
            'h-full max-h-dvh min-h-dvh rounded-t-none border-none',
            '[&>div:first-child]:hidden before:hidden bg-background',
            '[&_.bg-muted]:hidden',
          ],
        )}
      >
        <div className='relative'>
          <div
            className={cn(
              'absolute transition-all z-20 bg-linear-to-br from-white from-5% to-transparent to-35%',
              open
                ? 'opacity-20 blur-2xl inset-2'
                : 'opacity-0 blur-xs -inset-2',
            )}
          />
          <DrawerHeader className='relative'>
            <DrawerTitle className='text-center'>{title}</DrawerTitle>
            <DrawerDescription className='sr-only'>
              Bottom sheet content
            </DrawerDescription>

            {fullScreen && (
              <Button
                onClick={onClose}
                type='button'
                variant={'outline'}
                size={'icon-sm'}
                className='absolute text-muted-foreground left-4 top-0 z-30'
                aria-label='Close'
              >
                <IconX />
              </Button>
            )}
          </DrawerHeader>
        </div>
        <div
          className={cn(
            'flex-1 overflow-y-auto px-4 pb-6 w-full flex',
            fullScreen && 'h-full ',
          )}
        >
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
