// hooks/notification/useNotificationHandler.ts
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

export const useNotificationHandler = () => {
  const { push } = useRouter();

  useEffect(() => {
    // Handle tap on notification while app is open
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const screen = response.notification.request.content.data?.screen;
        if (screen === 'bookings') {
          push('/(tabs)/bookings');
        }
      }
    );

    return () => subscription.remove();
  }, []);
};