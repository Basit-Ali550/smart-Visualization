

import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import apiClient from "../../hooks/apiClient"; // <-- YE IMPORT KARNA

import Button from "../../components/ui/Button";
import { Text14, Text16Bold, Text20 } from "../../components/ui/Typography";

const AI_INVENTIONS = [
  { label: "Very Low", value: 1 },
  { label: "Low", value: 2 },
  { label: "Medium", value: 3 },
  { label: "High", value: 4 },
  { label: "Extreme", value: 5 },
];

const HOUSE_ANGLES = [
  { label: "Front View", value: "front" },
  { label: "Back View", value: "back" },
  { label: "Left Side", value: "left" },
  { label: "Right Side", value: "right" },
  { label: "Bird's Eye", value: "top" },
];

const DESIGN_COUNTS = [
  { label: "1 Design", value: 1 },
  { label: "2 Designs", value: 2 },
  { label: "3 Designs", value: 3 },
  { label: "5 Designs", value: 5 },
  { label: "10 Designs", value: 10 },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ProjectDetailsForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    path,
    roomType,
    elementName,
    selectedStyle,
    photo,
  } = params;

  const style = selectedStyle ? JSON.parse(selectedStyle) : null;
  const uploadedPhoto = photo ? JSON.parse(photo) : null;

  const [projectName, setProjectName] = useState("");
  const [selectedAngle, setSelectedAngle] = useState(null);
  const [aiInvention, setAiInvention] = useState(3);
  const [designCount, setDesignCount] = useState(3);
  const [openDesignCount, setOpenDesignCount] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [loading, setLoading] = useState(false); // LOADING STATE

  const isExterior = path === "exterior";

  const handleSubmit = async () => {
    if (!projectName.trim()) {
      Alert.alert("Error", "Please enter project name");
      return;
    }
    if (isExterior && !selectedAngle) {
      Alert.alert("Error", "Please select house angle");
      return;
    }
    if (!uploadedPhoto) {
      Alert.alert("Error", "Photo is missing!");
      return;
    }
    setLoading(true);

    const formData = new FormData();

    // 1. Name
    formData.append("name", projectName.trim());

    // 2. Design Type
    formData.append("design_type", isExterior ? "Exterior" : "Interior");

    // 3. Room Type (only for Interior)
    if (!isExterior) {
      formData.append("room_type", roomType || elementName || "");
    }

    // 4. House Angle (only for Exterior)
    if (isExterior) {
      formData.append("house_angle", selectedAngle);
    }

    // 5. Design Style
    formData.append("design_style", style?.name || "No Style");

    // 6. AI Intervention Level
    const aiLevels = ["Very Low", "Low", "Medium", "High", "Extreme"];
    formData.append("ai_intervention", aiLevels[aiInvention - 1]);

    // 7. Number of Designs
    formData.append("no_designs", designCount);

    // 8. Keep Structural Elements
    formData.append("keep_structural_elements", "false");

    // 9. Image (Binary File)
    formData.append("image", {
      uri: uploadedPhoto.uri,
      type: uploadedPhoto.mimeType || "image/jpeg",
      name: uploadedPhoto.fileName || "photo.jpg",
    });

    try {
      
      const response = await apiClient.post("/api/v1/design/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }      });

      console.log("SUCCESS:", response.data);

      Alert.alert("Success", "Project created! Redirecting...", [
        {
          text: "OK",
          onPress: () => {
            router.replace({
              pathname: "/Pages/Projects", // Ya jo bhi screen chahiye
              params: { refresh: Date.now() },
            });
          },
        },
      ]);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);

      let message = "Something went wrong";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message === "thfh Network Error") {
        message = "No internet connection";
      }

      Alert.alert("Failed", error);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your UI code (slider, etc.) same rahega

  const getCreativityInfo = (value) => {
    const labels = ["Very Low", "Low", "Med", "High", "Extreme"];
    const colors = ["#FF6B6B", "#FFA726", "#29B6F6", "#7E57C2", "#EC407A"];
    const emojis = ["😴", "😊", "💡", "🚀", "🔥"];
    return { label: labels[value - 1], color: colors[value - 1], emoji: emojis[value - 1] };
  };

  const calculateThumbPosition = () => {
    if (sliderWidth === 0) return 0;
    const stepWidth = sliderWidth / 4;
    return (aiInvention - 1) * stepWidth;
  };

  const creativityInfo = getCreativityInfo(aiInvention);

  return (
    <SafeAreaView className="flex-1 bg-[#F5F6FA]">
      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <Text20 className="text-center font-bold text-[#333] mb-2">
          Complete Your Project
        </Text20>
        <Text14 className="text-center text-gray-600 mb-8">
          Add details to generate AI designs
        </Text14>

        {/* Photo Preview */}
        {uploadedPhoto && (
          <View className="mb-6 bg-white rounded-2xl overflow-hidden shadow-sm">
            <Text16Bold className="p-4">Your Uploaded Photo</Text16Bold>
            <Image source={{ uri: uploadedPhoto.uri }} className="w-full h-64" resizeMode="cover" />
          </View>
        )}

        {/* Project Name */}
        <View className="mb-6">
          <Text16Bold>Project Name</Text16Bold>
          <TextInput
            value={projectName}
            onChangeText={setProjectName}
            placeholder="e.g. My Dream Home"
            className="bg-white rounded-xl px-4 py-4 mt-2 border border-gray-200"
          />
        </View>

        {/* House Angle */}
        {isExterior && (
          <View className="mb-6 bg-white rounded-xl p-5">
            <Text16Bold className="mb-4">Select House Angle</Text16Bold>
            {HOUSE_ANGLES.map((angle) => (
              <TouchableOpacity
                key={angle.value}
                onPress={() => setSelectedAngle(angle.value)}
                className="flex-row items-center mb-3"
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 mr-3 ${
                    selectedAngle === angle.value
                      ? "border-[#0461A6] bg-[#0461A6]"
                      : "border-gray-400"
                  } justify-center items-center`}
                >
                  {selectedAngle === angle.value && (
                    <View className="w-3 h-3 bg-white rounded-full" />
                  )}
                </View>
                <Text class TclassName="text-gray-700">{angle.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* AI Creativity Slider */}
        <View className="mb-6 bg-white rounded-2xl p-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>AI Creativity Level</Text16Bold>
            <View className="px-3 py-1 rounded-full" style={{ backgroundColor: `${creativityInfo.color}15` }}>
              <Text className="text-xs font-bold" style={{ color: creativityInfo.color }}>
                {creativityInfo.emoji} {creativityInfo.label}
              </Text>
            </View>
          </View>

          <View className="relative mb-8" onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}>
            <View className="h-2 bg-gray-100 rounded-full">
              <View
                className="h-2 rounded-full absolute"
                style={{ width: `${(aiInvention - 1) * 25}%`, backgroundColor: creativityInfo.color }}
              />
            </View>

            <View className="absolute top-[-12px] w-8 h-8 justify-center items-center" style={{ left: calculateThumbPosition() - 14 }}>
              <View
                className="w-7 h-7 rounded-full justify-center items-center"
                style={{
                  backgroundColor: creativityInfo.color,
                  shadowColor: creativityInfo.color,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <View className="w-2 h-2 bg-white rounded-full" />
              </View>
            </View>

            <View className="flex-row justify-between mt-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <TouchableOpacity key={step} className="items-center" onPress={() => setAiInvention(step)}>
                  <View
                    className={`w-3 h-3 rounded-full ${step <= aiInvention ? 'border-2 border-white' : ''}`}
                    style={{ backgroundColor: step <= aiInvention ? creativityInfo.color : '#D1D5DB' }}
                  />
                  <Text
                    className={`text-xs mt-1 ${step === aiInvention ? 'font-bold' : 'text-gray-500'}`}
                    style={{ color: step === aiInvention ? creativityInfo.color : '#6B7280' }}
                  >
                    {step}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Slider
              style={{ height: 40, position: 'absolute', width: '100%', top: -15, opacity: 0 }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={aiInvention}
              onValueChange={setAiInvention}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor="transparent"
            />
          </View>

          <View className="bg-blue-50 rounded-xl p-3 mt-2">
            <Text className="text-xs text-blue-800 text-center">
              {aiInvention === 1 && "Predictable • Safe • Traditional"}
              {aiInvention === 2 && "Balanced • Reliable • Subtle Innovation"}
              {aiInvention === 3 && "Creative Mix • Modern • Balanced"}
              {aiInvention === 4 && "Bold • Unique • Highly Innovative"}
              {aiInvention === 5 && "Extreme • Revolutionary • Maximum Creativity"}
            </Text>
          </View>
        </View>

        {/* Number of Designs */}
        <View className="mb-8 z-50">
          <Text16Bold className="mb-2">Number of Designs</Text16Bold>
          <DropDownPicker
            open={openDesignCount}
            value={designCount}
            items={DESIGN_COUNTS}
            setOpen={setOpenDesignCount}
            setValue={setDesignCount}
            placeholder="Select number of designs"
            style={{ backgroundColor: "white", borderColor: "#ddd", borderRadius: 12, borderWidth: 1 }}
            dropDownContainerStyle={{ backgroundColor: "white", borderColor: "#ddd", borderRadius: 12 }}
          />
        </View>

        {/* Submit Button */}
        <Button
          onPress={handleSubmit}
          variant="primary"
          className="mb-10"
          disabled={loading || !projectName || (isExterior && !selectedAngle)}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            "Generate AI Designs"
          )}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectDetailsForm;