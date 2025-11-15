import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="varifyemail" />
      <Stack.Screen name="newpassword" />
      <Stack.Screen name="otpscreen" />
      <Stack.Screen name="forgotpassword" />
      <Stack.Screen name="face-verification" options={{ headerShown: false }} />
    </Stack>
  );
}