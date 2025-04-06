import { useAuth, useUser } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const segments = useSegments();

  const createUser = useMutation(api.users.createUser);

  // 🧠 Handle user creation
  useEffect(() => {
    if (!user) return;

    createUser({
      username: user.username || user.primaryEmailAddress?.emailAddress.split("@")[0] || "defaultUsername",
      fullname: user.fullName || "",
      email: user.primaryEmailAddress?.emailAddress || "",
      image: user.imageUrl,
      bio: "",
      clerkId: user.id,
    });
  }, [user]);

  // 🔐 Handle navigation
  useEffect(() => {
    if (!isLoaded) return;

    const isAuthScreen = segments[0] === "(auth)";

    if (!isSignedIn && !isAuthScreen) router.replace("/(auth)/login");
    else if (isSignedIn && isAuthScreen) router.replace("/(tabs)");
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
