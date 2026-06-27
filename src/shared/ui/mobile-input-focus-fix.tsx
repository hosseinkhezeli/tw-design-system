'use client';

import { useEffect } from 'react';

export function MobileInputFocusFix() {
  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const element = event.target;

      if (
        !(element instanceof HTMLInputElement) &&
        !(element instanceof HTMLTextAreaElement) &&
        !(element instanceof HTMLSelectElement)
      ) {
        return;
      }

      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 150);
    };

    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, []);

  return null;
}
