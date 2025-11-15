import { Stack } from "expo-router";

export default function PagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="exterior-design" />
      <Stack.Screen name="interior-design" />
            <Stack.Screen name="interior-exterior-style" />
      <Stack.Screen name="project-details-form" />
      <Stack.Screen name="save-project" />

      <Stack.Screen name="compare-result" />

      <Stack.Screen name="settings" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="my-projects" />
      <Stack.Screen name="styles" />
      <Stack.Screen name="style-details" />
    </Stack>
  );
}
