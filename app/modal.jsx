import { Text, View } from "react-native";

import "../global.css"; // ✅ Correct import

export default function RootLayout() {
  return (
    <View>
      <Text className="pt-24 text-blue-600 bg-slate-600">
        uvodvu aligcutt
      </Text>
    </View>
  );
}
