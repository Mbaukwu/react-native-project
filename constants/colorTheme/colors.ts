const palette = {
  // Brand – Blue primary + orange accent mix
  bluePrimary: '#006CFF',
  bluePrimaryDeep: '#0055CC',
  bluePrimaryLight: '#60A5FA',
  accentOrange: '#FF9500',
  accentGold: '#FBBF24',

  // Light surfaces
  whitePure: '#FFFFFF',
  offWhiteSoft: '#F8FAFC',
  inputLight: '#F1F5F9',
  borderLight: '#E2E8F0',

  // Dark surfaces
  slateDark: '#0F172A',
  slateCard: '#1E293B',
  slateInput: '#334155',
  borderDark: '#475569',

  // Text
  textDark: '#0F172A',
  textSecondaryDark: '#475569',
  textDisabledDark: '#94A3B8',
  textLight: '#F1F5F9',
  textSecondaryLight: '#CBD5E1',
  textDisabledLight: '#94A3B8',

  // Onboarding
  onboardingLight: '#1A44C2',
  onboardingDark: '#0F2D6B',
  onboardingTextSecondary: '#BFDBFE',
  onboardingButton: '#FBBF24',

  // Status
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  // Base
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const Colors = {
  light: {
    // Brand
    primary: palette.bluePrimary,
    primaryPressed: palette.bluePrimaryDeep,
    primarySoft: 'rgba(0, 108, 255, 0.12)',

    // Surfaces
    background: palette.whitePure,
    card: palette.offWhiteSoft,
    inputBackground: palette.inputLight,
    border: palette.borderLight,

    // Text
    text: palette.textDark,
    textSecondary: palette.textSecondaryDark,
    textDisabled: palette.textDisabledDark,
    white: palette.white,

    // Accents
    accent: palette.accentOrange,
    gold: palette.accentGold,

    // Icons & Tabs
    icon: palette.textSecondaryDark,
    tabIconDefault: palette.textSecondaryDark,
    tabIconSelected: palette.bluePrimary,

    // Onboarding
    onboardingBg: palette.onboardingLight,
    onboardingText: palette.white,
    onboardingTextSecondary: palette.onboardingTextSecondary,
    onboardingButton: palette.onboardingButton,
    onboardingButtonText: palette.onboardingLight,
    onboardingDotActive: palette.onboardingButton,
    onboardingDotInactive: 'rgba(255,255,255,0.3)',
    onboardingSkip: palette.onboardingTextSecondary,

    // Misc
    overlay: 'rgba(15, 23, 42, 0.5)',
    success: palette.success,
    error: palette.error,
    warning: palette.warning,
  },

  dark: {
    // Brand
    primary: palette.bluePrimaryLight,
    primaryPressed: palette.bluePrimaryDeep,
    primarySoft: 'rgba(96, 165, 250, 0.20)',

    // Surfaces
    background: palette.slateDark,
    card: palette.slateCard,
    inputBackground: palette.slateInput,
    border: palette.borderDark,

    // Text
    text: palette.textLight,
    textSecondary: palette.textSecondaryLight,
    textDisabled: palette.textDisabledLight,

    // Accents
    accent: palette.accentGold,
    gold: palette.accentGold,

    // Icons & Tabs
    icon: palette.textSecondaryLight,
    tabIconDefault: palette.textSecondaryLight,
    tabIconSelected: palette.bluePrimaryLight,

    // Onboarding
    onboardingBg: palette.onboardingDark,
    onboardingText: palette.white,
    onboardingTextSecondary: palette.onboardingTextSecondary,
    onboardingButton: palette.onboardingButton,
    onboardingButtonText: palette.onboardingDark,
    onboardingDotActive: palette.onboardingButton,
    onboardingDotInactive: 'rgba(255,255,255,0.3)',
    onboardingSkip: palette.onboardingTextSecondary,

    // Misc
    overlay: 'rgba(0, 0, 0, 0.7)',
    success: palette.success,
    error: palette.error,
    warning: palette.warning,
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = typeof Colors.light;