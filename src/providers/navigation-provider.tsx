'use client';
import { useNavigationBridge } from '@/shared/services/navigation/use-navigation-bridge';
import { PropsWithChildren } from 'react';

export function NavigationProvider({ children }: PropsWithChildren) {
  useNavigationBridge();

  return children;
}
