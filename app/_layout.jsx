import { View } from "react-native";

import LoginScreen from "./auth/Login/Login";

// Validation schema using Yup

const App = () => {
  return (
    <View className="flex-1 px-4 py-6 bg-background">
      <LoginScreen />
    </View>
  );
};

export default App;
