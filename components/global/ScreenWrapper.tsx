import { View, KeyboardAvoidingView, Platform } from "react-native";
import React, { ReactNode } from "react";

type ScreenWrapperProps = {
  children: ReactNode;
  className?: string;
  keyboardAvoiding?: boolean;
};

export default function ScreenWrapper({ children, className = "", keyboardAvoiding = false }: ScreenWrapperProps) {
  // Regular content
  if (!keyboardAvoiding) {
    return <View className={`flex-1 bg-background ${className}`}>{children}</View>;
  }

  // Keyboard avoiding
  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View className={`flex-1 bg-background ${className}`}>{children}</View>
      </KeyboardAvoidingView>
    );
  }

  // Fallback
  return <View className={`flex-1 bg-background ${className}`}>{children}</View>;
}

