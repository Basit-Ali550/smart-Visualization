import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default function CompareResult() {
  const router = useRouter();
  const { project } = useLocalSearchParams();
  const data = JSON.parse(project);

  const originalImage = data.original_image_url;
  const generatedImage = data.generations[0].generated_image_url;

  const [sliderX, setSliderX] = useState(width / 2);

  const onGestureEvent = (event) => {
    const x = event.nativeEvent.translationX + width / 2;
    if (x > 0 && x < width) setSliderX(x);
  };

  return (
    <GestureHandlerRootView className="flex-1 ">
      {/* Header (above images) */}
      <View
        className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-4 py-3 bg-black/40"
        style={{ zIndex: 10 }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-white text-lg font-semibold">←</Text>
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">
          Transformation Comparison
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Image Comparison Section */}
      <View className="flex-1 relative">
        {/* AI Generated Image (background) */}
        <Image
          source={{ uri: generatedImage }}
          style={{ width, height, position: "absolute", top: 0, left: 0 }}
          resizeMode="cover"
        />

        {/* Original Image (foreground, width controlled by slider) */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: sliderX,
            height,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: originalImage }}
            style={{ width, height }}
            resizeMode="cover"
          />
        </View>

        {/* Center Draggable Divider */}
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View
            style={{
              position: "absolute",
              left: sliderX - 20,
              top: 0,
              bottom: 0,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View className="w-[3px] h-[3px] bg-blue-500" />
            <View className="absolute bg-blue-600 rounded-full p-3">
              <Text className="text-white text-xl font-bold">-</Text>
            </View>
          </View>
        </PanGestureHandler>
      </View>

      {/* Download Button (on top of images) */}
      <View
        className="absolute bottom-10 left-0 right-0 items-center"
        style={{ zIndex: 10 }}
      >
        <TouchableOpacity
          className="bg-blue-600 px-10 py-3 rounded-2xl shadow-lg"
          onPress={() => alert("Download started...")}
        >
          <Text className="text-white text-lg font-semibold">Download</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}
