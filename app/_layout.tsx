import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="login" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="dashboard" options={{headerShown: false}}></Stack.Screen>
       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       <Stack.Screen name="airtime" options={{ headerShown: false }}></Stack.Screen>
       <Stack.Screen name="network/[id]" options={{ headerShown: false }}></Stack.Screen> 
       <Stack.Screen name="datanetwork/[id]" options={{ headerShown: false }}></Stack.Screen> 
       <Stack.Screen name="cable/[id]" options={{ headerShown: false }}></Stack.Screen>
       <Stack.Screen name="contact" options={{ headerShown: false }}></Stack.Screen>
       <Stack.Screen name="rechargedata" options={{ headerShown: false }}></Stack.Screen>
       <Stack.Screen name="television" options={{ headerShown: false }}></Stack.Screen>
    </Stack>
  );
}
