import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { getTheme } from '../styles/theme';

// Create an atom that persists in localStorage
export const themeAtom = atomWithStorage('themeMode', 'light');

// Derived atom that creates the MUI theme object based on mode
export const muiThemeAtom = atom(
  (get) => getTheme(get(themeAtom))
);

// Helper function to toggle theme
export const toggleTheme = atom(
  (get) => get(themeAtom),
  (get, set) => {
    const currentTheme = get(themeAtom);
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    set(themeAtom, newTheme);
    
    // Apply theme changes to document
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.body.style.backgroundColor = '#121212';
      } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.style.backgroundColor = '#f5f5f5';
      }
    }
  }
); 