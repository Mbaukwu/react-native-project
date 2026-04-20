// ─────────────────────────────────────────────────────────────
// ToastMessage Component
// Purpose: Global toast configuration (success, error, info)
// Handles: Themed toast UI using react-native-toast-message
// Depends on: react-native-toast-message, theme colors, custom fonts
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import Toast, { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";

import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Component ────────────────────────────────────────────────
export function ToastMessage() {

  // ── Theme Setup ────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Toast Configuration ────────────────────────────────────
  const toastConfig: ToastConfig = {

    // ── SUCCESS TOAST ────────────────────────────────────────
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.success,
          backgroundColor: colors.card,
          borderRadius: 16,
          borderLeftWidth: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 6,
          marginHorizontal: 16,
          height: "auto",
          paddingVertical: 12,
        }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={{
          fontSize: 14,
          fontWeight: "700",
          color: colors.text,
          fontFamily: "DMSans-Bold",
        }}
        text2Style={{
          fontSize: 12,
          color: colors.textSecondary,
          fontFamily: "DMSans-Regular",
        }}
      />
    ),

    // ── ERROR TOAST ─────────────────────────────────────────
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: colors.error,
          backgroundColor: colors.card,
          borderRadius: 16,
          borderLeftWidth: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 6,
          marginHorizontal: 16,
          height: "auto",
          paddingVertical: 12,
        }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={{
          fontSize: 14,
          fontWeight: "700",
          color: colors.text,
          fontFamily: "DMSans-Bold",
        }}
        text2Style={{
          fontSize: 12,
          color: colors.textSecondary,
          fontFamily: "DMSans-Regular",
        }}
      />
    ),

    // ── INFO TOAST ──────────────────────────────────────────
    info: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.primary,
          backgroundColor: colors.card,
          borderRadius: 16,
          borderLeftWidth: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 6,
          marginHorizontal: 16,
          height: "auto",
          paddingVertical: 12,
        }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={{
          fontSize: 14,
          fontWeight: "700",
          color: colors.text,
          fontFamily: "DMSans-Bold",
        }}
        text2Style={{
          fontSize: 12,
          color: colors.textSecondary,
          fontFamily: "DMSans-Regular",
        }}
      />
    ),
  };

  // ── Render ─────────────────────────────────────────────────
  return <Toast config={toastConfig} />;
}