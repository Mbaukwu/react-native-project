import { useRouter } from "expo-router";
import { IS_NEW_USER_KEY, storage } from "@/constants/mmkvStore";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import {SignInForm, SignInFormData}from "@/components/ui/forms/form-component/SignInFormComponent";
import { BackHandler } from "react-native";


const WelcomeScreen = () => {
    const { replace } = useRouter();
  storage.remove(IS_NEW_USER_KEY)
    
  const isNewUser = storage.getString(IS_NEW_USER_KEY);
    
setTimeout(() => {
    if (isNewUser) {
      replace("/(tabs)/home");
    }
}, 500);
   
    
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); 
  }, []);

   const handleSignIn = (data: SignInFormData) => {
    console.log(data);
    storage.set(IS_NEW_USER_KEY, "newUser");
    replace("/(tabs)/home");
  };
   
    return (
        <>
            {!isNewUser ? (
                <>
                <View className="h-full bg-amber-400 justify-center items-center ">
                    <Text className=" text-4xl text-center text-slate-900 font-bold uppercase font-roboto mb-30 ">
                        Welcome to my App
                    </Text>
   
                <Text className="text-2xl text-slate-800 text-center uppercase mb-3 font-semibold bg-amber-400 p-2">Sign In Here</Text>
                        <SignInForm onSubmit={handleSignIn} className={'bg-slate-700 p-6 ' }/>
                    </View>
                    </>
            ) : (
                <></>
            )}
        </>
    )
}
export default WelcomeScreen