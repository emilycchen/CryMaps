// import { Stack, useRouter, useSegments } from 'expo-router';
// import { AuthProvider, useAuth } from '../lib/AuthContext';
// import { useEffect } from 'react';
// import { Text, View } from 'react-native';

// function RootLayoutNav() {
//   const { session, loading } = useAuth();
//   const router = useRouter();
//   const segments = useSegments();

//   useEffect(() => {
//     if (loading) return;

//     const inAuthFlow = segments[0] === 'login'; 

//     if (!session && !inAuthFlow) {
//       router.replace('/login');
//     } else if (session && inAuthFlow) {
//       router.replace('/');
//     }
//   }, [session, loading, segments, router]);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen name="login" options={{ headerShown: false }} />
//       <Stack.Screen name="map" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <RootLayoutNav />
//     </AuthProvider>
//   );
// }
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../lib/AuthContext';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    // This now correctly checks for BOTH login and signup
    const inAuthFlow = segments[0] === 'login' || segments[0] === 'signup';

    if (!session && !inAuthFlow) {
      // User is not logged in and not in the auth flow, send to login.
      router.replace('/login');
    } else if (session && inAuthFlow) {
      // User is logged in but stuck in the auth flow, send to app.
      router.replace('/'); // This will redirect to your (tabs) layout
    }
  }, [session, loading, segments, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack>
      {/* This Stack should only contain your main layouts and auth screens */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}

// This part (with AuthProvider) stays the same
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}