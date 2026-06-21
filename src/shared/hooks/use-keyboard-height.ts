import { useEffect, useState } from 'react';

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateKeyboardHeight = () => {
      if (!window.visualViewport) return;

      const viewportHeight = window.visualViewport.height;
      const windowHeight = window.innerHeight;
      const currentHeight = Math.max(0, windowHeight - viewportHeight);

      setKeyboardHeight(currentHeight);

      // اعمال به root برای استفاده در CSS
      document.documentElement.style.setProperty(
        '--keyboard-height',
        `${currentHeight}px`,
      );
    };

    const handleVisualViewportChange = () => {
      // کمی delay برای جلوگیری از لرزش
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateKeyboardHeight, 10);
    };

    // Listenerها
    window.visualViewport?.addEventListener(
      'resize',
      handleVisualViewportChange,
    );
    window.addEventListener('resize', handleVisualViewportChange);

    // Initial check
    updateKeyboardHeight();

    return () => {
      clearTimeout(timeoutId);
      window.visualViewport?.removeEventListener(
        'resize',
        handleVisualViewportChange,
      );
      window.removeEventListener('resize', handleVisualViewportChange);
      document.documentElement.style.setProperty('--keyboard-height', '0px');
    };
  }, []);

  return keyboardHeight;
}
