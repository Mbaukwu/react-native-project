import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { ReactNode } from "react";

type ScreenWrapperProps = {
  children: ReactNode;
  className?: string;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
};

export default function ScreenWrapper({ children, className = "bg-background", scrollable = false, keyboardAvoiding = false }: ScreenWrapperProps) {
  // Regular content
  if (!scrollable && !keyboardAvoiding) {
    return <View className={`flex-1 ${className}`}>{children}</View>;
  }

  // Scrollable only
  if (scrollable && !keyboardAvoiding) {
    return (
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View className={className}>{children}</View>
      </ScrollView>
    );
  }

  // Keyboard avoiding (with or without scroll)
  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {scrollable ? (
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className={className}>{children}</View>
          </ScrollView>
        ) : (
          <View className={`flex-1 ${className}`}>{children}</View>
        )}
      </KeyboardAvoidingView>
    );
  }

  // Fallback
  return <View className={`flex-1 ${className}`}>{children}</View>;
}
