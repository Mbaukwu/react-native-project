import notifee from '@notifee/react-native';

export const sendBookingNotification = async (hotelName: string, checkIn: string) => {
  try {
    // Create a channel 
    const channelId = await notifee.createChannel({
      id: 'bookings',
      name: 'Booking Notifications',
      importance: 4, // HIGH
      vibration: true,
    });

    // Display the notification
    await notifee.displayNotification({
      title: 'Booking Confirmed! 🎉',
      body: `Your stay at ${hotelName} is confirmed. Check-in: ${checkIn}`,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
      },
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
};