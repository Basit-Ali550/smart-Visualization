import { View } from "react-native";
import MaterialDetails from "./MaterialDetail/MaterialDetailsScreen";
import SaveExportDesign from "./SaveExportDesign/SaveExportDesign";

// Validation schema using Yup

const App = () => {
  return (
    <View className="flex-1 px-4 py-6 bg-background">
      <SaveExportDesign />
    </View>
  );
};

export default App;
MaterialDetails;
