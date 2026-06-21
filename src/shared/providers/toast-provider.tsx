'use client';

import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { vazirmatn } from '../config/fonts';
import { useKeyboard } from '../hooks/use-keyboard';

type Props = {
  children: ReactNode;
};

export function ToastProvider({ children }: Props) {
  useKeyboard();
  return (
    <>
      {children}
      <Toaster
        duration={2000}
        mobileOffset={50}
        position='top-center'
        toastOptions={{
          style: { fontFamily: vazirmatn.style.fontFamily },
        }}
      />
    </>
  );
}
