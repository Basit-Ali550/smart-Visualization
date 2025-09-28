import { View } from "react-native";

import ProfileScreen from "./Profile/ProfileScreen";

// Validation schema using Yup

const App = () => {
  return (
    <View className="flex-1 px-4 py-6 bg-background">
      <ProfileScreen />
    </View>
  );
};

export default App;
