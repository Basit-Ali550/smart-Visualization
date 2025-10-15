import { Stack } from "expo-router";
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <View className="flex-1 px-4 py-6 bg-background">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="pages" />
          {/* Add other screens as needed */}
        </Stack>
      </View>
    </AuthProvider>
  );
}
