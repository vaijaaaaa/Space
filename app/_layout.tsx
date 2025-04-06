
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if(!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_KEY in .env");
}

export default function RootLayout() {
  return (
    <ClerkAndConvexProvider>
       <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1,backgroundColor:"black" }}>
        <InitialLayout/>
      </SafeAreaView>
    </SafeAreaProvider>
    </ClerkAndConvexProvider>
   
   
  );
}
