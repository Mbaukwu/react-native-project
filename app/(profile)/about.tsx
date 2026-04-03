import { View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";

export default function AboutScreen() {
  const { back } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <ScreenWrapper>
      <ScrollView className="flex-1 px-4 pt-12" showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="flex-row items-center mb-8 gap-3">
          <TouchableOpacity onPress={() => back()} className="p-1">
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <AppText className="text-text text-2xl" variant="bold">About StayEasy</AppText>
        </View>

        {/* Logo area */}
        <View className="items-center mb-8">
          <View className="bg-primary/15 p-6 rounded-3xl mb-4">
            <IconSymbol name="bed.double.fill" size={48} color={colors.primary} />
          </View>
          <AppText className="text-text text-2xl" variant="bold">StayEasy</AppText>
          <AppText className="text-text-secondary text-sm mt-1">Version 1.0.0</AppText>
        </View>

        {/* Mission */}
        <View className="bg-card rounded-2xl border border-border p-5 mb-4">
          <AppText className="text-text text-base mb-2" variant="bold">Our Mission</AppText>
          <AppText className="text-text-secondary leading-6">
            StayEasy was built to make hotel discovery and booking across Nigeria simple, fast and stress-free. We believe finding a great place to stay should never be a complicated process — browse freely, decide confidently, book instantly.
          </AppText>
        </View>

        {/* What we offer */}
        <View className="bg-card rounded-2xl border border-border p-5 mb-4">
          <AppText className="text-text text-base mb-3" variant="bold">What We Offer</AppText>
          {[
            { icon: "magnifyingglass", text: "Browse hotels across 6 Nigerian states without signing up" },
            { icon: "heart.fill", text: "Save your favourite hotels locally or to the cloud" },
            { icon: "calendar", text: "Simple and fast booking with instant confirmation" },
            { icon: "star.fill", text: "Honest ratings and reviews from real guests" },
          ].map((item, index) => (
            <View key={index} className="flex-row items-start gap-3 mb-3">
              <View className="bg-primary/10 p-1.5 rounded-lg mt-0.5">
                <IconSymbol name={item.icon as any} size={14} color={colors.primary} />
              </View>
              <AppText className="text-text-secondary flex-1 leading-5">{item.text}</AppText>
            </View>
          ))}
        </View>

        {/* Built with */}
        <View className="bg-card rounded-2xl border border-border p-5 mb-4">
          <AppText className="text-text text-base mb-2" variant="bold">Built With</AppText>
          <AppText className="text-text-secondary leading-6">
            StayEasy is built with React Native and Expo, powered by Supabase for authentication and data, and designed with a focus on speed, simplicity and a great Nigerian hotel experience.
          </AppText>
        </View>

        {/* Footer */}
        <View className="items-center py-8">
          <AppText className="text-text-disabled text-xs text-center">
            Made with ❤️ in Nigeria
          </AppText>
          <AppText className="text-text-disabled text-xs text-center mt-1">
            © 2026 StayEasy. All rights reserved.
          </AppText>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}