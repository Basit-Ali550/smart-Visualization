import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import "../global.css";

export default function Index() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0461A6" />
      </View>
    );
  }
  return isAuthenticated ? (
    <Redirect href="/pages/home" />
  ) : (
    <Redirect href="/auth/login" />
  );
}
