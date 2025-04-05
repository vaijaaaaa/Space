import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from "@/cache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_KEY!

if(!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_KEY in .env");
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}  publishableKey={publishableKey}>
      <ClerkLoaded>
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1,backgroundColor:"black" }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </SafeAreaProvider>
    </ClerkLoaded>
    </ClerkProvider>
  );
}
