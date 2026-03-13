const palette = {
  // Brand
  terracotta: '#E2704A',
  terracottaDeep: '#B5541E',
  terracottaSoft: '#F0956D',

  // Light surfaces
  creamWhite: '#FAF0E6',
  linenSoft: '#EDE0D4',
  sandLight: '#F2C49B',
  borderLight: '#E8D5C4',

  // Dark surfaces
  espresso: '#1A1008',
  darkBrown: '#2C1810',
  warmDark: '#3D2419',
  borderDark: '#4A2E1E',

  // Text
  inkDark: '#1C0F0A',
  mutedBrown: '#7A5C4E',
  softBrown: '#B09080',
  creamText: '#FAF0E6',
  mutedCream: '#C4A882',
  fadedCream: '#8A7060',

  // Accent
  gold: '#CD853F',
  goldSoft: '#E8B86D',

  // Status
  success: '#4CAF50',
  error: '#E53935',
  warning: '#FF9800',

  // Base
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const Colors = {
  light: {
    // Brand
    primary: palette.terracotta,
    primaryPressed: palette.terracottaDeep,    // darker on press/tap
    primarySoft: palette.terracottaSoft,        // subtle tint backgrounds

    // Surfaces
    background: palette.creamWhite,            // main screen background
    card: palette.white,                        // card and modal backgrounds
    inputBackground: palette.linenSoft,         // text input fields
    border: palette.borderLight,               // dividers and outlines

    // Text
    text: palette.inkDark,                      // primary readable text
    textSecondary: palette.mutedBrown,          // subtitles, captions
    textDisabled: palette.softBrown,            // disabled or placeholder text

    // Accents
    accent: palette.sandLight,                  // chips, tags, highlights
    gold: palette.gold,                         // star ratings, premium badges

    // Icons & Tabs
    icon: palette.mutedBrown,
    tabIconDefault: palette.mutedBrown,
    tabIconSelected: palette.terracotta,

    // Misc
    overlay: 'rgba(0,0,0,0.4)',
    success: palette.success,
    error: palette.error,
    warning: palette.warning,
  },

  dark: {
    // Brand
    primary: palette.terracotta,               // stays consistent — brand identity
    primaryPressed: palette.terracottaSoft,    // lighter on press in dark mode
    primarySoft: 'rgba(226,112,74,0.15)',       // subtle tint on dark surfaces

    // Surfaces
    background: palette.espresso,              // darkest — main screen background
    card: palette.darkBrown,                   // cards sit above background
    inputBackground: palette.warmDark,         // inputs sit above cards
    border: palette.borderDark,               // subtle dark borders

    // Text
    text: palette.creamText,                   // primary readable text
    textSecondary: palette.mutedCream,         // subtitles, captions
    textDisabled: palette.fadedCream,          // disabled or placeholder text

    // Accents
    accent: palette.goldSoft,                  // warmer gold works better on dark
    gold: palette.goldSoft,                    // star ratings, premium badges

    // Icons & Tabs
    icon: palette.mutedCream,
    tabIconDefault: palette.mutedCream,
    tabIconSelected: palette.terracotta,

    // Misc
    overlay: 'rgba(0,0,0,0.7)',
    success: palette.success,
    error: palette.error,
    warning: palette.warning,
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = typeof Colors.light;