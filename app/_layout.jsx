import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex-1 px-4 py-6 bg-background">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="modal" />
        {/* Add loanapply or other folders as needed */}
      </Stack>
    </View>
  );
}
