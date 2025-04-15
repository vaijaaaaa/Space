// app/(tabs)/notifications.tsx
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { View, Text } from 'react-native';

export default function Notifications() {

  const notifications = useQuery(api.notifications.getNotifications);



  return (
    <View>
      <Text>Notifications Screen</Text>
    </View>
  );
}
