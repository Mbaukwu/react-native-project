import { IS_NEW_USER_KEY, storage } from "@/constants/stores/mmkvStore";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useOnboarding } from "@/components/hooks/onboarding-hooks/useOnboarding";
import AppText from "@/components/ui/typography/AppText";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { Colors } from "@/constants/colorTheme/colors";




const OnboardScreen = () => {
  const { isNewUser, goToHome, handleNext, setSlide, onBoardingData, width, slide,scrollRef } = useOnboarding();
const colorScheme = useColorScheme(); // 'light' | 'dark' | null
const theme = Colors[colorScheme ?? 'light']; // fallback to light
  storage.remove(IS_NEW_USER_KEY);

  return (
    <>
      {!isNewUser ? (
        <View className="flex-1 bg-background">
          {/* Skip Button */}
          <TouchableOpacity onPress={goToHome} className="absolute top-13 right-6 z-10">
            <AppText className="text-text-secondary text-sm ">Skip</AppText>
          </TouchableOpacity>

          {/* Slides */}
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
              <View key={index} style={{ width }}  className=" flex-1 items-center justify-center px-6 font-bold">
                <Image source={item.image}  style={{ width: width * 0.9, height: width * 0.7 }} resizeMode="cover" className="rounded-2xl"/>
                <AppText className="text-3xl text-text  text-center mt-3" variant="serif">{item.title}</AppText>
                <AppText className="text-base text-text-secondary mt-3 text-center leading-6">{item.description}</AppText>
              </View>
            ))}
          </ScrollView>

          {/* Progress Dots */}
          <View className="flex-row justify-center items-center gap-2 mb-6">
            {onBoardingData.map((_, index) => {
              const isActive = index === slide;
              return (
                <View
                  key={index}
                  style={{
                    width: isActive ? 28 : 10,                // slightly wider active for emphasis
                    height: 8,
                    borderRadius: isActive ? 5 : 5,           // pill shape, consistent radius
                    backgroundColor: isActive
                      ? theme.primary                         // vibrant blue
                      : theme.textSecondary,                  // muted gray (e.g. #475569 light / #CBD5E1 dark)
                    opacity: isActive ? 1 : 0.6,              // subtle 
                  }}
                />
              );
              })}
              </View>
  
          {/* Next / Get Started Button */}
          <TouchableOpacity
            onPress={handleNext}
            className={`
    bg-primary mx-6 mb-12 py-4 rounded-xl items-center
    active:bg-primary-pressed  
  `}
          >
            <AppText className="text-white text-base font-dm-sans-bold text-center">{slide === onBoardingData.length - 1 ? "Get Started" : "Next"}</AppText>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default OnboardScreen;
