'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AccentColor,
  accentColors,
  lightTheme,
  darkTheme,
  defaultAccent,
  defaultTheme,
} from '@/config/theme';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(defaultTheme === 'dark');
  const [accentColor, setAccentColor] = useState<AccentColor>(defaultAccent);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme');
    const savedAccent = localStorage.getItem('accent') as AccentColor;

    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    if (savedAccent && accentColors[savedAccent]) {
      setAccentColor(savedAccent);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const theme = isDark ? darkTheme : lightTheme;
    const accent = accentColors[accentColor];

    // Apply theme class
    root.classList.toggle('dark', isDark);

    // Apply CSS variables
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--foreground', theme.foreground);
    root.style.setProperty('--card', theme.card);
    root.style.setProperty('--card-foreground', theme.cardForeground);
    root.style.setProperty('--muted', theme.muted);
    root.style.setProperty('--muted-foreground', theme.mutedForeground);
    root.style.setProperty('--border', theme.border);

    // Apply accent colors
    root.style.setProperty('--accent', accent.accent);
    root.style.setProperty('--accent-light', accent.accentLight);
    root.style.setProperty('--accent-dark', accent.accentDark);
    root.style.setProperty('--accent-rgb', accent.accentRgb);

    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', accent.accent);
    }

    // Save preferences
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    localStorage.setItem('accent', accentColor);
  }, [isDark, accentColor, mounted]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme, accentColor, setAccentColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
