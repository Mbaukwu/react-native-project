import { View, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { useThemeStore } from "@/constants/stores/themeStore";
import Toast from "react-native-toast-message";

type SettingsRowProps = {
  icon: any;
  label: string;
  onPress: () => void;
  hasBorder?: boolean;
  colors: any;
  rightElement?: React.ReactNode;
};

function SettingsRow({ icon, label, onPress, hasBorder = true, colors, rightElement }: SettingsRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-between p-4 ${hasBorder ? "border-b border-border" : ""}`}
    >
      <View className="flex-row items-center gap-3">
        <IconSymbol name={icon} size={20} color={colors.icon} />
        <AppText className="text-text">{label}</AppText>
      </View>
      {rightElement ?? <IconSymbol name="chevron.right" size={16} color={colors.textDisabled} />}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const { back, push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { isDarkMode, toggleTheme } = useThemeStore();

  const handleDarkModeToggle = (value: boolean) => {
    if (value !== isDarkMode) {
      toggleTheme();
      Toast.show({
        type: "success",
        text1: value ? "Dark mode enabled" : "Light mode enabled",
        text2: value ? "Easy on the eyes 🌙" : "Bright and clear ☀️",
        visibilityTime: 3000,
      });
    }
  };

  const handleComingSoon = (feature: string) => {
    Toast.show({
      type: "info",
      text1: "Coming Soon",
      text2: `${feature} will be available in a future update`,
      visibilityTime: 3000,
    });
  };

  return (
    <ScreenWrapper>
      <ScrollView className="flex-1 px-4 pt-12" showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="flex-row items-center mb-8 gap-3">
          <TouchableOpacity onPress={() => back()} className="p-1">
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <AppText className="text-text text-2xl" variant="bold">Settings</AppText>
        </View>

        {/* Appearance */}
        <AppText className="text-text-secondary text-xs mb-2 px-1 uppercase tracking-wider" variant="bold">
          Appearance
        </AppText>
        <View className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center gap-3">
              <IconSymbol name="moon.fill" size={20} color={colors.icon} />
              <AppText className="text-text">Dark Mode</AppText>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Account */}
        <AppText className="text-text-secondary text-xs mb-2 px-1 uppercase tracking-wider" variant="bold">
          Account
        </AppText>
        <View className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
          <SettingsRow
            icon="person.fill"
            label="Edit Profile"
            onPress={() => handleComingSoon("Edit Profile")}
            colors={colors}
          />
          <SettingsRow
            icon="lock.fill"
            label="Change Password"
            onPress={() => handleComingSoon("Change Password")}
            hasBorder={false}
            colors={colors}
          />
        </View>

        {/* Support */}
        <AppText className="text-text-secondary text-xs mb-2 px-1 uppercase tracking-wider" variant="bold">
          Support
        </AppText>
        <View className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
          <SettingsRow
            icon="help.circle.fill"
            label="Help Center"
            onPress={() => handleComingSoon("Help Center")}
            colors={colors}
          />
          <SettingsRow
            icon="document.fill"
            label="Terms & Privacy"
            onPress={() => handleComingSoon("Terms & Privacy")}
            colors={colors}
          />
          <SettingsRow
            icon="info.circle.fill"
            label="About StayEasy"
            onPress={() => push("/(profile)/about")}
            hasBorder={false}
            colors={colors}
          />
        </View>

        {/* Version */}
        <View className="items-center py-6">
          <AppText className="text-text-disabled text-xs">StayEasy v1.0.0</AppText>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}