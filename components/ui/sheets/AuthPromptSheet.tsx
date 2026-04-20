// ─────────────────────────────────────────────────────────────
// AuthPromptSheet
// UI Component: Action sheet prompting user to sign in or save locally
// Purpose: Handles auth prompt before saving favourites
// Depends on: react-native-actions-sheet, expo-router, theme system
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";


// ── Props ───────────────────────────────────────────────────
type AuthPromptSheetProps = {
  payload: {
    onLocalSave: () => void;
  };
  sheetId?: string;
};

// ── Component ────────────────────────────────────────────────
export default function AuthPromptSheet({ payload, sheetId }: AuthPromptSheetProps) {

  // ── Navigation & Theme ─────────────────────────────────────
  const { push } = useRouter();
   const {colors}= useThemeColors()

  // ── Handlers ───────────────────────────────────────────────
  const handleSignIn = () => {
    SheetManager.hide(sheetId || "auth-prompt");
    push("/(auth)/signIn");
  };

  const handleLocalSave = () => {
    SheetManager.hide(sheetId || "auth-prompt");
    payload.onLocalSave();
  };

  const handleClose = () => {
    SheetManager.hide(sheetId || "auth-prompt");
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <ActionSheet
      id={sheetId || "auth-prompt"}
      gestureEnabled={true}
      closable={false}
      containerStyle={{
        backgroundColor: colors.card,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 0,
      }}
      indicatorStyle={{
        width: 40,
        height: 4,
        backgroundColor: colors.border,
        borderRadius: 2,
        marginTop: 10,
        marginBottom: 15,
      }}
    >
      {/* ── Content ───────────────────────────────────────── */}
      <View className="px-5 pb-4">

        {/* ── Header ───────────────────────────────────────── */}
        <View className="items-center">
          <View className="bg-primary/15 p-4 rounded-full">
            <IconSymbol name="heart.fill" size={32} color={colors.favorite} />
          </View>

          <AppText className="text-text text-xl mt-4 text-center" variant="bold">
            Save to Favourites
          </AppText>

          <AppText className="text-text-secondary text-sm text-center mt-2 leading-5">
            Sign in to save hotels and access them from any device, anytime.
          </AppText>
        </View>

        {/* ── Actions ──────────────────────────────────────── */}
        <View className="gap-3 mt-6">

          <TouchableOpacity
            onPress={handleSignIn}
            className="bg-primary py-3 rounded-2xl items-center"
            activeOpacity={0.8}
          >
            <AppText className="text-white text-base" variant="bold">
              Sign In
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLocalSave}
            className="py-3.5 rounded-2xl items-center border border-border"
            activeOpacity={0.8}
          >
            <AppText className="text-text text-base" variant="bold">
              Save Locally
            </AppText>

            <AppText className="text-text-secondary text-xs mt-0.5">
              Save now, sign in later
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleClose}
            className="py-2 items-center"
          >
            <AppText className="text-text-disabled text-sm">
              Not now
            </AppText>
          </TouchableOpacity>

        </View>
      </View>
    </ActionSheet>
  );
}