'use client';

import { Activity, type PropsWithChildren } from 'react';

export interface VisibilityProps extends PropsWithChildren {
  visible: boolean;
}

export function Visibility({ visible, children }: VisibilityProps) {
  return <Activity mode={visible ? 'visible' : 'hidden'}>{children}</Activity>;
}
