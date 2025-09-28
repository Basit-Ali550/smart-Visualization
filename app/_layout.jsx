import { View } from "react-native";

import UploadPhotoScreen from "./UploadPhoto/UploadPhoto";

// Validation schema using Yup

const App = () => {
  return (
    <View className="flex-1 px-4 py-6 bg-background">
      <UploadPhotoScreen />
    </View>
  );
};

export default App;
