import React from "react";
import { Pressable, Text, View } from "react-native";
import ActionSheet, { SheetManager, useSheetPayload } from "react-native-actions-sheet";

import { useRouter } from "expo-router";

export const ProductOptionsSheet = () => {
  const { push } = useRouter();
  const payload = useSheetPayload("product-options-sheet");
  const productId = payload?.productId;
  const productTitle = payload?.productTitle;

  const handleClose = () => {
    SheetManager.hide("product-options-sheet");
  };

  return (
    <ActionSheet id="product-options-sheet" gestureEnabled={true} containerStyle={{ backgroundColor: "#000" }}>
      <View className="py-4 px-8 bg-black rounded-lg">
        <Text className="text-2xl font-bold font-roboto text-white">{productTitle || "Product Options"}</Text>

        <Pressable
          className="bg-blue-500 py-3 px-5 rounded-md mt-8"
          onPress={() => {
            handleClose();
            push({
              pathname: "/products/[id]",
              params: { id: productId },
            });
          }}
        >
          <Text className="text-white text-center">View Details</Text>
        </Pressable>

        <Pressable className="bg-gray-500 py-3 px-5 rounded-md mt-4" onPress={handleClose}>
          <Text className="text-white text-center">Cancel</Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
};
