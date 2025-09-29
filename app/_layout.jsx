import { View } from "react-native";
import DashboardScreen from "./Home/DashboardScreen";

// Validation schema using Yup

const App = () => {
  return (
    <View className="flex-1 px-4 py-6 bg-background">
      <DashboardScreen />
    </View>
  );
};

export default App;
