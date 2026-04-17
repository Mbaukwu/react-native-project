// // Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // Navigation
  "house.fill": "home",
  "chevron.left": "chevron-left",
  "chevron.right": "chevron-right",
  "chevron.left.forwardslash.chevron.right": "code",

  // Tabs
  magnifyingglass: "search",
  heart: "favorite-border",
  "heart.fill": "favorite",
  "bed.double.fill": "hotel",
  "person.fill": "person",
  "person.crop.circle.fill": "account-circle",

  // Auth & Contact (shared)
  "envelope.fill": "email",
  "lock.fill": "lock",
  "eye.fill": "visibility",
  "eye.slash.fill": "visibility-off",

  // Actions
  "x.circle": "cancel",
  "checkmark.circle.fill": "check-circle",
  plus: "add",
  minus: "remove",

  // Hotel Details
  "location.fill": "location-on",
  "phone.fill": "phone",

  // Booking
  calendar: "event",
  "creditcard.fill": "credit-card",

  // Settings
  "gearshape.fill": "settings",
  "moon.fill": "dark-mode",
  "bell.fill": "notifications",
  "trash.fill": "delete",
  pencil: "edit",

  // Support
  "help.circle.fill": "help",
  "info.circle.fill": "info",
  "document.fill": "description",

  // Misc
 "sparkles": "auto-awesome",
  "star.fill": "star",

  // Section Icons
  "flame.fill": "whatshot", // Special Deals
  // Top Rated / Featured
  "crown.fill": "stars", // Luxury Stays (falls back to star)
  "target" :"track-changes",
 "diamond": "diamond", // Budget Friendly
  // Popular Destinations
  "spa.fill": "spa", // Amenities
  'map.fill': 'map',
'globe': 'language',
'airplane': 'flight',
'beach': 'beach-access',
  'building': 'business',
  'clock.fill': 'access-time',
 'camera.fill': 'camera-alt',
} as const;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
export type IconName = keyof typeof MAPPING;