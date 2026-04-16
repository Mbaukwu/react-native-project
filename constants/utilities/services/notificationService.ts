// constants/services/notificationService.ts
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure how notifications appear when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermission = async (): Promise<boolean> => {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

export const setupAndroidChannel = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("bookings", {
      name: "Booking Notifications",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#006CFF",
    });
  }
};

export const sendBookingConfirmedNotification = async (hotelName: string): Promise<void> => {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return;

  await setupAndroidChannel();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Booking Confirmed!  🎉",
      body: `Your stay at ${hotelName} is all set!`,
      data: { screen: "bookings" },
      sound: true,
    },
    trigger: null, // null = show immediately
  });
};
