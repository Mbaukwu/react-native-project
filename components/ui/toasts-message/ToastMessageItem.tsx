// ─────────────────────────────────────────────────────────────
// ToastMessageItem Component
// Screen: Global Toast UI
// Handles: Custom toast layout (success / error)
// Depends on: React Native, Tailwind classes (NativeWind)
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import React from "react";
import { Text, View } from "react-native";

// ── Types ────────────────────────────────────────────────────
interface ToastMessageItemProps {
  type: "success" | "error";
  text1: string;
  text2: string;
}

// ── Component ────────────────────────────────────────────────
export const ToastMessageItem = ({
  type,
  text1,
  text2,
}: ToastMessageItemProps) => {

  // ── Background Style Resolver ─────────────────────────────
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50";
      case "error":
        return "bg-red-50";
      default:
        return "bg-green-50";
    }
  };

  // ── Border Style Resolver ──────────────────────────────────
  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-green-600";
      case "error":
        return "border-red-500";
      default:
        return "border-border";
    }
  };

  // ── Icon Resolver ──────────────────────────────────────────
  const getIcon = () => {
    switch (type) {
      case "success":
        return "❤️";
      case "error":
        return "💔";
      default:
        return "✓";
    }
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <View
      style={{
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      className={`${getBackgroundColor()} ${getBorderColor()}`}
    >

      {/* ICON SECTION */}
      <Text className="text-2xl mr-3">{getIcon()}</Text>

      {/* TEXT SECTION */}
      <View className="flex-1">
        <Text className="text-base font-bold text-black mb-1">
          {text1}
        </Text>
        <Text className="text-sm text-gray-700" numberOfLines={1}>
          {text2}
        </Text>
      </View>

    </View>
  );
};