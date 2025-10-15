import { Stack } from "expo-router";

export default function PagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="exterior-design" />
      <Stack.Screen name="interior-design" />
      <Stack.Screen name="settings" />

      {/* ✅ Add all the missing routes that you're trying to navigate to */}
      <Stack.Screen name="profile" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="my-projects" />
      <Stack.Screen name="styles" />
      <Stack.Screen name="style-details" />

      {/* Add more routes as needed */}
    </Stack>
  );
}
