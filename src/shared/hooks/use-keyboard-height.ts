import { useEffect, useState } from 'react';

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const update = () => {
      if (!window.visualViewport) return;
      const current = Math.max(
        0,
        window.innerHeight - window.visualViewport.height,
      );
      setKeyboardHeight(current);
    };

    const handleChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(update, 16);
    };

    window.visualViewport?.addEventListener('resize', handleChange);
    window.addEventListener('resize', handleChange);

    update();

    return () => {
      clearTimeout(timeoutId);
      window.visualViewport?.removeEventListener('resize', handleChange);
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return keyboardHeight;
}
