// app/_layout.js
import { Stack } from "expo-router"; // Import Redirect
import { View } from "react-native";

export default function RootLayout() {
  // You may need state management if running async logic, but for a simple test:
  
  // Test: If the initial route is '/' (or the base scheme), redirect to 'index'.
  // This is a last resort to bypass a strange launch issue.

  return (
    <View className="flex-1 px-4 py-6 bg-background">
      <Stack screenOptions={{ headerShown: false }}>
        {/* Remove index from Stack.Screen list if you use the Redirect below */}
        <Stack.Screen name="/index" /> 
        <Stack.Screen name="/auth/login" />
        {/* <Stack.Screen name="modal" /> */}
        {/* <Stack.Screen name="loanapply" />  */}
        {/* The order matters; this should be a last entry or handled by +not-found */}
      </Stack>
      {/* If the index file exists, this should load it */}
      {/* If this still fails, the problem is with the file itself or the build environment */}
    </View>
  );
}