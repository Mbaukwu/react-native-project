// ─────────────────────────────────────────────────────────────
// BookingFormComponent
// Screen: Complete Booking form
// Handles: Auth check, form pre-fill, booking submission
// Depends on: bookingService, wishlistStore, notificationService
// Sub-components: HotelSummaryCard, GuestDetailsSection,
//                 StayDetailsSection, SpecialRequestsSection
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { BookingFormData, bookingSchema } from "@/components/forms/form-validator/bookingFormValidator";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

import GuestDetailsSection from "@/components/ui/booking/booking-form/GuestDetailsSection";
import HotelSummaryCard from "@/components/ui/booking/booking-form/HotelSummaryCard";
import SpecialRequestsSection from "@/components/ui/booking/booking-form/SpecialRequestSection";
import StayDetailsSection from "@/components/ui/booking/booking-form/StayDetailsSection";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BookingAuthModal } from "@/components/ui/modal/BookingAuthModal";
import AppText from "@/components/ui/typography/AppText";

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

// ── Component ────────────────────────────────────────────────
export default function BookingFormComponent() {
  // ── Route Params ───────────────────────────────────────────
  const { hotelId, price, hotelName, roomType } = useLocalSearchParams<{
    hotelId: string;
    price: string;
    hotelName: string;
    roomType: string;
  }>();

  // ── Navigation & Theme ─────────────────────────────────────
  const { push, back } = useRouter();
  const { colors } = useThemeColors();

  // ── Global State ───────────────────────────────────────────
  const { userId } = useWishlistStore();
  const queryClient = useQueryClient();

  // ── Local State ────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // ── Form Setup ─────────────────────────────────────────────
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

  // ── Auth Modal Helper ──────────────────────────────────────
  const showAuthModal = () => {
    magicModal.show(() => (
      <BookingAuthModal onSignIn={() => push("/(auth)/signIn")} onSignUp={() => push("/(auth)/signUp")} onCancel={() => back()} />
    ));
  };

  // ── Auth Check + Form Pre-fill ─────────────────────────────
  // Checks if user is signed in on mount.
  // If not — shows auth modal.
  // If yes — pre-fills name and email from session metadata.
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        showAuthModal();
        setLoadingUser(false);
        return;
      }

      const user = data.session.user;
      setValue("guestEmail", user.email ?? "", { shouldValidate: false });
      setValue("guestName", user.user_metadata?.full_name ?? user.user_metadata?.name ?? "", { shouldValidate: false });
      setLoadingUser(false);
    };

    checkAuth();
  }, []);

  // ── Submit Handler ─────────────────────────────────────────
  // Creates booking in Supabase, fires notification,
  // invalidates bookings cache, then navigates to confirmation.
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

      // Fire and forget — notification failure shouldn't block UX
      sendBookingConfirmedNotification(hotelName).catch(console.error);

      // Refresh bookings list in background
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

  // ── Loading Guard ──────────────────────────────────────────
  if (loadingUser) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  // ── Render ─────────────────────────────────────────────────
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

        {/* Hotel Summary */}
        <HotelSummaryCard hotelName={hotelName ?? ""} roomType={roomType ?? ""} price={price ?? "0"} />

        {/* Guest Details — name, email, phone */}
        <GuestDetailsSection control={control} errors={errors} />

        {/* Stay Details — check-in, check-out, guests */}
        <StayDetailsSection control={control} errors={errors} watch={watch} setValue={setValue} />

        {/* Special Requests — optional */}
        <SpecialRequestsSection control={control} />

        {/* Submit */}
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
