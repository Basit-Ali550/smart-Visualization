// pages/interior-exterior-style.js
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import { Text20 } from "../../components/ui/Typography";
import exteriorStyles from "../../Halper/exterior_styles.json";
import interiorStyles from "../../Halper/interior_styles.json";
const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const InteriorExteriorStyle = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { path, roomType, elementName } = params;
  useEffect(() => {
  }, [path, roomType, elementName]);
  const isExterior = path === "exterior";
  const stylesData = isExterior ? exteriorStyles : interiorStyles;

  const [selectedStyle, setSelectedStyle] = useState(null);

const handleContinue = () => {
  if (!selectedStyle) return;

  router.push({
    pathname: "/pages/project-details-form",
    params: {
      path,
      roomType: roomType || "",
      elementName: elementName || "",
      selectedStyle: JSON.stringify(selectedStyle),
    },
  });
};

  const StyleCard = ({ item }) => {
    const isSelected = selectedStyle?.name === item.name;

    return (
      <TouchableOpacity
        onPress={() => setSelectedStyle(item)}
        activeOpacity={0.7}
        className={`bg-white rounded-2xl overflow-hidden mb-5 border-2 ${
          isSelected ? "border-[#0461A6]" : "border-gray-200"
        } shadow-md`}
        style={{ width: CARD_WIDTH }}
      >
        <Image
          source={{ uri: item.image_url || item.image }}
          className="w-full h-40"
          resizeMode="cover"
        />
        {isSelected && (
          <View className="absolute top-3 right-3 w-9 h-9 bg-[#0461A6] rounded-full justify-center items-center">
            <Feather name="check" size={22} color="white" />
          </View>
        )}
        <View className="p-4 bg-white">
          <Text className="text-center font-bold text-gray-800">
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F6FA]">
      <View className="flex-1">
        <Text20 className="text-center font-bold text-[#333] mb-6">
          {isExterior ? "Choose Exterior Style" : "Choose Interior Style"}
        </Text20>

        <Text className="text-center text-gray-600 mb-6">
          {isExterior
            ? `Designing: ${elementName}`
            : `Room: ${roomType}`}
        </Text>

        <FlatList
          data={stylesData}
          renderItem={({ item }) => <StyleCard item={item} />}
          keyExtractor={(item) => item.name}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        />

        {/* Fixed Button */}
        <View className="absolute bottom-8 left-6 right-6">
          <Button
            onPress={handleContinue}
            variant="primary"
            disabled={!selectedStyle}
            className="w-full py-4"
          >
            Continue to Visualization
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InteriorExteriorStyle;