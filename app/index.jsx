// app/index.js
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import "../global.css";
import { OnboardingManager } from "../Halper/OnboardingManager"; 

export default function Index() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(null);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  // Check onboarding status on app start
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // Pehle check karo if first time onboarding complete hai
        const firstTimeOnboardingCompleted = await OnboardingManager.hasCompletedOnboarding();
        
        // Agar first time onboarding complete nahi hai, to show onboarding
        if (!firstTimeOnboardingCompleted) {
          setShouldShowOnboarding(true);
        } else {
          // Agar first time complete hai, to check karo auth onboarding
          const authOnboardingCompleted = await OnboardingManager.hasCompletedAuthOnboarding();
          setShouldShowOnboarding(!authOnboardingCompleted);
        }
      } catch (error) {
        console.error('Error checking onboarding:', error);
        setShouldShowOnboarding(true); // Safe side par show onboarding
      } finally {
        setCheckingOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  // Show loading while checking auth and onboarding
  if (authLoading || checkingOnboarding) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0461A6" />
      </View>
    );
  }

  // If should show onboarding, redirect to onboarding
  if (shouldShowOnboarding) {
    return <Redirect href="/onboarding/step1" />;
  }

  // If onboarding not required, check authentication
  return isAuthenticated ? (
    <Redirect href="/pages/home" />
  ) : (
    <Redirect href="/auth/login" />
  );
}