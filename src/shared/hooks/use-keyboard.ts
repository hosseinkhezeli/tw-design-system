import { useEffect } from 'react';

export function useKeyboard() {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const update = () => {
      if (!window.visualViewport) return;

      const vh = window.visualViewport.height;
      const keyboardHeight = Math.max(0, window.innerHeight - vh);

      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty(
        '--keyboard-height',
        `${keyboardHeight}px`,
      );
    };

    const handleChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(update, 16);
    };

    window.visualViewport?.addEventListener('resize', handleChange);
    window.addEventListener('resize', handleChange);
    window.addEventListener('orientationchange', handleChange);

    update(); // اولیه

    return () => {
      clearTimeout(timeoutId);
      window.visualViewport?.removeEventListener('resize', handleChange);
      window.removeEventListener('resize', handleChange);
      window.removeEventListener('orientationchange', handleChange);
      document.documentElement.style.setProperty('--keyboard-height', '0px');
    };
  }, []);
}
