import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function TabTwoScreen() {
  return (
     

   <SafeAreaProvider className=" bg-amber-900" >
      <SafeAreaView  >
        <View className='flex-1 justify-center items-center font-[Roboto]'
        
        >

          <Text className="text-2xl text-center text-black: dark:text-white font-semibold capitalize mb-4 "
          style={{fontFamily: "Playwrite CU Guides", fontSize: 30}}>
            explore screen
          </Text>
        </View>
           
        </SafeAreaView>
   </SafeAreaProvider>
  );
}
