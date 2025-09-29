import { View } from "react-native";

import SignUpScreen from "./auth/SignUp/SignUp";

// Validation schema using Yup

const App = () => {
  return (
    <View className="flex-1 px-4 py-6 bg-background">
      <SignUpScreen />
    </View>
  );
};

export default App;
