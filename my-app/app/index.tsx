import MapScreen from "./map";
import { Stack } from "expo-router"

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MapScreen />
    </>
  );
}