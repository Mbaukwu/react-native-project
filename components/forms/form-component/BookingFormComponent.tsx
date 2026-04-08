import { View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { supabase } from "@/constants/supabase/supabase";
import { magicModal } from "react-native-magic-modal";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { useWishlistStore } from "@/constants/stores/wishlistStore";
import { createBooking } from "@/constants/supabase/services/bookingService";
import { bookingSchema, BookingFormData } from "@/components/forms/form-validator/bookingFormValidator";
import { BookingAuthModal } from "@/components/ui/modal/BookingAuthModal";
import DatePickerField from "@/components/ui/booking-form/DatePickerFields";

export default function BookingFormComponent() {
  const { hotelId, price, hotelName, roomType } = useLocalSearchParams();
  const { push, back } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { userId } = useWishlistStore();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
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

  // Check if user is signed in
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        magicModal.show(() => (
          <BookingAuthModal onSignIn={() => push("/(auth)/signIn")} onSignUp={() => push("/(auth)/signUp")} onCancel={() => back()} />
        ));
        setLoadingUser(false);
        return;
      }
      setUserEmail(data.session.user.email ?? "");
      setUserName(data.session.user.user_metadata?.name ?? "");
      setLoadingUser(false);
    };
    checkAuth();
  }, []);

  // Pre-fill form when user data loads
  useEffect(() => {
    if (userName) setValue("guestName", userName);
    if (userEmail) setValue("guestEmail", userEmail);
  }, [userName, userEmail, setValue]);

  // Handle date changes
  const handleCheckInChange = (date: Date, formattedDate: string) => {
    setValue("checkIn", formattedDate);
    // If check-out exists and is before check-in, clear it
    if (getValues("checkOut") && formattedDate > getValues("checkOut")) {
      setValue("checkOut", "");
    }
  };

  const handleCheckOutChange = (date: Date, formattedDate: string) => {
    const checkIn = getValues("checkIn");
    if (checkIn && formattedDate >= checkIn) {
      setValue("checkOut", formattedDate);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!userId) {
      magicModal.show(() => (
        <BookingAuthModal onSignIn={() => push("/(auth)/signIn")} onSignUp={() => push("/(auth)/signUp")} onCancel={() => back()} />
      ));
      return;
    }
    setLoading(true);
    try {
      await createBooking({
        user_id: userId,
        hotel_id: hotelId as string,
        room_type: roomType as string,
        check_in: data.checkIn,
        check_out: data.checkOut,
        guests: data.guests,
        total_price: parseInt(price as string),
        special_requests: data.specialRequests || undefined,
      });
      push(`/(booking)/booking-confirmation?hotelId=${hotelId}&hotelName=${hotelName}&price=${price}`);
    } catch (error) {
      console.error(error);
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
      <ScrollView className="flex-1 px-4 pt-6">
        {/* header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => back()} className="mr-4">
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <AppText className="text-text text-2xl flex-1" variant="bold">
            Complete Booking
          </AppText>
        </View>

        {/* Hotel Summary */}
        <View className="bg-primary/10 rounded-xl p-4 mb-6">
          <AppText className="text-primary text-lg" variant="bold">
            {hotelName}
          </AppText>
          <AppText className="text-text-secondary text-sm mt-1">Room: {roomType}</AppText>
          <AppText className="text-text-secondary text-sm">Total: ₦{price}</AppText>
        </View>

        {/* Guest details */}
        <AppText className="text-text text-lg mb-3" variant="bold">
          Guest Details
        </AppText>
        {/*Full Name */}
        <View className="mb-3">
          <View className={`flex-row items-center bg-card rounded-xl px-4 border ${errors.guestName ? "border-error" : "border-border"}`}>
            <IconSymbol name="person.fill" size={18} color={colors.icon} />
            <Controller
              control={control}
              name="guestName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 text-text ml-3 py-4"
                  placeholder="Full Name"
                  placeholderTextColor={colors.textDisabled}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          {errors.guestName && <AppText className="text-error text-xs mt-1">{errors.guestName.message}</AppText>}
        </View>
        {/* Email */}
        <View className="mb-3">
          <View className={`flex-row items-center bg-card rounded-xl px-4 border ${errors.guestEmail ? "border-error" : "border-border"}`}>
            <IconSymbol name="envelope.fill" size={18} color={colors.icon} />
            <Controller
              control={control}
              name="guestEmail"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 text-text ml-3 py-4"
                  placeholder="Email Address *"
                  placeholderTextColor={colors.textDisabled}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          {errors.guestEmail && <AppText className="text-error text-xs mt-1">{errors.guestEmail.message}</AppText>}
        </View>
        {/* Phone */}
        <View className="mb-6">
          <View className="flex-row items-center bg-card rounded-xl px-4 border border-border">
            <IconSymbol name="phone.fill" size={18} color={colors.icon} />
            <Controller
              control={control}
              name="guestPhone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 text-text ml-3 py-4"
                  placeholder="Phone Number (optional)"
                  placeholderTextColor={colors.textDisabled}
                  keyboardType="phone-pad"
                  value={value || ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
        </View>
        {/* Stay Details */}
        <AppText className="text-text text-lg mb-3" variant="bold">
          Stay Details
        </AppText>
        {/* Check-in  */}
        <DatePickerField
          value={getValues("checkIn")}
          placeholder="Check-in Date *"
          error={errors.checkIn?.message}
          minimumDate={new Date()}
          onDateChange={handleCheckInChange}
        />

        {/* Check-out */}
        <DatePickerField
          value={getValues("checkOut")}
          placeholder="Check-out Date *"
          error={errors.checkOut?.message}
          minimumDate={getValues("checkIn") ? new Date(getValues("checkIn")) : new Date()}
          onDateChange={handleCheckOutChange}
        />

        {/* Guests */}
        <View className="mb-6">
          <View className={`flex-row items-center bg-card rounded-xl px-4 border ${errors.guests ? "border-error" : "border-border"}`}>
            <IconSymbol name="person.fill" size={18} color={colors.icon} />
            <Controller
              control={control}
              name="guests"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 text-text ml-3 py-4"
                  placeholder="Number of Guests *"
                  placeholderTextColor={colors.textDisabled}
                  keyboardType="numeric"
                  value={value?.toString()}
                  onChangeText={(text) => onChange(parseInt(text) || 1)}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          {errors.guests && <AppText className="text-error text-xs mt-1">{errors.guests.message}</AppText>}
        </View>

        {/* Special Requests */}
        <AppText className="text-text text-lg mb-3" variant="bold">
          Special Requests
        </AppText>
        <View className="mb-6">
          <View className="bg-card rounded-xl px-4 border border-border">
            <Controller
              control={control}
              name="specialRequests"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 text-text py-4"
                  placeholder="Any special requests? (optional)"
                  placeholderTextColor={colors.textDisabled}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={value || ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={loading} className="bg-primary py-4 rounded-xl mb-8">
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <AppText className="text-white text-center text-lg" variant="bold">
              Confirm Booking
            </AppText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}
