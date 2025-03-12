import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="login" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="dashboard" options={{headerShown: false}}></Stack.Screen>
       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

    </Stack>
  );
}
