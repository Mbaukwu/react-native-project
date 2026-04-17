import { View, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/components/hooks/auth-hook/useAuth";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";
import { supabase } from "@/constants/supabase/supabase";
import Toast from "react-native-toast-message";

export default function EditProfileScreenComponent() {
  const { back } = useRouter();
  const { colors } = useThemeColors();
  const { userId, userEmail, userName, avatarUrl: existingAvatar, refreshUser } = useAuth();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setFullName(userName || "");
    setAvatarUrl(existingAvatar);
  }, [userName, existingAvatar]);

 const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to change your avatar');
      return;
    }

      const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      await uploadAvatar(result.assets[0].uri);
    }
 };
     const uploadAvatar = async (uri: string) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileExt = uri.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      Toast.show({ type: 'success', text1: 'Avatar updated' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed to upload avatar' });
    } finally {
      setUploading(false);
    }
     };
    const saveProfile = async () => {
    if (!fullName.trim()) {
      Toast.show({ type: 'error', text1: 'Name cannot be empty' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName.trim() })
        .eq('id', userId);

      if (error) throw error;

      await refreshUser();
      Toast.show({ type: 'success', text1: 'Profile updated' });
      back();
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
    };
    
     return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-8">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => back()} className="mr-4 p-1">
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <AppText className="text-text text-2xl flex-1" variant="bold">
            Edit Profile
          </AppText>
        </View>

        {/* Avatar Section */}
        <View className="items-center mb-8">
          <TouchableOpacity onPress={pickImage} disabled={uploading}>
            <View className="relative">
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} className="w-28 h-28 rounded-full" />
              ) : (
                <View className="w-28 h-28 rounded-full bg-primary/15 items-center justify-center">
                  <IconSymbol name="person.fill" size={48} color={colors.primary} />
                </View>
              )}
              {uploading && (
                <View className="absolute inset-0 bg-black/50 rounded-full items-center justify-center">
                  <ActivityIndicator color="white" />
                </View>
              )}
              <View className="absolute bottom-0 right-0 bg-primary rounded-full p-2 border-2 border-card">
                <IconSymbol name="camera.fill" size={16} color="white" />
              </View>
            </View>
          </TouchableOpacity>
          <AppText className="text-text-secondary text-xs mt-2">Tap to change photo</AppText>
        </View>

        {/* Form Fields */}
        <View className="gap-5">
          <View>
            <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
              Full Name
            </AppText>
            <TextInput
              className="bg-card border border-border rounded-xl p-4 text-text"
              placeholder="Your full name"
              placeholderTextColor={colors.textDisabled}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View>
            <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
              Email
            </AppText>
            <TextInput
              className="bg-card border border-border rounded-xl p-4 text-text opacity-60"
              value={userEmail || ''}
              editable={false}
            />
            <AppText className="text-text-disabled text-xs mt-1">
              Email cannot be changed
            </AppText>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={saveProfile}
          disabled={loading}
          className="bg-primary py-4 rounded-xl mt-10"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <AppText className="text-white text-center text-base" variant="bold">
              Save Changes
            </AppText>
          )}
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
