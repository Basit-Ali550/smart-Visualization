// utils/OnboardingManager.js
import * as SecureStore from 'expo-secure-store';

const ONBOARDING_KEY = 'hasCompletedOnboarding';
const AUTH_ONBOARDING_KEY = 'authOnboardingCompleted'; // Alag key auth ke liye

export const OnboardingManager = {
  // Check if user has completed onboarding (first time only)
  async hasCompletedOnboarding() {
    try {
      const value = await SecureStore.getItemAsync(ONBOARDING_KEY);
      return value === 'true';
    } catch (error) {
      console.error('Error reading onboarding status:', error);
      return false;
    }
  },

  // Mark onboarding as completed (first time only)
  async completeOnboarding() {
    try {
      await SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
      await SecureStore.setItemAsync(AUTH_ONBOARDING_KEY, 'true'); // Auth wala bhi set karo
      return true;
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      return false;
    }
  },

  // Check if user has completed onboarding via auth
  async hasCompletedAuthOnboarding() {
    try {
      const value = await SecureStore.getItemAsync(AUTH_ONBOARDING_KEY);
      return value === 'true';
    } catch (error) {
      console.error('Error reading auth onboarding status:', error);
      return false;
    }
  },

  // Mark auth onboarding as completed (logout ke baad bhi rahega)
  async completeAuthOnboarding() {
    try {
      await SecureStore.setItemAsync(AUTH_ONBOARDING_KEY, 'true');
      return true;
    } catch (error) {
      console.error('Error saving auth onboarding status:', error);
      return false;
    }
  },

  // Reset onboarding (for testing only)
  async resetOnboarding() {
    try {
      await SecureStore.deleteItemAsync(ONBOARDING_KEY);
      await SecureStore.deleteItemAsync(AUTH_ONBOARDING_KEY);
      return true;
    } catch (error) {
      console.error('Error resetting onboarding:', error);
      return false;
    }
  }
};