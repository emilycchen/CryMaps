import React from 'react';
import { Tabs } from 'expo-router';
import { useFonts, Zain_400Regular } from '@expo-google-fonts/zain';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    Zain_400Regular,
  });

  const { top } = useSafeAreaInsets();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.text,
        tabBarInactiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          height: 85,
          paddingBottom: 30,
        },
        tabBarLabelStyle: {
          fontFamily: 'Zain_400Regular',
          fontSize: 14,
        },
        headerStyle: {
          backgroundColor: COLORS.white,
          shadowColor: 'transparent',
          height: 50 + top,
        },
        headerTitleStyle: {
          fontFamily: 'Zain_400Regular',
          fontSize: 32,
          color: COLORS.primary,
        },
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: 'CryMaps',
          tabBarIcon: ({ color }) => <TabBarIcon name="map-marker" color={color} />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}