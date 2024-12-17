'use client';

import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    handleThemeChange();
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return <div data-theme={theme}>{children}</div>;
}
