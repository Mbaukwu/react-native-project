import { IS_NEW_USER_KEY, storage } from "@/constants/stores/mmkvStore";
import { Colors } from "@/constants/colorTheme/colors";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

type TonBoardingData = {
  image: number;
  title: string;
  description: string;
}[];

const onBoardingData: TonBoardingData = [
  {
    image:require("../assets/images/onboarding-images/slide1.svg"),
    title: "Nigeria's Finest Hotels, One Tap Away",
    description: "From luxury suites in Lagos to serene getaways in Abuja",
  },
  {
    image: require("../assets/images/onboarding-images/slide2.svg"),
    title: "Explore Hundreds of Hotels",
    description: "Browse real photos, amenities and prices before you decide anything",
  },
  {
    image: require("../assets/images/onboarding-images/slide3.svg"),
    title: "Your Stay, Your Way",
    description: "Book your perfect room in seconds and get instant confirmation",
  },
];

const { width } = Dimensions.get("window");

const WelcomeScreen = () => {
  const { replace } = useRouter();
  const [slide, setSlide] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);
  
 storage.remove(IS_NEW_USER_KEY);

  const isNewUser = storage.getString(IS_NEW_USER_KEY);

  const goToHome = () => {
    storage.set(IS_NEW_USER_KEY, "returning");
    replace("/(tabs)/home");
  };

  const handleNext = () => {
    if (slide === onBoardingData.length - 1) {
      goToHome();
    } else {
      const nextSlide = slide + 1;
      setSlide(nextSlide);
      scrollRef.current?.scrollTo({ x: width * nextSlide, animated: true });
    }
  };
setTimeout(() => {
    if (isNewUser) {
      replace("/(tabs)/home");
    }
  }, 500);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => backHandler.remove();
  }, []);

  return (
    <>
      {!isNewUser ? (
        <View style={{ flex: 1, backgroundColor: Colors.light.background }}>

          <TouchableOpacity
            onPress={goToHome}
            style={{ position: "absolute", top: 52, right: 24, zIndex: 10 }}
          >
            <Text style={{ color: Colors.light.textSecondary, fontSize: 14 }}>Skip</Text>
          </TouchableOpacity>

          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
          >
            {onBoardingData.map((item, index) => (
              <View key={index} style={{ width, flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
                <Image
                  source={item.image}
                  style={{ width: width * 0.7, height: width * 0.7, resizeMode: "contain" }}
                />
                <Text style={{ fontSize: 24, fontWeight: "700", color: Colors.light.text, textAlign: "center", marginTop: 32 }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 16, color: Colors.light.textSecondary, textAlign: "center", marginTop: 12, lineHeight: 24 }}>
                  {item.description}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 24 }}>
            {onBoardingData.map((_, index) => (
              <View
                key={index}
                style={{
                  width: index === slide ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: index === slide ? Colors.light.primary : Colors.light.textDisabled,
                }}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: Colors.light.primary,
              marginHorizontal: 24,
              marginBottom: 48,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: Colors.light.white, fontSize: 16, fontWeight: "600" }}>
              {slide === onBoardingData.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>

        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default WelcomeScreen;