'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem('theme', next);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
