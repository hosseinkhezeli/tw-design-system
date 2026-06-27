'use client';

import { PropsWithChildren } from 'react';
import { MobileInputFocusFix } from '../ui/mobile-input-focus-fix';

export function MobileInputFocusFixProvider({ children }: PropsWithChildren) {
  return (
    <>
      <MobileInputFocusFix />
      {children}
    </>
  );
}
