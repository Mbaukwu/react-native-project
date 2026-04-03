import Toast, { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";

export function ToastMessage() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const toastConfig: ToastConfig = {
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

  return <Toast config={toastConfig} />;
}