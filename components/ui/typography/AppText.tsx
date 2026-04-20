// ─────────────────────────────────────────────────────────────
// AppText Component
// Screen: Global UI Component
// Handles: Typography abstraction with font variants
// Depends on: React Native Text, Tailwind (NativeWind fonts)
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { Text, TextProps } from "react-native";
import React from "react";

// ── Types ────────────────────────────────────────────────────
type TAppText = TextProps & {
  variant?: "regular" | "bold" | "semiBold" | "medium" | "serif";
};

// ── Font Mapping ─────────────────────────────────────────────
const fontVariants = {
  regular: "font-dm-sans",
  bold: "font-dm-sans-bold",
  semiBold: "font-dm-sans-semiBold",
  medium: "font-dm-sans-medium",
  serif: "font-dm-serif",
};

// ── Component ────────────────────────────────────────────────
export default function AppText({
  children,
  className,
  variant = "regular",
  ...rest
}: TAppText) {

  return (
    <Text
      className={`${fontVariants[variant]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Text>
  );
}