'use client';

import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { themeModeAtom } from '../store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);

  // Load saved theme from localStorage on component mount
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setThemeMode(savedTheme as 'light' | 'dark');
    } else {
      // Check for system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, [setThemeMode]);

  // Update body class and localStorage when theme changes
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
    
    // Save preference to localStorage
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  return <>{children}</>;
} 