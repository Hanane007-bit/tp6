import React from 'react';
import { View, Text } from 'react-native';

export default function DetailsScreen({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>📄 Details Screen</Text>
      <Text>ID: {route?.params?.id}</Text>
    </View>
  );
}
