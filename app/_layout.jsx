import { Stack, usePathname } from "expo-router";
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  const pathname = usePathname();
  
  // Check if current route is onboarding
  const isOnboardingScreen = pathname?.includes('/onboarding');
  
  return (
    <AuthProvider>
      {isOnboardingScreen ? (
        // Full screen for onboarding
        <View className="flex-1">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="pages" />
          </Stack>
        </View>
      ) : (
        // Normal layout for other screens
        <View className="flex-1 px-4 py-6 bg-background">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="pages" />
          </Stack>
        </View>
      )}
    </AuthProvider>
  );
}