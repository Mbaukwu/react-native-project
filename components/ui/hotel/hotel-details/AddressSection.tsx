import { View } from 'react-native';
import AppText from '@/components/ui/typography/AppText';

type AddressSectionProps = {
  address: string | null;
};

export default function AddressSection({ address }: AddressSectionProps) {
  if (!address) return null;

  return (
    <View className="mt-4 pt-4 border-t border-border">
      <AppText className="text-text text-base" variant="bold">
        Address
      </AppText>
      <AppText className="text-text-secondary mt-1">{address}</AppText>
    </View>
  );
}