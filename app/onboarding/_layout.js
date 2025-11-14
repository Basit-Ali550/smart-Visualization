// app/onboarding/_layout.js
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { BackHandler, View } from "react-native";

export default function OnboardingLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Back button handler for Android
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Agar step1 par hain to app exit karo
        if (pathname === '/onboarding/step1') {
          BackHandler.exitApp();
          return true;
        }
        // Warna back navigation allow karo
        return false;
      }
    );

    return () => backHandler.remove();
  }, [pathname]);

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: 'transparent'
          },
          gestureEnabled: false // Disable swipe back gesture
        }}
      >
        <Stack.Screen 
          name="step1" 
          options={{
            gestureEnabled: false
          }}
        />
        <Stack.Screen 
          name="step2" 
          options={{
            gestureEnabled: false
          }}
        />
        <Stack.Screen 
          name="step3" 
          options={{
            gestureEnabled: false
          }}
        />
      </Stack>
    </View>
  );
}