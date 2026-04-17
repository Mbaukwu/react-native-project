import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { ReactNode } from "react";

type ScreenWrapperProps = {
  children: ReactNode;
  className?: string;
  keyboardAvoiding?: boolean;
  scrollable?: boolean;
};

export default function ScreenWrapper({ 
  children, 
  className = "", 
  keyboardAvoiding = false,
  scrollable = false 
}: ScreenWrapperProps) {
  
  const content = <View className={`flex-1 bg-background ${className}`}>{children}</View>;

  // Keyboard avoiding with scroll (for forms)
  if (keyboardAvoiding && scrollable) {
    return (
      <KeyboardAwareScrollView
         style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={0}
        enableOnAndroid={true}
      >
        {content}
      </KeyboardAwareScrollView>
    );
  }

  // Scrollable only (no keyboard avoiding)
  if (scrollable && !keyboardAvoiding) {
    return (
      <KeyboardAwareScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
          extraScrollHeight={0} 
      >
        {content}
      </KeyboardAwareScrollView>
    );
  }

  // Regular content (no scroll, no keyboard avoiding)
  return content;
}