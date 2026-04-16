import { View } from 'react-native';
import AppText from '@/components/ui/typography/AppText';

type SpecialRequestsCardProps = {
  specialRequests: string;
};

export default function SpecialRequestsCard({ specialRequests }: SpecialRequestsCardProps) {
  return (
    <View className="bg-card border border-border rounded-2xl p-4 mb-4">
      <AppText className="text-text text-sm mb-1" variant="bold">Special Requests</AppText>
      <AppText className="text-text-secondary text-sm leading-5">
        {specialRequests}
      </AppText>
    </View>
  );
}