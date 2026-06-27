/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { cn } from '@/shared/utils';
import { useState, useEffect, ReactNode } from 'react';

type Props = {
  stepKey: string;
  children: ReactNode;
  duration?: number;
  className?: string;
};

export function StepTransition({
  stepKey,
  children,
  duration = 300,
  className = '',
}: Props) {
  const [activeKey, setActiveKey] = useState(stepKey);
  const [activeChildren, setActiveChildren] = useState(children);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (stepKey !== activeKey) {
      setIsExiting(true);

      const timeout = setTimeout(() => {
        setActiveKey(stepKey);
        setActiveChildren(children);
        setIsExiting(false);
      }, duration);

      return () => clearTimeout(timeout);
    } else {
      setActiveChildren(children);
    }
  }, [stepKey, activeKey, children, duration]);

  return (
    <div
      key={activeKey}
      style={{ transitionDuration: `${duration}ms` }}
      className={cn(
        'w-full transition-all ease-in-out will-change-transform',
        isExiting
          ? 'opacity-0 -translate-y-2 scale-[0.98]'
          : 'opacity-100 translate-y-0 scale-100 animate-in fade-in slide-in-from-bottom-2',
        'flex relative w-full flex-col items-center justify-center gap-8',
        className,
      )}
    >
      {activeChildren}
    </div>
  );
}
