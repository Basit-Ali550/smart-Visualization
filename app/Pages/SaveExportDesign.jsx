// import AntDesign from "@expo/vector-icons/AntDesign";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import Image1 from "../../assets/images/Image.svg";
// import Link from "../../assets/images/Link.svg";
// import Mail from "../../assets/images/Mail.svg";
// import Pdf from "../../assets/images/Pdf.svg";
// import Whatsapp from "../../assets/images/WhatsApp.svg";

// import Button from "../../components/ui/Button";
// import { Text12, Text16Bold } from "../../components/ui/Typography";
// const Frame6 = require("../../assets/images/Frame6.png");
// const SaveExportDesign = () => {
//   return (
//     <ScrollView className="flex-1">
//       <View className="flex-col h-[99Vh] justify-between">
//         <View>
//           {/* Header */}
//           <View className="flex-row justify-center items-center py-3">
//             <Text16Bold className="text-center ml-3">
//               Save & Export Design
//             </Text16Bold>
//           </View>

//           {/* Preview Image */}
//           <View className=" mt-4">
//             <Image source={Frame6} className="w-full h-40 rounded-xl" />
//           </View>

//           {/* Design Info */}
//           <View className="mt-3">
//             <Text16Bold>Modern Living Room Design</Text16Bold>
//             <Text12 className="mt-0.5">Last modified: Today, 3:45 PM</Text12>
//           </View>

//           {/* Save to Account Checkbox */}
//           <View className="flex-row bg-white rounded-xl p-4 mt-4">
//             <View className="w-6 mt-1 h-6 rounded-md  justify-center items-center bg-[#0461A6]">
//               <AntDesign name="check" size={14} color="white" />
//             </View>
//             <View className="ml-3">
//               <Text className="text-[#464646] text-sm font-semibold">
//                 Save to my account
//               </Text>
//               <Text12>Access your design anytime from any device</Text12>
//             </View>
//           </View>

//           {/* Export Design */}
//           <View className="mt-4">
//             <Text16Bold>Export Design</Text16Bold>
//             <View className="flex-row justify-between mt-4">
//               <TouchableOpacity className="w-[48%] bg-white rounded-xl p-4 items-center">
//                 <Image1 />
//                 <Text className="mt-2 text-[#000000] text-sm font-semibold">
//                   PNG Image
//                 </Text>
//                 <Text className="text-[#A5A5A5] text-[10px] font-normal">
//                   High-quality image
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="w-[48%] bg-white rounded-xl p-4 items-center">
//                 <Pdf />
//                 <Text className="mt-2 text-[#000000] text-sm font-semibold">
//                   PDF Document
//                 </Text>
//                 <Text className="text-[#A5A5A5] text-[10px] font-normal">
//                   With material list
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Share Options */}
//           <View className=" mt-6">
//             <Text16Bold>Export Design</Text16Bold>
//             <View className="flex-row justify-between mt-4">
//               <TouchableOpacity className="w-[31%] bg-white rounded-xl p-4 items-center">
//                 <Mail />
//                 <Text className="mt-2 text-[#000000] text-xs font-semibold ">
//                   Email
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="w-[31%] bg-white rounded-xl p-4 items-center">
//                 <Whatsapp />
//                 <Text className="mt-2 text-[#000000] text-xs font-semibold ">
//                   WhatsApp
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="w-[31%] bg-white rounded-xl p-4 items-center">
//                 <Link />
//                 <Text className="mt-2 text-[#000000] text-xs font-semibold ">
//                   Copy Link
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//         {/* Save & Export Button */}
//         <View className="flex-col justify-end mb-6">
//           <Button variant="primary">Save and export</Button>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default SaveExportDesign;
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Clipboard from "expo-clipboard";
import * as MailComposer from "expo-mail-composer";
import * as MediaLibrary from "expo-media-library";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Back from "../../assets/images/back.svg";

// Your SVG imports
import Image1 from "../../assets/images/Image.svg";
import Link from "../../assets/images/Link.svg";
import Mail from "../../assets/images/Mail.svg";
import Pdf from "../../assets/images/Pdf.svg";
import Whatsapp from "../../assets/images/WhatsApp.svg";

import { useRouter } from "expo-router";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { Text12, Text16Bold } from "../../components/ui/Typography";

const Frame6 = require("../../assets/images/Frame6.png");

const SaveExportDesign = () => {
  // Replace with your actual design link
  const designLink = "https://yourapp.com/design/12345";
  const router = useRouter();
  // Function to copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(designLink);
      Alert.alert("Success", "Link copied to clipboard!");
    } catch (error) {
      Alert.alert("Error", "Failed to copy link");
      console.error("Copy error:", error);
    }
  };

  // Function to share via WhatsApp
  const handleShareWhatsApp = async () => {
    try {
      const message = `Check out my design: ${designLink}`;
      const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp is not installed on your device");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open WhatsApp");
      console.error("WhatsApp error:", error);
    }
  };

  // Function to share via Email
  const handleShareEmail = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (isAvailable) {
        await MailComposer.composeAsync({
          subject: "My Design",
          body: `Check out my design: ${designLink}`,
          recipients: [],
        });
      } else {
        Alert.alert("Error", "Email is not available on your device");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open email");
      console.error("Email error:", error);
    }
  };

  // Function to save image to device
  const handleSaveImage = async () => {
    try {
      // Request permissions for media library
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant permission to save images to your gallery"
        );
        return;
      }

      // For local images, you can use the asset directly
      // For remote images, you'd need to download them first
      const asset = await MediaLibrary.createAssetAsync(
        Image.resolveAssetSource(Frame6).uri
      );
      await MediaLibrary.createAlbumAsync("My Designs", asset, false);

      Alert.alert("Success", "Image saved to your gallery!");
    } catch (error) {
      Alert.alert("Error", "Failed to save image");
      console.error("Save image error:", error);
    }
  };

  // Function to handle Save and Export
  const handleSaveAndExport = async () => {
    try {
      // Save the image
      await handleSaveImage();

      // You can add additional export logic here
      Alert.alert("Success", "Design saved and exported successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save and export design");
      console.error("Save and export error:", error);
    }
  };

  // Function to export as PNG
  const handleExportPNG = async () => {
    try {
      await handleSaveImage();
      Alert.alert("Success", "PNG image exported successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to export PNG");
    }
  };

  // Function to export as PDF
  const handleExportPDF = async () => {
    try {
      // For PDF export, you might want to generate a PDF file
      // This is a placeholder - implement your PDF generation logic
      Alert.alert(
        "PDF Export",
        "PDF export functionality would be implemented here"
      );
    } catch (error) {
      Alert.alert("Error", "Failed to export PDF");
      console.error("PDF export error:", error);
    }
  };

  return (
    <ScrollView className="flex-1">
      <View className="flex-col h-[99Vh] justify-between">
        <View>
          {/* Header */}
          <View className=" mt-6">
            <Header
              left={<Back />}
              onLeftPress={() => router.back()}
              title="Save & Export Design"
              right={""}
              onRightPress={() => setIsModalVisible(true)}
              rightWidth={60}
            />
          </View>

          {/* Preview Image */}
          <View className="">
            <Image source={Frame6} className="w-full h-40 rounded-xl" />
          </View>

          {/* Design Info */}
          <View className="mt-3">
            <Text16Bold>Modern Living Room Design</Text16Bold>
            <Text12 className="mt-0.5">Last modified: Today, 3:45 PM</Text12>
          </View>

          {/* Save to Account Checkbox */}
          <View className="flex-row bg-white rounded-xl p-4 mt-4">
            <View className="w-6 mt-1 h-6 rounded-md  justify-center items-center bg-[#0461A6]">
              <AntDesign name="check" size={14} color="white" />
            </View>
            <View className="ml-3">
              <Text className="text-[#464646] text-sm font-semibold">
                Save to my account
              </Text>
              <Text12>Access your design anytime from any device</Text12>
            </View>
          </View>

          {/* Export Design */}
          <View className="mt-4">
            <Text16Bold>Export Design</Text16Bold>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="w-[48%] bg-white rounded-xl p-4 items-center"
                onPress={handleExportPNG}
              >
                <Image1 />
                <Text className="mt-2 text-[#000000] text-sm font-semibold">
                  PNG Image
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  High-quality image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] bg-white rounded-xl p-4 items-center"
                onPress={handleExportPDF}
              >
                <Pdf />
                <Text className="mt-2 text-[#000000] text-sm font-semibold">
                  PDF Document
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  With material list
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Share Options */}
          <View className=" mt-6">
            <Text16Bold>Share Design</Text16Bold>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="w-[31%] bg-white rounded-xl p-4 items-center"
                onPress={handleShareEmail}
              >
                <Mail />
                <Text className="mt-2 text-[#000000] text-xs font-semibold ">
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[31%] bg-white rounded-xl p-4 items-center"
                onPress={handleShareWhatsApp}
              >
                <Whatsapp />
                <Text className="mt-2 text-[#000000] text-xs font-semibold ">
                  WhatsApp
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[31%] bg-white rounded-xl p-4 items-center"
                onPress={handleCopyLink}
              >
                <Link />
                <Text className="mt-2 text-[#000000] text-xs font-semibold ">
                  Copy Link
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save & Export Button */}
        <View className="flex-col justify-end mb-6">
          <Button variant="primary" onPress={handleSaveAndExport}>
            Save and export
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default SaveExportDesign;
