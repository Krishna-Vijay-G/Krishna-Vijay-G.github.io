// Theme configuration with accent color presets
export type AccentColor = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber' | 'cyan' | 'teal' | 'fuchsia' | 'indigo';

export interface ThemeColors {
  accent: string;
  accentLight: string;
  accentDark: string;
  accentRgb: string;
}

export const accentColors: Record<AccentColor, ThemeColors> = {
  blue: {
    accent: '#3b82f6',
    accentLight: '#60a5fa',
    accentDark: '#2563eb',
    accentRgb: '59, 130, 246',
  },
  purple: {
    accent: '#8b5cf6',
    accentLight: '#a78bfa',
    accentDark: '#7c3aed',
    accentRgb: '139, 92, 246',
  },
  emerald: {
    accent: '#10b981',
    accentLight: '#34d399',
    accentDark: '#059669',
    accentRgb: '16, 185, 129',
  },
  rose: {
    accent: '#f43f5e',
    accentLight: '#fb7185',
    accentDark: '#e11d48',
    accentRgb: '244, 63, 94',
  },
  amber: {
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    accentDark: '#d97706',
    accentRgb: '245, 158, 11',
  },
  cyan: {
    accent: '#06b6d4',
    accentLight: '#22d3ee',
    accentDark: '#0891b2',
    accentRgb: '6, 182, 212',
  },
  teal: {
    accent: '#14b8a6',
    accentLight: '#2dd4bf',
    accentDark: '#0d9488',
    accentRgb: '20, 184, 166',
  },
  fuchsia: {
    accent: '#d946ef',
    accentLight: '#e879f9',
    accentDark: '#c026d3',
    accentRgb: '217, 70, 239',
  },
  indigo: {
    accent: '#6366f1',
    accentLight: '#818cf8',
    accentDark: '#4f46e5',
    accentRgb: '99, 102, 241',
  },
};

export const lightTheme = {
  background: '#ffffff',
  foreground: '#0f172a',
  card: '#f8fafc',
  cardForeground: '#1e293b',
  muted: '#f1f5f9',
  mutedForeground: '#64748b',
  border: '#cbd5e1',
};

export const darkTheme = {
  background: '#0a0a0f',
  foreground: '#f8fafc',
  card: '#151520',
  cardForeground: '#e2e8f0',
  muted: '#1e1e2e',
  mutedForeground: '#94a3b8',
  border: '#2d2d3d',
};

export const defaultAccent: AccentColor = 'rose';
export const defaultTheme: 'light' | 'dark' = 'dark';
