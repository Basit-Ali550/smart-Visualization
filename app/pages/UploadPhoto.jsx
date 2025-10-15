// import { Entypo, Feather } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useState } from "react";
// import {
//   Alert,
//   Image,
//   Modal,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// // Your components
// import { useNavigation } from "@react-navigation/native";
// import AiLight from "../../assets/images/AiLight.svg";
// import Back from "../../assets/images/back.svg";
// import BestPrectice from "../../assets/images/BestPrectice.jpg";
// import Picture from "../../assets/images/picture.svg";
// import Star from "../../assets/images/Star.svg";
// import UploadPicture from "../../assets/images/UploadPhoto.svg";
// import Button from "../../components/ui/Button";
// import Header from "../../components/ui/Header";
// import { Text12, Text14, Text16Bold } from "../../components/ui/Typography";

// const UploadPhotoScreen = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const navigation = useNavigation();
//   // Use Expo Router hooks instead of route props
//   const params = useLocalSearchParams();
//   const router = useRouter();
//   const roomType = params?.roomType || "Room";

//   // Best practices examples data
//   const bestPractices = [
//     {
//       id: 1,
//       type: "good",
//       image:
//         "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop",
//       title: "Best example",
//       description: "Well-lit, clear view of entire room",
//     },
//     {
//       id: 2,
//       type: "bad",
//       image:
//         "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=150&fit=crop",
//       title: "Avoid this",
//       description: "Dark, cluttered, poor lighting",
//     },
//   ];

//   const pickImageFromGallery = async () => {
//     try {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert(
//           "Permission required",
//           "Sorry, we need camera roll permissions to make this work!"
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       });

//       if (!result.canceled) {
//         setSelectedImage(result.assets[0]);
//         setShowConfirmation(true);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to pick image from gallery");
//     }
//   };

//   const takePhoto = async () => {
//     try {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert(
//           "Permission required",
//           "Sorry, we need camera permissions to make this work!"
//         );
//         return;
//       }

//       const result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       });

//       if (!result.canceled) {
//         setSelectedImage(result.assets[0]);
//         setShowConfirmation(true);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to take photo");
//     }
//   };

//   const handleUsePhoto = () => {
//     setShowConfirmation(false);
//     // Use Expo Router navigation
//     router.push({
//       pathname: "/StyleSelection",
//       params: {
//         roomType: roomType,
//         photo: JSON.stringify(selectedImage),
//       },
//     });
//   };

//   const BestPracticeCard = ({ practice }) => (
//     <View
//       className={`flex-1 mx-1 p-3 rounded-xl ${
//         practice.type === "good" ? "bg-green-50" : "bg-red-50"
//       }`}
//     >
//       <Image
//         source={{ uri: practice.image }}
//         className="w-full h-20 rounded-lg mb-2"
//       />
//       <Text14 className="font-semibold mb-1">{practice.title}</Text14>
//       <Text12 className="text-[#767C8C]">{practice.description}</Text12>
//     </View>
//   );

//   // Confirmation Modal
//   const ConfirmationModal = () => (
//     <Modal
//       visible={showConfirmation}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={() => setShowConfirmation(false)}
//     >
//       <View className="flex-1 bg-black/50 justify-center items-center px-6">
//         <View className="bg-white p-4 rounded-2xl w-full max-w-md overflow-hidden">
//           {/* Modal Header */}
//           <View className="flex-row justify-end ">
//             <TouchableOpacity
//               className="w-8"
//               onPress={() => setShowConfirmation(false)}
//             >
//               <Feather name="x" size={24} color="#000000" />
//             </TouchableOpacity>
//           </View>
//           <View className=" mb-5">
//             <Text16Bold className="font-bold text-center">
//               Confirm Your Photo
//             </Text16Bold>
//           </View>

//           {/* Selected Photo Preview */}
//           {selectedImage && (
//             <View>
//               <Image
//                 source={{ uri: selectedImage.uri }}
//                 className="w-full h-[130px] rounded-xl"
//                 resizeMode="cover"
//               />
//               <Text14 className="mt-4 mb-5 text-[#767C8C]">
//                 Is this the photo you want to use for visualization?
//               </Text14>
//             </View>
//           )}

//           {/* Modal Actions */}
//           <View className="flex-row gap-4">
//             <View className="flex-1">
//               <Button
//                 variant="beta"
//                 className="w-full"
//                 onPress={handleUsePhoto}
//               >
//                 Gallery
//               </Button>
//             </View>
//             <View className="flex-1">
//               <Button
//                 variant="primary"
//                 className="w-full"
//                 onPress={handleUsePhoto}
//               >
//                 Use this photo
//               </Button>
//             </View>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );

//   return (
//     <SafeAreaView className="flex-1">
//       <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
//         {/* Header Section */}

//         <Header
//           left={<Back />}
//           onLeftPress={() => router.back()}
//           title="Upload Photo"
//           rightWidth={60}
//         />

//         <View className="p-6   bg-white rounded-lg">
//           {/* Main Content */}
//           <View className="items-center mb-8">
//             <View className="mb-4">
//               <UploadPicture />
//             </View>
//             <Text16Bold className="font-bold text-center mb-2">
//               Upload Your {roomType} Photo
//             </Text16Bold>
//             <Text14 className="text-[#767C8C] text-center leading-6">
//               Upload a photo of your room or facade to explore styles and
//               materials.
//             </Text14>
//           </View>

//           {/* AI Guidance */}
//           <View className="border-l-primary rounded-md border-l-[3px] mb-6">
//             <View className="bg-background  rounded-xl p-4  ">
//               <View className="flex-row items-start gap-3">
//                 <AiLight />
//                 <View className="flex-1">
//                   <Text14 className="text-grayLight">
//                     AI guidance: Make sure your room is well-lit for best
//                     results
//                   </Text14>
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View className="flex gap-6">
//             {/* Gallery Upload */}
//             <TouchableOpacity
//               onPress={pickImageFromGallery}
//               className=" flex-row justify-center gap-4 bg-gray-50 rounded-2xl py-4  items-center border-2 border-dashed border-primary "
//             >
//               <Picture />

//               <Text16Bold className="text-center mb-1">
//                 Upload from gallery
//               </Text16Bold>
//             </TouchableOpacity>

//             {/* Camera Upload */}
//             <TouchableOpacity
//               onPress={takePhoto}
//               className=" flex-row justify-center itme gap-4 bg-[#E6EFF699] rounded-2xl py-4  items-center border-2 border-dashed border-[#20C375] "
//             >
//               <Entypo name="camera" size={28} color="#20C375" />
//               <Text16Bold className="text-center pt-1 mb-1 text-[#20C375]">
//                 Take a photo
//               </Text16Bold>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Best Practices Section */}
//         <View className=" p-6 my-6  bg-white rounded-xl">
//           <View className="flex-row items-center gap-3 ">
//             <Star />
//             <Text16Bold className="">Best Practices Examples</Text16Bold>
//           </View>
//           <Text14 className="text-[#767C8C] my-3 ">
//             Follow these examples for the best visualization results
//           </Text14>

//           <View className="flex-row gap-3">
//             <View className="relative w-[49%] h-[130] rounded-lg overflow-hidden">
//               <Image
//                 source={BestPrectice}
//                 resizeMode="cover"
//                 className="w-[100%] h-[100%] rounded-lg"
//               />
//               <View className="bg-LightGreen absolute rounded-md right-2 top-2">
//                 <Text className="text-white p-2 ">Best Exmaple</Text>
//               </View>
//             </View>
//             <View className="relative w-[49%] h-[130] rounded-lg overflow-hidden">
//               <Image
//                 source={BestPrectice}
//                 resizeMode="cover"
//                 className="w-[100%] h-[100%]"
//               />
//               <View className="bg-DardkRed absolute rounded-md right-2 top-2">
//                 <Text className="text-white p-2 ">Avoid This</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Continue Button */}
//         <View className="pb-8">
//           <Button
//             variant="primary"
//             className="w-full"
//             onPress={() =>
//               selectedImage
//                 ? setShowConfirmation(true)
//                 : Alert.alert("Please select a photo first")
//             }
//             // disabled={!selectedImage}
//           >
//             Continue
//           </Button>
//         </View>
//       </ScrollView>

//       {/* Confirmation Modal */}
//       <ConfirmationModal />
//     </SafeAreaView>
//   );
// };

// export default UploadPhotoScreen;

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

// Your components
import { useNavigation } from "@react-navigation/native";
import AiLight from "../../assets/images/AiLight.svg";
import Back from "../../assets/images/back.svg";
import BestPrectice from "../../assets/images/BestPrectice.jpg";
import Picture from "../../assets/images/picture.svg";
import Star from "../../assets/images/Star.svg";
import UploadPicture from "../../assets/images/UploadPhoto.svg";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { Text12, Text14, Text16Bold } from "../../components/ui/Typography";

const UploadPhotoScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigation = useNavigation();
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
    // Navigate to MyProjectsScreen using Expo Router
    router.push({
      pathname: "/Pages/StyleSelection",
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
        <View className="bg-white p-4 rounded-2xl w-full max-w-md overflow-hidden">
          {/* Modal Header */}
          <View className="flex-row justify-end ">
            <TouchableOpacity
              className="w-8"
              onPress={() => setShowConfirmation(false)}
            >
              <Feather name="x" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
          <View className=" mb-5">
            <Text16Bold className="font-bold text-center">
              Confirm Your Photo
            </Text16Bold>
          </View>

          {/* Selected Photo Preview */}
          {selectedImage && (
            <View>
              <Image
                source={{ uri: selectedImage.uri }}
                className="w-full h-[130px] rounded-xl"
                resizeMode="cover"
              />
              <Text14 className="mt-4 mb-5 text-[#767C8C]">
                Is this the photo you want to use for visualization?
              </Text14>
            </View>
          )}

          {/* Modal Actions */}
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
        {/* Header Section */}
        <Header
          left={<Back />}
          onLeftPress={() => router.back()}
          title="Upload Photo"
          rightWidth={60}
        />

        <View className="p-6 bg-white rounded-lg">
          {/* Main Content */}
          <View className="items-center mb-8">
            <View className="mb-4">
              <UploadPicture />
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
          <View className="border-l-primary rounded-md border-l-[3px] mb-6">
            <View className="bg-background rounded-xl p-4">
              <View className="flex-row items-start gap-3">
                <AiLight />
                <View className="flex-1">
                  <Text14 className="text-grayLight">
                    AI guidance: Make sure your room is well-lit for best
                    results
                  </Text14>
                </View>
              </View>
            </View>
          </View>

          <View className="flex gap-6">
            {/* Gallery Upload */}
            <TouchableOpacity
              onPress={pickImageFromGallery}
              className="flex-row justify-center gap-4 bg-gray-50 rounded-2xl py-4 items-center border-2 border-dashed border-primary"
            >
              <Picture />
              <Text16Bold className="text-center mb-1">
                Upload from gallery
              </Text16Bold>
            </TouchableOpacity>

            {/* Camera Upload */}
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

        {/* Best Practices Section */}
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

        {/* Continue Button */}
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

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </SafeAreaView>
  );
};

export default UploadPhotoScreen;
