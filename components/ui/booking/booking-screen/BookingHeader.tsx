import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import AppText from "@/components/ui/typography/AppText";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

type BookingHeaderProps = {
  count: number;
};

export default function BookingHeader({ count }: BookingHeaderProps) {
  const { back } = useRouter();
  const { colors } = useThemeColors();

  return (
    <View className="flex-row items-center mb-4">
      <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
        <IconSymbol name="chevron.left" size={24} color={colors.text} />
      </TouchableOpacity>
      <AppText className="text-text text-[22px] flex-1" variant="bold">
        My Bookings
      </AppText>
      <View className="bg-primary/10 px-3 py-1 rounded-full">
        <AppText className="text-primary text-sm" variant="bold">
          {count} {count === 1 ? "stay" : "stays"}
        </AppText>
      </View>
    </View>
  );
}