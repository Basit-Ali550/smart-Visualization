import { View } from "react-native";

import SelectColorsScreen from "./SelectColorsScreen/SelectColorsScreen";

// Validation schema using Yup

const App = () => {
  return (
    <View className="flex-1 px-4 py-6 bg-background">
      <SelectColorsScreen/>
    </View>
  );
};

export default App;
