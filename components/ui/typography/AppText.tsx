import { Text, TextProps } from "react-native";
import React from "react";

type TAppText = TextProps & {
  variant?: "regular" | "bold" | "semiBold" | "medium" | "serif";
};
const fontVariants = {
  regular: "font-dm-sans",
  bold: "font-dm-sans-bold",
  semiBold: "font-dm-sans-semiBold",
  medium: "font-dm-sans-medium",
  serif: "font-dm-serif",
};
export default function AppText({ children, className, variant = "regular", ...rest }: TAppText) {
  return (
    <Text className={`${fontVariants[variant]} ${className ?? ""}`} {...rest}>
      {children}
    </Text>
  );
}
