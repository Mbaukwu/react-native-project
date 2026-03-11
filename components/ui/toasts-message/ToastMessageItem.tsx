import React from "react";
import { Text, View } from "react-native";

interface ToastMessageItemProps {
    type: "success" | "error";
  text1: string;
  text2: string;
}

export const ToastMessageItem = ({
  type,
  text1,
  text2,
}: ToastMessageItemProps) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50"; 
      case "error":
        return "bg-red-50";
      default:
        return "bg-green-50";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-green-600"; 
      case "error":
        return "border-red-500";
    
      default:
        return "border-pink-600";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "❤️";  
      case "error":
        return "💔";  
    
      default:
        return "✓";
    }
  };

  return (
    <View
      style={{
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      className={`${getBackgroundColor()} ${getBorderColor()}`}
    >
      {/* Icon */}
      <Text className="text-2xl mr-3">{getIcon()}</Text>

      {/* Text Content */}
      <View className="flex-1">
        <Text className="text-base font-bold text-black mb-1">
          {text1}
        </Text>
        <Text className="text-sm text-gray-700" numberOfLines={1}>
          {text2}
        </Text>
      </View>
    </View>
  );
};