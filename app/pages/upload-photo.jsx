import { Entypo, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import AiLight from "../../assets/images/AiLight.svg";
import Back from "../../assets/images/back.svg";
import BestPrectice from "../../assets/images/BestPrectice.jpg";
import Picture from "../../assets/images/picture.svg";
import Star from "../../assets/images/Star.svg";
import UploadPicture from "../../assets/images/UploadPhoto.svg";

import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { Text14, Text16Bold } from "../../components/ui/Typography";

const UploadPhotoScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigation = useNavigation();
  
  const params = useLocalSearchParams();
  const router = useRouter();
  
  const { path, roomType, elementName, selectedStyle } = params;
  const checkImageSize = (image) => {
    return new Promise((resolve) => {
      if (!image || !image.uri) {
        resolve(false);
        return;
      }

      Image.getSize(
        image.uri,
        (width, height) => {
          const meetsRequirement = width >= 550 && height >= 550;
          resolve(meetsRequirement);
        },
        (error) => {
          console.log("Error getting image size:", error);
          resolve(false);
        }
      );
    });
  };

  const handleImageSelection = async (result) => {
    if (!result.canceled && result.assets && result.assets[0]) {
      const image = result.assets[0];
      
      // Check image size
      const meetsSizeRequirement = await checkImageSize(image);
      
      if (!meetsSizeRequirement) {
        Alert.alert(
          "Image Too Small",
          "Please select an image that is at least 550px × 550px or larger for better visualization results.",
          [{ text: "OK" }]
        );
        return;
      }

      setSelectedImage(image);
      setShowConfirmation(true);
    }
  };

  // GALLERY → FULL IMAGE (NO CROP)
  const pickImageFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "Please allow access to photos");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,    // CROP PURA BAND
        quality: 1,
      });

      await handleImageSelection(result);
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "Please allow camera access");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,    // CROP PURA BAND
        quality: 1,
      });

      await handleImageSelection(result);
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

const handleUsePhoto = () => {
  setShowConfirmation(false);

  router.push({
    pathname: "/pages/interior-exterior-style",
    params: {
      path,
      roomType: roomType || "",
      elementName: elementName || "",
      photo: JSON.stringify(selectedImage), // Pass photo forward
    },
  });
};

  const ConfirmationModal = () => (
    <Modal
      visible={showConfirmation}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowConfirmation(false)}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-white p-4 rounded-2xl w-full max-w-md overflow-hidden">
          <View className="flex-row justify-end">
            <TouchableOpacity onPress={() => setShowConfirmation(false)}>
              <Feather name="x" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
          <View className="mb-5">
            <Text16Bold className="font-bold text-center">
              Confirm Your Photo
            </Text16Bold>
          </View>

          {selectedImage && (
            <View>
              <Image
                source={{ uri: selectedImage.uri }}
                className="w-full h-[130px] rounded-xl"
                resizeMode="cover"
              />
              <View className="mt-2">
                <Text14 className="text-green-600 font-semibold text-center">
                  ✓ Image meets size requirements (550px × 550px+)
                </Text14>
              </View>
              <Text14 className="mt-4 mb-5 text-[#767C8C]">
                Is this the photo you want to use for visualization?
              </Text14>
            </View>
          )}

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Button
                variant="beta"
                className="w-full"
                onPress={pickImageFromGallery}
              >
                Gallery
              </Button>
            </View>
            <View className="flex-1">
              <Button
                variant="primary"
                className="w-full"
                onPress={handleUsePhoto}
              >
                Use this photo
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <Header
          left={<Back />}
          onLeftPress={() => router.back()}
          title="Upload Photo"
          rightWidth={60}
        />

        <View className="p-6 bg-white rounded-lg">
          <View className="items-center mb-8">
            <View className="mb-4">
              <UploadPicture />
            </View>
            <Text16Bold className="font-bold text-center mb-2">
              Upload Your {roomType || elementName} Photo
            </Text16Bold>
            <Text14 className="text-[#767C8C] text-center leading-6">
              Upload a photo of your {path === "exterior" ? "facade" : "room"} to explore styles and materials.
            </Text14>
          </View>

          <View className="border-l-primary rounded-md border-l-[3px] mb-6">
            <View className="bg-background rounded-xl p-4">
              <View className="flex-row items-start gap-3">
                <AiLight />
                <View className="flex-1">
                  <Text14 className="text-grayLight">
                    AI guidance: Make sure your {path === "exterior" ? "facade" : "room"} is well-lit for best results
                  </Text14>
                  <Text14 className="text-grayLight mt-1">
                    • Minimum image size: 550px × 550px
                  </Text14>
                  <Text14 className="text-grayLight">
                    • Higher resolution images work better
                  </Text14>
                </View>
              </View>
            </View>
          </View>

          <View className="flex gap-6">
            <TouchableOpacity
              onPress={pickImageFromGallery}
              className="flex-row justify-center gap-4 bg-gray-50 rounded-2xl py-4 items-center border-2 border-dashed border-primary"
            >
              <Picture />
              <Text16Bold className="text-center mb-1">
                Upload from gallery
              </Text16Bold>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={takePhoto}
              className="flex-row justify-center gap-4 bg-[#E6EFF699] rounded-2xl py-4 items-center border-2 border-dashed border-[#20C375]"
            >
              <Entypo name="camera" size={28} color="#20C375" />
              <Text16Bold className="text-center pt-1 mb-1 text-[#20C375]">
                Take a photo
              </Text16Bold>
            </TouchableOpacity>
          </View>
        </View>

        <View className="p-6 my-6 bg-white rounded-xl">
          <View className="flex-row items-center gap-3">
            <Star />
            <Text16Bold className="">Best Practices Examples</Text16Bold>
          </View>
          <Text14 className="text-[#767C8C] my-3">
            Follow these examples for the best visualization results
          </Text14>

          <View className="flex-row gap-3">
            <View className="relative w-[49%] h-[130] rounded-lg overflow-hidden">
              <Image
                source={BestPrectice}
                resizeMode="cover"
                className="w-[100%] h-[100%] rounded-lg"
              />
              <View className="bg-LightGreen absolute rounded-md right-2 top-2">
                <Text className="text-white p-2">Best Example</Text>
              </View>
            </View>
            <View className="relative w-[49%] h-[130] rounded-lg overflow-hidden">
              <Image
                source={BestPrectice}
                resizeMode="cover"
                className="w-[100%] h-[100%]"
              />
              <View className="bg-DardkRed absolute rounded-md right-2 top-2">
                <Text className="text-white p-2">Avoid This</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="pb-8">
          <Button
            variant="primary"
            className="w-full"
            onPress={() =>
              selectedImage
                ? setShowConfirmation(true)
                : Alert.alert("Please select a photo first")
            }
          >
            Continue
          </Button>
        </View>
      </ScrollView>

      <ConfirmationModal />
    </SafeAreaView>
  );
};

export default UploadPhotoScreen;