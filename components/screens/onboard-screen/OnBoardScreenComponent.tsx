// ─────────────────────────────────────────────────────────────
// OnboardScreenComponent
// Screen: App onboarding flow
// Shows: onboarding slides, progress dots, skip, next/get started CTA
// Depends on: useOnboarding hook, onboarding data, MMKV storage flag
// ─────────────────────────────────────────────────────────────

import { IS_NEW_USER_KEY, storage } from "@/constants/stores/mmkvStore";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useOnboarding } from "@/components/hooks/onboarding-hooks/useOnboarding";
import AppText from "@/components/ui/typography/AppText";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { Colors } from "@/constants/colorTheme/colors";

// ── Component ────────────────────────────────────────────────
const OnboardScreenComponent = () => {

  // ── Hook Data ─────────────────────────────────────────────
  const {
    isNewUser,
    goToHome,
    handleNext,
    setSlide,
    onBoardingData,
    width,
    slide,
    scrollRef
  } = useOnboarding();

  // ── Theme ────────────────────────────────────────────────
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  // storage.remove(IS_NEW_USER_KEY);

  return (
    <>
      {!isNewUser ? (
        <View className="flex-1 bg-onboarding-bg">

          {/* ── Skip Button ─────────────────────────────── */}
          <TouchableOpacity onPress={goToHome} className="absolute top-13 right-6 z-10">
            <AppText className="text-onboarding-text-secondary text-sm">
              Skip
            </AppText>
          </TouchableOpacity>

          {/* ── Slides ──────────────────────────────────── */}
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            className="flex-1"
            onScroll={(e) => {
              const currentSlide = Math.round(e.nativeEvent.contentOffset.x / width);
              setSlide(currentSlide);
            }}
            scrollEventThrottle={16}
          >
            {onBoardingData.map((item, index) => (
              <View
                key={index}
                style={{ width }}
                className="flex-1 items-center justify-center px-6 font-bold"
              >
                <Image
                  source={item.image}
                  style={{ width: width * 0.8, height: width * 0.7 }}
                  resizeMode="cover"
                  className="rounded-2xl"
                />
                <AppText className="text-2xl text-onboarding-text text-center mt-3" variant="serif">
                  {item.title}
                </AppText>
                <AppText className="text-base text-onboarding-text-secondary mt-1.5 text-center leading-6">
                  {item.description}
                </AppText>
              </View>
            ))}
          </ScrollView>

          {/* ── Progress Dots ───────────────────────────── */}
          <View className="flex-row justify-center items-center gap-2 mb-6">
            {onBoardingData.map((_, index) => {
              const isActive = index === slide;
              return (
                <View
                  key={index}
                  style={{
                    width: isActive ? 28 : 10,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: isActive
                      ? theme.onboardingDotActive
                      : theme.onboardingDotInactive,
                    opacity: isActive ? 1 : 0.6,
                  }}
                />
              );
            })}
          </View>

          {/* ── Next / Get Started Button ───────────────── */}
          <TouchableOpacity
            onPress={handleNext}
            className="bg-onboarding-button mx-6 mb-12 py-4 rounded-xl items-center active:bg-primary-pressed"
          >
            <AppText className="text-onboarding-button-text text-base font-dm-sans-bold text-center">
              {slide === onBoardingData.length - 1 ? "Get Started" : "Next"}
            </AppText>
          </TouchableOpacity>

        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default OnboardScreenComponent;