'use client';

import { PropsWithChildren } from 'react';
import { MobileInputFocusFix } from '../components/mobile-input-focus-fix';

export function MobileInputFocusFixProvider({ children }: PropsWithChildren) {
  return (
    <>
      <MobileInputFocusFix />
      {children}
    </>
  );
}
