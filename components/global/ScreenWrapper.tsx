import { View } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

type ScreenWrapperProps = {
  children: ReactNode;
        className?: string;  
}

export default function ScreenWrapper({
    children,
  className = '',
}: ScreenWrapperProps
      

) {
   
    return (
         <SafeAreaView className={`flex-1 `}>
        <View className={` ${className}`}
            >
            {children}
            </View>
            </SafeAreaView>
    );
}