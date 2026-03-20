const palette = {
  // Brand – Blue primary + orange accent mix
  bluePrimary: '#006CFF',         // Vibrant trust blue (light mode CTA)
  bluePrimaryDeep: '#0055CC',     // Darker press/hover
  bluePrimaryLight: '#60A5FA',    // Brighter for dark mode visibility
  accentOrange: '#FF9500',        // Energetic orange for deals/prices
  accentGold: '#FBBF24',          // Warm yellow-orange fallback

  // Light surfaces – Clean & airy
  whitePure: '#FFFFFF',
  offWhiteSoft: '#F8FAFC',        // Very light gray-blue tint for cards
  inputLight: '#F1F5F9',
  borderLight: '#E2E8F0',

  // Dark surfaces – Moody slate
  slateDark: '#0F172A',           // Rich background
  slateCard: '#1E293B',           // Cards layer
  slateInput: '#334155',
  borderDark: '#475569',

  // Text
  textDark: '#0F172A',            // Deep slate on light bg
  textSecondaryDark: '#475569',
  textDisabledDark: '#94A3B8',

  textLight: '#F1F5F9',           // Near-white on dark bg
  textSecondaryLight: '#CBD5E1',
  textDisabledLight: '#94A3B8',

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
    primarySoft: 'rgba(0, 108, 255, 0.12)',  // Subtle blue tint

    // Surfaces
    background: palette.whitePure,           // Clean white base
    card: palette.offWhiteSoft,              // Subtle card elevation
    inputBackground: palette.inputLight,
    border: palette.borderLight,

    // Text
    text: palette.textDark,
    textSecondary: palette.textSecondaryDark,
    textDisabled: palette.textDisabledDark,
    white: palette.white,                    // For text on primary buttons

    // Accents
    accent: palette.accentOrange,            // Pops for prices, "Book now"
    gold: palette.accentGold,                // Stars, badges

    // Icons & Tabs
    icon: palette.textSecondaryDark,
    tabIconDefault: palette.textSecondaryDark,
    tabIconSelected: palette.bluePrimary,

    // Misc
    overlay: 'rgba(15, 23, 42, 0.5)',
    success: palette.success,
    error: palette.error,
    warning: palette.warning,
  },

  dark: {
    // Brand
    primary: palette.bluePrimaryLight,       // Lighter blue pops on dark
    primaryPressed: palette.bluePrimaryDeep, // Consistent darker press
    primarySoft: 'rgba(96, 165, 250, 0.20)', // Softer blue overlay

    // Surfaces
    background: palette.slateDark,           // Deep slate bg
    card: palette.slateCard,
    inputBackground: palette.slateInput,
    border: palette.borderDark,

    // Text
    text: palette.textLight,
    textSecondary: palette.textSecondaryLight,
    textDisabled: palette.textDisabledLight,

    // Accents
    accent: palette.accentGold,              // Bright yellow-orange stands out
    gold: palette.accentGold,

    // Icons & Tabs
    icon: palette.textSecondaryLight,
    tabIconDefault: palette.textSecondaryLight,
    tabIconSelected: palette.bluePrimaryLight,

    // Misc
    overlay: 'rgba(0, 0, 0, 0.7)',
    success: palette.success,
    error: palette.error,
    warning: palette.warning,
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = typeof Colors.light;