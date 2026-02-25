import React, { ReactNode } from "react";
import { Pressable, Text, View, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signInFormValidator} from "../form-validator/signInFormValidator"

export type SignInFormData = {
  name: string;
  email: string;
  password: string;
};

type SignInFormProps = {
  onSubmit: (data: SignInFormData) => void;
  className?:string
};

export const SignInForm = ({ onSubmit,className }: SignInFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormValidator),
    defaultValues: {
      name:"",
      email: "",
      password: "",
    },
  });

  return (
    <View className={`w-full max-w-sm font-roboto ${className}`}>
     
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-full px-4 py-3 border border-gray-600 rounded-lg mb-2 font-semibold"
            placeholder="Name"
            placeholderTextColor="#000" 
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
           
            
          />
        )}
        name="name"
      />
      {errors.name && <Text className="text-red-500 mb-4">{errors.name.message}</Text>}
<Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-full px-4 py-3 border border-gray-600 rounded-lg mb-2 font-semibold"
            placeholder="Email"
             placeholderTextColor="#000" 
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email && <Text className="text-red-500 mb-4">{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-full px-4 py-3 border border-gray-600 rounded-lg mb-2 font-semibold"
            placeholder="Password"
             placeholderTextColor="#000" 
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            
          />
        )}
        name="password"
      />
      {errors.password && <Text className="text-red-500 mb-4">{errors.password.message}</Text>}

      <Pressable className="mt-4 bg-cyan-800 py-3 rounded-lg" onPress={handleSubmit(onSubmit)}>
        <Text className="text-xl font-bold text-white text-center">Sign In</Text>
      </Pressable>
    </View>
  );
};



