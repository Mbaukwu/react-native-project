// app/hotel/_layout.tsx
import { Stack } from "expo-router";

export default function HotelLayout() {
  return (
    <Stack>
     
      <Stack.Screen 
        name="[id]" 
        options={{ 
          headerShown: false,           
          title: "Hotel Details"       
        }} 
      />

    </Stack>
  );
}                                                      