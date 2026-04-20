// ─────────────────────────────────────────────────────────────
// Theme Store (Zustand)
// Screen: Global State Management
// Handles: Dark/Light mode persistence + toggling
// Depends on: zustand, MMKV storage
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { create } from "zustand";
import { storage } from "./mmkvStore";

// ── Constants ────────────────────────────────────────────────
const THEME_KEY = "app_theme";

// ── Types ────────────────────────────────────────────────────
interface ThemeState {
  isDarkMode: boolean;
  setTheme: (isDark: boolean) => void;
  toggleTheme: () => void;
  loadTheme: () => void;
}

// ── Store ────────────────────────────────────────────────────
export const useThemeStore = create<ThemeState>((set, get) => ({
  isDarkMode: false,

  // ── Set Theme ─────────────────────────────────────────────
  setTheme: (isDark) => {
    set({ isDarkMode: isDark });
    storage.set(THEME_KEY, isDark ? "dark" : "light");
  },

  // ── Toggle Theme ───────────────────────────────────────────
  toggleTheme: () => {
    const newValue = !get().isDarkMode;
    get().setTheme(newValue);
  },

  // ── Load Theme From Storage ───────────────────────────────
  loadTheme: () => {
    const saved = storage.getString(THEME_KEY);

    if (saved === "dark") {
      set({ isDarkMode: true });
    } else if (saved === "light") {
      set({ isDarkMode: false });
    } else {
      // Default to dark mode if nothing saved
      set({ isDarkMode: true });
    }
  },
}));