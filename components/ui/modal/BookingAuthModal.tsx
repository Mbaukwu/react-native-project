import React from "react";
import { Pressable, View, Dimensions } from "react-native";
import { useMagicModal } from "react-native-magic-modal";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";

const { width } = Dimensions.get("window");

type BookingAuthModalProps = {
  onSignIn: () => void;
  onSignUp: () => void;
  onCancel: () => void;
};

export const BookingAuthModal = ({ onSignIn, onSignUp, onCancel }: BookingAuthModalProps) => {
  const { hide } = useMagicModal();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const handleSignIn = () => {
    hide();
    onSignIn();
  };

  const handleSignUp = () => {
    hide();
    onSignUp();
  };

  const handleCancel = () => {
    hide();
    onCancel();
  };

  return (
    <Pressable className="flex-1 bg-black/50 justify-center items-center px-6" onPress={() => { }}
    >
      <View style={{ width: width - 48 }} className="bg-card rounded-3xl overflow-hidden border border-border">
        <View className="bg-primary/10 items-center py-8 px-6">
          <View className="bg-primary/15 p-5 rounded-full">
            <IconSymbol name="lock.fill" size={36} color={colors.primary} />
          </View>
          <AppText className="text-text text-xl mt-4 text-center" variant="bold">
            Sign In Required
          </AppText>
          <AppText className="text-text-secondary text-sm text-center mt-2 leading-5">
            Please sign in to complete your booking
          </AppText>
        </View>

        <View className="border-t border-border" />

        <View className="px-6 py-5 gap-3">
          <Pressable
            onPress={handleSignIn}
            className="bg-primary py-4 rounded-2xl items-center"
          >
            <AppText className="text-white text-base" variant="bold">
              Sign In
            </AppText>
          </Pressable>

          <Pressable
            onPress={handleSignUp}
            className="py-4 rounded-2xl items-center border border-border"
          >
            <AppText className="text-text text-base" variant="bold">
              Create Account
            </AppText>
          </Pressable>

          <Pressable onPress={handleCancel} className="py-2 items-center">
            <AppText className="text-text-disabled text-sm">
              Cancel
            </AppText>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};