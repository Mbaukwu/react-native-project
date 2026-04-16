import { View } from 'react-native';
import AppText from '@/components/ui/typography/AppText';

type DescriptionSectionProps = {
  description: string;
};

export default function DescriptionSection({ description }: DescriptionSectionProps) {
  return (
    <View className="mt-4 mb-1">
      <AppText className="text-text text-base " variant="bold">
        About this hotel
      </AppText>
      <AppText className="text-text-secondary mt-2 leading-6">{description}</AppText>
    </View>
  );
}