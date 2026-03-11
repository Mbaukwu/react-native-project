import React from "react";
import { Pressable, Text, View } from "react-native";
import { useMagicModal } from "react-native-magic-modal";

type ConfirmDeleteModalProps = {
  productTitle: string;
  onConfirm: () => void;
};

export const ConfirmDeleteModal = ({ productTitle, onConfirm }: ConfirmDeleteModalProps) => {

  const { hide } = useMagicModal();
  

  return (
    <View className="py-6 px-8 bg-white dark:bg-gray-900 rounded-2xl items-center justify-center border border-gray-200 dark:border-gray-700 mx-6">
      {/* Icon */}
      <Text className="text-5xl mb-4">💔</Text>

      {/* Title */}
      <Text className="text-2xl font-bold text-black dark:text-white">
        Remove from Favorites?
      </Text>

      {/* Product Title */}
      <Text className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
        "{productTitle}"
      </Text>

      {/* Buttons */}
      <View className="flex-row gap-3 mt-6 w-full">
        <Pressable
          className="flex-1 bg-gray-200 dark:bg-gray-700 py-3 rounded-lg"
          onPress={() => hide(undefined)}
        >
          <Text className="text-center font-semibold text-gray-800 dark:text-gray-200">
            Cancel
          </Text>
        </Pressable>

        <Pressable
          className="flex-1 bg-pink-600 py-3 rounded-lg"
          onPress={() => {
            onConfirm();
            hide(undefined);
          }}
        >
          <Text className="text-center font-semibold text-white">
            Remove
          </Text>
        </Pressable>
      </View>
    </View>
  );
};