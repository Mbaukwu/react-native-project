const palette = {
  // Brand
  terracotta: '#E2704A',
  terracottaDeep: '#B5541E',
  terracottaSoft: '#F0956D',
  gold: '#CD853F',
  goldSoft: '#E8B86D',

  // Light surfaces
  creamWhite: '#FAF0E6',
  linenSoft: '#EDE0D4',
  sandLight: '#F2C49B',
  borderLight: '#E8D5C4',

  // Dark/Chocolate surfaces
  chocolate: '#2C1810',        // new primary background
  espresso: '#1A1008',         // deeper than chocolate
  warmDark: '#3D2419',         // sits above chocolate
  borderDark: '#4A2E1E',

  // Text
  inkDark: '#1C0F0A',
  mutedBrown: '#7A5C4E',
  softBrown: '#B09080',
  creamText: '#FAF0E6',
  mutedCream: '#C4A882',
  fadedCream: '#8A7060',

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
    primaryPressed: palette.terracottaDeep,
    primarySoft: palette.terracottaSoft,

    // Surfaces
    background: palette.chocolate,           // rich chocolate brown background
    card: palette.warmDark,                  // cards sit above background
    inputBackground: palette.espresso,       // inputs sit deeper
    border: palette.borderDark,             // warm dark borders

    // Text
    text: palette.creamText,                // cream text on dark background
    textSecondary: palette.mutedCream,      // muted cream for subtitles
    textDisabled: palette.fadedCream,       // faded for disabled/placeholder

    // Accents
    accent: palette.goldSoft,               // gold works beautifully on chocolate
    gold: palette.gold,                     // star ratings, premium badges

    // Icons & Tabs
    icon: palette.mutedCream,
    tabIconDefault: palette.mutedCream,
    tabIconSelected: palette.terracotta,

    // Misc
    overlay: 'rgba(0,0,0,0.5)',
    success: palette.success,
    error: palette.error,
    warning: palette.warning,
  },

  dark: {
    // Brand
    primary: palette.terracotta,
    primaryPressed: palette.terracottaSoft,
    primarySoft: 'rgba(226,112,74,0.15)',

    // Surfaces
    background: palette.espresso,           // deepest — darker than light mode
    card: palette.chocolate,               // cards sit above espresso
    inputBackground: palette.warmDark,     // inputs sit above cards
    border: palette.borderDark,           // subtle dark borders

    // Text
    text: palette.creamText,
    textSecondary: palette.mutedCream,
    textDisabled: palette.fadedCream,

    // Accents
    accent: palette.goldSoft,
    gold: palette.goldSoft,

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