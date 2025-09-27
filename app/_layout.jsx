import { View } from "react-native";
import SelectMaterialsScreen from "./SelectMaterials/SelectMaterials";

// Validation schema using Yup

const App = () => {
  return (
    <View className="flex-1">
      <SelectMaterialsScreen />
    </View>
  );
};

export default App;
