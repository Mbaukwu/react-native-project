import { IS_NEW_USER_KEY, storage } from "@/constants/stores/mmkvStore";
import { IonBoardingData } from "@/constants/types-interface/onBoardScreenTypes";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { BackHandler, ScrollView, useWindowDimensions } from "react-native";

const onBoardingData: IonBoardingData[] = [
  {
    image: require("@/assets/images/onboarding-images/hotel.jpg"),
    title: "Nigeria's Finest Hotels, One Tap Away!",
    description: "From luxury suites in Lagos to serene getaways in Abuja",
  },
  {
    image: require("@/assets/images/onboarding-images/slide2.jpg"),
    title: "Explore Hundreds of Hotels",
    description: "Browse real photos, amenities and prices before you decide anything",
  },
  {
    image: require("@/assets/images/onboarding-images/slide4.jpg"),
    title: "Your Stay, Your Way!",
    description: "Book your perfect room in seconds and get instant confirmation",
  },
];

export function useOnboarding() {
  const { width } = useWindowDimensions();
  const { replace } = useRouter();

  // ─── State ───────────────────────────────────────────────────────────
  const [slide, setSlide] = useState<number>(0);
  const scrollRef = useRef<ScrollView | null>(null);

  // ─── Storage ──────────────────────────────────
  const isNewUser = storage.getString(IS_NEW_USER_KEY);

  // ─── Navigation Actions ───────────────────────────
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
  // ─── Side Effects ──────────────────────────────────────────────────────

  // Prevents the back button from closing app during onboarding
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => backHandler.remove();
  }, []);
  //Auto-redirect returning users
  useEffect(() => {
    if (!isNewUser) return;

    const timer = setTimeout(() => replace("/(tabs)/home"), 500);

    return () => clearTimeout(timer);
  }, [isNewUser, replace]);
  return { handleNext, goToHome, isNewUser, width, setSlide, onBoardingData, slide, scrollRef };
}
