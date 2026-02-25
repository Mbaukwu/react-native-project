import { SignInForm, SignInFormData } from "@/components/forms/form-component/SignInFormComponent";
import { IS_NEW_USER_KEY, storage } from "@/constants/stores/mmkvStore";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { BackHandler, Text, View } from "react-native";

const WelcomeScreen = () => {
  const { replace } = useRouter();
  storage.remove(IS_NEW_USER_KEY);

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

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

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
          <View className="h-full flex bg-pink-700 justify-center items-center ">
            <Text className=" text-4xl text-center text-slate-300 font-bold uppercase font-roboto mb-24 ">Welcome to my App</Text>

            <Text className="text-3xl text-slate-300 text-center uppercase mb-4 font-semibold bg-pink-800 p-2">Sign In Here</Text>
            <SignInForm onSubmit={handleSignIn} className={"bg-pink-300 text-black p-6 "} />
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default WelcomeScreen;
