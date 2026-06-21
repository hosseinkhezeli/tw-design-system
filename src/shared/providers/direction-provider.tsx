import { DirectionProvider as ShadcnDirectionProvider } from '@/shared/components/ui/direction';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function DirectionProvider({ children }: Props) {
  
  return (
    <ShadcnDirectionProvider direction='rtl' dir={'rtl'}>
      {children}
    </ShadcnDirectionProvider>
  );
}
