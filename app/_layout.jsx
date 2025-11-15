import { Stack, usePathname } from "expo-router";
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  const pathname = usePathname();
  
  // Screens that should use full screen without padding
  const fullScreenRoutes = ['/onboarding', '/pages/compare-result'];
  const isFullScreen = fullScreenRoutes.some(route => pathname?.includes(route));

  return (
    <AuthProvider>
      <View className={`flex-1 ${!isFullScreen ? 'px-4 py-6 bg-background' : ''}`}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="pages" />
        </Stack>
      </View>
    </AuthProvider>
  );
}
