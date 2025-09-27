import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Your components
import Button from "../../components/ui/Button";
import { Text14, Text16Bold, Text20 } from "../../components/ui/Typography";

// Add Text12 component if missing
const Text12 = ({ children, className }) => {
  return (
    <Text
      className={`text-[12px] font-[Montserrat] font-normal text-[#767C8C] ${
        className || ""
      }`}
    >
      {children}
    </Text>
  );
};

const UploadPhotoScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Use Expo Router hooks instead of route props
  const params = useLocalSearchParams();
  const router = useRouter();
  const roomType = params?.roomType || "Room";

  // Best practices examples data
  const bestPractices = [
    {
      id: 1,
      type: "good",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop",
      title: "Best example",
      description: "Well-lit, clear view of entire room",
    },
    {
      id: 2,
      type: "bad",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=150&fit=crop",
      title: "Avoid this",
      description: "Dark, cluttered, poor lighting",
    },
  ];

  const pickImageFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
        setShowConfirmation(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image from gallery");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Sorry, we need camera permissions to make this work!"
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
        setShowConfirmation(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const handleUsePhoto = () => {
    setShowConfirmation(false);
    // Use Expo Router navigation
    router.push({
      pathname: "/StyleSelection",
      params: {
        roomType: roomType,
        photo: JSON.stringify(selectedImage),
      },
    });
  };

  const BestPracticeCard = ({ practice }) => (
    <View
      className={`flex-1 mx-1 p-3 rounded-xl ${
        practice.type === "good" ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <Image
        source={{ uri: practice.image }}
        className="w-full h-20 rounded-lg mb-2"
      />
      <Text14 className="font-semibold mb-1">{practice.title}</Text14>
      <Text12 className="text-[#767C8C]">{practice.description}</Text12>
    </View>
  );

  // Confirmation Modal
  const ConfirmationModal = () => (
    <Modal
      visible={showConfirmation}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowConfirmation(false)}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
          {/* Modal Header */}
          <View className="px-6 pt-6 pb-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text16Bold className="font-bold">Confirm Your Photo</Text16Bold>
              <TouchableOpacity onPress={() => setShowConfirmation(false)}>
                <Feather name="x" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <Text14 className="text-[#767C8C] text-center mb-4">
              Is this the photo you want to use for visualization?
            </Text14>
          </View>

          {/* Selected Photo Preview */}
          {selectedImage && (
            <View className="px-6 pb-4">
              <Image
                source={{ uri: selectedImage.uri }}
                className="w-full h-64 rounded-xl"
                resizeMode="cover"
              />
              <Text14 className="text-center mt-2 text-[#767C8C]">
                Gallery
              </Text14>
            </View>
          )}

          {/* Modal Actions */}
          <View className="px-6 pb-6">
            <Button
              variant="primary"
              className="w-full mb-3"
              onPress={handleUsePhoto}
            >
              Use this photo
            </Button>
            <TouchableOpacity
              onPress={() => setShowConfirmation(false)}
              className="py-3 rounded-xl border border-gray-300 items-center"
            >
              <Text14 className="text-[#0461A6] font-semibold">
                Choose different photo
              </Text14>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center mb-6">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Feather name="arrow-left" size={24} color="#000000" />
            </TouchableOpacity>
            <View>
              <Text20 className="text-[24px] font-bold">Upload Photo</Text20>
            </View>
          </View>

          {/* Main Content */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center mb-4">
              <Feather name="upload" size={40} color="#0461A6" />
            </View>
            <Text16Bold className="font-bold text-center mb-2">
              Upload Your {roomType} Photo
            </Text16Bold>
            <Text14 className="text-[#767C8C] text-center leading-6">
              Upload a photo of your room or facade to explore styles and
              materials.
            </Text14>
          </View>

          {/* AI Guidance */}
          <View className="bg-yellow-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-start">
              <Feather
                name="info"
                size={16}
                color="#D97706"
                style={{ marginTop: 2, marginRight: 8 }}
              />
              <View className="flex-1">
                <Text14 className="text-[#D97706] font-semibold mb-1">
                  AI guidance:
                </Text14>
                <Text14 className="text-[#D97706]">
                  Make sure your room is well-lit for best results
                </Text14>
              </View>
            </View>
          </View>
        </View>

        {/* Upload Options */}
        <View className="px-6 mb-8">
          <View className="flex-row space-x-4">
            {/* Gallery Upload */}
            <TouchableOpacity
              onPress={pickImageFromGallery}
              className="flex-1 bg-gray-50 rounded-2xl p-6 items-center border-2 border-dashed border-gray-300"
            >
              <View className="w-16 h-16 bg-white rounded-full items-center justify-center mb-3 border border-gray-200">
                <Feather name="image" size={28} color="#0461A6" />
              </View>
              <Text16Bold className="text-center mb-1">
                Upload from gallery
              </Text16Bold>
            </TouchableOpacity>

            {/* Camera Upload */}
            <TouchableOpacity
              onPress={takePhoto}
              className="flex-1 bg-gray-50 rounded-2xl p-6 items-center border-2 border-dashed border-gray-300"
            >
              <View className="w-16 h-16 bg-white rounded-full items-center justify-center mb-3 border border-gray-200">
                <Feather name="camera" size={28} color="#0461A6" />
              </View>
              <Text16Bold className="text-center mb-1">Take a photo</Text16Bold>
            </TouchableOpacity>
          </View>
        </View>

        {/* Best Practices Section */}
        <View className="px-6 mb-8">
          <Text16Bold className="mb-3">Best Practices Examples</Text16Bold>
          <Text14 className="text-[#767C8C] mb-4">
            Follow these examples for the best visualization results
          </Text14>

          <View className="flex-row">
            {bestPractices.map((practice) => (
              <BestPracticeCard key={practice.id} practice={practice} />
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <View className="px-6 pb-8">
          <Button
            variant="primary"
            className="w-full"
            onPress={() =>
              selectedImage
                ? setShowConfirmation(true)
                : Alert.alert("Please select a photo first")
            }
            disabled={!selectedImage}
          >
            Continue
          </Button>
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </SafeAreaView>
  );
};

export default UploadPhotoScreen;
