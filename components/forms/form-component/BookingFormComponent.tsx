import { BookingFormData, bookingSchema } from "@/components/forms/form-validator/bookingFormValidator";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import GuestDetailsSection from "@/components/ui/booking/booking-form/GuestDetailsSection";
import HotelSummaryCard from "@/components/ui/booking/booking-form/HotelSummaryCard";
import SpecialRequestsSection from "@/components/ui/booking/booking-form/SpecialRequestSection";
import StayDetailsSection from "@/components/ui/booking/booking-form/StayDetailsSection";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BookingAuthModal } from "@/components/ui/modal/BookingAuthModal";
import AppText from "@/components/ui/typography/AppText";
import { Colors } from "@/constants/colorTheme/colors";
import { useWishlistStore } from "@/constants/stores/wishlistStore";
import { createBooking } from "@/constants/supabase/services/bookingService";
import { supabase } from "@/constants/supabase/supabase";
import { sendBookingConfirmedNotification } from "@/constants/utilities/services/notificationService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { magicModal } from "react-native-magic-modal";
import Toast from "react-native-toast-message";






// 
export default function BookingFormComponent() {
  const { hotelId, price, hotelName, roomType } = useLocalSearchParams<{
    hotelId: string;
    price: string;
    hotelName: string;
    roomType: string;
  }>();

  const { push, back } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { userId } = useWishlistStore();
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: yupResolver(bookingSchema) as Resolver<BookingFormData>,
    defaultValues: {
      guestName: "",
      guestEmail: "",
      guestPhone: null,
      checkIn: "",
      checkOut: "",
      guests: 1,
      specialRequests: null,
    },
  });

  const showAuthModal = () => {
    magicModal.show(() => (
      <BookingAuthModal onSignIn={() => push("/(auth)/signIn")} onSignUp={() => push("/(auth)/signUp")} onCancel={() => back()} />
    ));
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        showAuthModal();
        setLoadingUser(false);
        return;
      }

      const user = data.session.user;
      const email = user.email ?? "";

      const name = user.user_metadata?.full_name ?? user.user_metadata?.name ?? "";

      setValue("guestEmail", email, { shouldValidate: false });
      setValue("guestName", name, { shouldValidate: false });
      setLoadingUser(false);
    };
    checkAuth();
  }, []);

  const onSubmit = async (data: BookingFormData) => {
    if (!userId) {
      showAuthModal();
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        user_id: userId,
        hotel_id: hotelId,
        room_type: roomType,
        check_in: data.checkIn,
        check_out: data.checkOut,
        guests: data.guests,
        total_price: Number(price.replace(/,/g, "")),
        special_requests: data.specialRequests || undefined,
      });

      // Send notification (fire and forget)
      sendBookingConfirmedNotification(hotelName).catch(console.error);

      queryClient.invalidateQueries({ queryKey: ["user-bookings", userId] });

      push(
        `/(booking)/booking-confirmation?hotelId=${hotelId}&hotelName=${encodeURIComponent(hotelName ?? "")}&price=${price}&checkIn=${data.checkIn}&checkOut=${data.checkOut}&roomType=${encodeURIComponent(roomType ?? "")}&guests=${data.guests}`,
      );
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Booking Failed",
        text2: error?.message ?? "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  if (loadingUser) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <KeyboardAwareScrollView
        className="flex-1 px-4 pt-8"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={100}
        enableOnAndroid={true}
      >
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <AppText className="text-text text-2xl flex-1" variant="bold">
            Complete Booking
          </AppText>
        </View>

        <HotelSummaryCard hotelName={hotelName ?? ""} roomType={roomType ?? ""} price={price ?? "0"} />

        <GuestDetailsSection control={control} errors={errors} />

        <StayDetailsSection control={control} errors={errors} watch={watch} setValue={setValue} />

        <SpecialRequestsSection control={control} />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className="bg-primary py-4 rounded-2xl mb-10 items-center"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <AppText className="text-white text-base" variant="bold">
              Confirm Booking
            </AppText>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
}
