import { useColorScheme } from "react-native";
import { Colors } from "@/constants/colorTheme/colors";

export const useThemeColors = () => {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return { colors, colorScheme, isDark: colorScheme === "dark" };
};