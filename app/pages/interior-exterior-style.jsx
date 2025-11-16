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

import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import Ai from "../../assets/Icon/Ai.svg";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const InteriorExteriorStyle = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { path, roomType, elementName, photo } = params;
  const parsedPhoto = photo ? JSON.parse(photo) : null;

  const [selectedStyle, setSelectedStyle] = useState(null);
  const [aiLoading] = useState(false); // Keep as false or manage as needed

  useEffect(() => {}, [path, roomType, elementName]);

  const isExterior = path === "exterior";
  const stylesData = isExterior ? exteriorStyles : interiorStyles;

  // Navigate to RecommendedStyles screen
  const getAIRecommendations = () => {
    router.push({
      pathname: "/pages/RecommendedStyles",
      params: {
        path,
        roomType: roomType || "",
        elementName: elementName || "",
        photo: photo,
      },
    });
  };

  const handleContinue = () => {
    if (!selectedStyle) return;

    router.push({
      pathname: "/pages/project-details-form",
      params: {
        path,
        roomType: roomType || "",
        elementName: elementName || "",
        selectedStyle: JSON.stringify(selectedStyle),
        photo: JSON.stringify(parsedPhoto),
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
      <View className="flex-1 pt-6">
        {/* === AI RECOMMENDATION CARD (Added Here) === */}
        <View className="mb-6 rounded-2xl">
          <Animated.View>
            <LinearGradient
              colors={["#0461A6", "#034372"]}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 16,
                paddingHorizontal: 16,
                borderRadius: 16,
                opacity: aiLoading ? 0.7 : 1,
              }}
            >
              <View className="flex-row w-full justify-between gap-3 mb-2">
                <View className="flex-row gap-3">
                  <Ai />
                  <Text className="text-[#FFFFFF] text-[16px] font-semibold mt-2">
                    AI Analysis
                  </Text>
                </View>
                <View>
                  <Text className="text-[#FFFFFF] text-right text-[18px] font-semibold">
                    94%{" "}
                  </Text>
                  <Text className="text-[#F5F6FA] text-right text-[14px]">
                    Match Confidence
                  </Text>
                </View>
              </View>
              <Text className="text-[#F5F6FA] text-sm font-normal my-4">
                Our AI has analyzed your room's dimensions, lighting,
                architectural features, and existing elements to recommend
                styles that would work best for your space.
              </Text>

              {/* Button to go to RecommendedStyles */}
              <TouchableOpacity
                onPress={getAIRecommendations}
                disabled={aiLoading}
                className="rounded-2xl w-full bg-white p-4 flex flex-row justify-center shadow-lg overflow-hidden"
              >
                <Text className="text-[#0461A6] font-bold text-center">
                  View AI Recommendations
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </View>

        <Text20 className=" font-bold text-[#333]">
          Popular Design Styles
        </Text20>
        <Text className=" text-gray-600 mb-2">
          Select a style to visualize your space
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
