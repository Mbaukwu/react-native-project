import { create } from 'zustand';
import { storage } from './mmkvStore';

const THEME_KEY = 'app_theme';

interface ThemeState {
  isDarkMode: boolean;
  setTheme: (isDark: boolean) => void;
  toggleTheme: () => void;
  loadTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDarkMode: false,

  setTheme: (isDark) => {
    set({ isDarkMode: isDark });
    storage.set(THEME_KEY, isDark ? 'dark' : 'light');
  },

  toggleTheme: () => {
    const newValue = !get().isDarkMode;
    get().setTheme(newValue);
  },

  loadTheme: () => {
    const saved = storage.getString(THEME_KEY);
    if (saved === 'dark') {
      set({ isDarkMode: true });
    } else if (saved === 'light') {
      set({ isDarkMode: false });
    } else {
      // Default to dark
      set({ isDarkMode: true });
    }
  },
}));