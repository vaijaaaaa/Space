
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { SplashScreen } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if(!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_KEY in .env");
}


SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "JetBrainsMono": require("../assets/fonts/JetBrainsMono.ttf"),
  })

  const onLayoutReadyView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);


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

