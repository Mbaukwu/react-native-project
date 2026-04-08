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



// import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
// import React, { ReactNode } from "react";

// type ScreenWrapperProps = {
//   children: ReactNode;
//   className?: string;
//   scrollable?: boolean;
//   keyboardAvoiding?: boolean;
// };

// export default function ScreenWrapper({ children, className = "", scrollable = false, keyboardAvoiding = false }: ScreenWrapperProps) {
//   // Regular content
//   if (!scrollable && !keyboardAvoiding) {
//     return <View className={`flex-1 bg-background ${className}`}>{children}</View>;
//   }

//   // Scrollable only
//   if (scrollable && !keyboardAvoiding) {
//     return (
//       <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
//        <View className={`flex-1 bg-background ${className}`}>{children}</View>
//       </ScrollView>
//     );
//   }

//   // Keyboard avoiding (with or without scroll)
//   if (keyboardAvoiding) {
//     return (
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1"
//         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
//       >
//         {scrollable ? (
//           <ScrollView
//             className="flex-1"
//             contentContainerStyle={{ flexGrow: 1 }}
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps="handled"
//           >
//         <View className={`flex-1 bg-background ${className}`}>{children}</View>
//           </ScrollView>
//         ) : (
//          <View className={`flex-1 bg-background ${className}`}>{children}</View>
//         )}
//       </KeyboardAvoidingView>
//     );
//   }

//   // Fallback
//   return <View className={`flex-1 bg-background ${className}`}>{children}</View>;
// }
