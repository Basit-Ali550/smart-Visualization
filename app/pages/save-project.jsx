// import AntDesign from "@expo/vector-icons/AntDesign";
// import * as Clipboard from "expo-clipboard";
// import * as FileSystem from "expo-file-system";
// import * as MailComposer from "expo-mail-composer";
// import * as MediaLibrary from "expo-media-library";
// import * as Print from "expo-print";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import * as Sharing from "expo-sharing";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Image,
//   Linking,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";
// import Back from "../../assets/images/back.svg";
// import Image1 from "../../assets/images/Image.svg";
// import Link from "../../assets/images/Link.svg";
// import Mail from "../../assets/images/Mail.svg";
// import Pdf from "../../assets/images/Pdf.svg";
// import Whatsapp from "../../assets/images/WhatsApp.svg";
// import Button from "../../components/ui/Button";
// import Header from "../../components/ui/Header";
// import { Text12, Text16Bold } from "../../components/ui/Typography";
// import useGet from "../../hooks/useGet";

// const Frame6 = require("../../assets/images/Frame6.png");

// const SaveExportDesign = () => {
//   const router = useRouter();
//   const { project_id } = useLocalSearchParams();

//   const { data: projectData, loading, error } = useGet(`/api/v1/design/projects/${project_id}`);
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     if (projectData) setProject(projectData);
//   }, [projectData]);

//   const designImageUrl =
//     project?.generations?.[0]?.generated_image_url || project?.original_image_url || Image.resolveAssetSource(Frame6).uri;

//   const designLink = designImageUrl;

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleCopyLink = async () => {
//     try {
//       await Clipboard.setStringAsync(designLink);
//       Alert.alert("Success", "Image link copied to clipboard!");
//     } catch (error) {
//       Alert.alert("Error", "Failed to copy link");
//     }
//   };

//   const handleShareWhatsApp = async () => {
//     try {
//       const message = `Check out my ${project?.name || "design"}: ${designLink}`;
//       const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
//       const canOpen = await Linking.canOpenURL(url);
//       if (canOpen) await Linking.openURL(url);
//       else Alert.alert("Error", "WhatsApp not installed");
//     } catch {
//       Alert.alert("Error", "Failed to open WhatsApp");
//     }
//   };

//   const handleShareEmail = async () => {
//     try {
//       const isAvailable = await MailComposer.isAvailableAsync();
//       if (isAvailable) {
//         await MailComposer.composeAsync({
//           subject: `My Design: ${project?.name || "Untitled"}`,
//           body: `Check out my ${project?.design_style} ${project?.room_type} design: ${designLink}`,
//         });
//       } else {
//         Alert.alert("Error", "Email not available");
//       }
//     } catch {
//       Alert.alert("Error", "Failed to open email");
//     }
//   };

//   const handleSaveImage = async () => {
//     try {
//       const { status } = await MediaLibrary.requestPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission Required", "Please allow access to your gallery");
//         return;
//       }

//       const fileUri = `${FileSystem.documentDirectory}design.png`;
//       const download = await FileSystem.downloadAsync(designImageUrl, fileUri);
//       const asset = await MediaLibrary.createAssetAsync(download.uri);
//       await MediaLibrary.createAlbumAsync("My Designs", asset, false);
//       Alert.alert("Success", "Image saved to gallery!");
//     } catch (error) {
//       Alert.alert("Error", "Failed to save image");
//       console.log(error);
//     }
//   };

//   const handleSaveAndExport = async () => {
//     await handleSaveImage();
//     Alert.alert("Success", "Design saved and exported successfully!");
//   };

//   const handleExportPNG = async () => {
//     await handleSaveImage();
//   };

//   // ✅ PDF Export Implementation
//   const handleExportPDF = async () => {
//     try {
//       const html = `
//         <html>
//           <body style="font-family: Helvetica; padding: 20px;">
//             <h2 style="color: #0461A6;">${project?.name || "My Design"}</h2>
//             <img src="${designImageUrl}" style="width:100%;border-radius:10px;"/>
//             <p><strong>Design Style:</strong> ${project?.design_style || "N/A"}</p>
//             <p><strong>Room Type:</strong> ${project?.room_type || "N/A"}</p>
//             <p><strong>Last Modified:</strong> ${formatDate(project?.updated_at)}</p>
//             <hr/>
//             <p>Generated from your design app.</p>
//           </body>
//         </html>
//       `;

//       const { uri } = await Print.printToFileAsync({ html });
//       await Sharing.shareAsync(uri);
//       Alert.alert("Success", "PDF exported successfully!");
//     } catch (error) {
//       Alert.alert("Error", "Failed to export PDF");
//       console.error(error);
//     }
//   };

//   // ✅ Skeleton Loader (Beautiful shimmer placeholders)
//   if (loading) {
//     return (
//       <ScrollView className="flex-1">
//         <View className="flex-col h-[99Vh] justify-between">
//           <View>
//             <View className="mt-6">
//               <Header
//                 left={<Back />}
//                 onLeftPress={() => router.back()}
//                 title="Save & Export Design"
//                 right={""}
//                 onRightPress={() => {}}
//                 rightWidth={60}
//               />
//             </View>

//             <View className="p-4">
//               <View className="w-full h-40 bg-gray-200 rounded-xl animate-pulse" />
//               <View className="mt-4 h-4 bg-gray-200 w-1/2 rounded animate-pulse" />
//               <View className="mt-2 h-3 bg-gray-200 w-1/3 rounded animate-pulse" />
//               <View className="mt-2 h-3 bg-gray-200 w-2/3 rounded animate-pulse" />
//               <View className="mt-6 h-20 bg-gray-200 rounded-xl animate-pulse" />
//               <View className="mt-4 flex-row justify-between">
//                 <View className="w-[48%] h-28 bg-gray-200 rounded-xl animate-pulse" />
//                 <View className="w-[48%] h-28 bg-gray-200 rounded-xl animate-pulse" />
//               </View>
//               <View className="mt-4 flex-row justify-between">
//                 <View className="w-[31%] h-24 bg-gray-200 rounded-xl animate-pulse" />
//                 <View className="w-[31%] h-24 bg-gray-200 rounded-xl animate-pulse" />
//                 <View className="w-[31%] h-24 bg-gray-200 rounded-xl animate-pulse" />
//               </View>
//             </View>
//           </View>

//           <View className="flex-col justify-end mb-6 items-center">
//             <View className="w-[90%] h-12 bg-gray-300 rounded-xl animate-pulse" />
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }

//   // ❌ Error State
//   if (error || !project) {
//     return (
//       <ScrollView className="flex-1">
//         <View className="flex-col h-[99Vh] justify-between">
//           <View className="mt-6">
//             <Header
//               left={<Back />}
//               onLeftPress={() => router.back()}
//               title="Save & Export Design"
//               right={""}
//               onRightPress={() => {}}
//               rightWidth={60}
//             />
//           </View>
//           <View className="items-center justify-center py-20">
//             <Text16Bold className="text-red-500">Failed to load project</Text16Bold>
//             <Text12 className="text-gray-500 mt-2">{error || "Project not found"}</Text12>
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }

//   return (
//     <ScrollView className="flex-1">
//       <View className="flex-col h-[99Vh] justify-between">
//         <View>
//           <View className="mt-6">
//             <Header
//               left={<Back />}
//               onLeftPress={() => router.back()}
//               title="Save & Export Design"
//               right={""}
//               onRightPress={() => {}}
//               rightWidth={60}
//             />
//           </View>

//           <View>
//             <Image
//               source={{ uri: designImageUrl }}
//               className="w-full h-40 rounded-xl"
//             />
//           </View>

//           <View className="mt-3">
//             <Text16Bold>{project.name}</Text16Bold>
//             <Text12 className="mt-0.5">
//               {project.design_style} • {project.room_type}
//             </Text12>
//             <Text12 className="mt-0.5">
//               Last modified: {formatDate(project.updated_at)}
//             </Text12>
//           </View>

//           <View className="flex-row bg-white rounded-xl p-4 mt-4">
//             <View className="w-6 mt-1 h-6 rounded-md justify-center items-center bg-[#0461A6]">
//               <AntDesign name="check" size={14} color="white" />
//             </View>
//             <View className="ml-3">
//               <Text className="text-[#464646] text-sm font-semibold">
//                 Save to my account
//               </Text>
//               <Text12>Access your design anytime from any device</Text12>
//             </View>
//           </View>

//           <View className="mt-4">
//             <Text16Bold>Export Design</Text16Bold>
//             <View className="flex-row justify-between mt-4">
//               <TouchableOpacity
//                 className="w-[48%] bg-white rounded-xl p-4 items-center"
//                 onPress={handleExportPNG}
//               >
//                 <Image1 />
//                 <Text className="mt-2 text-[#000000] text-sm font-semibold">
//                   PNG Image
//                 </Text>
//                 <Text className="text-[#A5A5A5] text-[10px] font-normal">
//                   High-quality image
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 className="w-[48%] bg-white rounded-xl p-4 items-center"
//                 onPress={handleExportPDF}
//               >
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

//           <View className="mt-6">
//             <Text16Bold>Share Design</Text16Bold>
//             <View className="flex-row justify-between mt-4">
//               <TouchableOpacity
//                 className="w-[31%] bg-white rounded-xl p-4 items-center"
//                 onPress={handleShareEmail}
//               >
//                 <Mail />
//                 <Text className="mt-2 text-[#000000] text-xs font-semibold ">
//                   Email
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 className="w-[31%] bg-white rounded-xl p-4 items-center"
//                 onPress={handleShareWhatsApp}
//               >
//                 <Whatsapp />
//                 <Text className="mt-2 text-[#000000] text-xs font-semibold ">
//                   WhatsApp
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 className="w-[31%] bg-white rounded-xl p-4 items-center"
//                 onPress={handleCopyLink}
//               >
//                 <Link />
//                 <Text className="mt-2 text-[#000000] text-xs font-semibold ">
//                   Copy Link
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         <View className="flex-col justify-end mb-6">
//           <Button variant="primary" onPress={handleSaveAndExport}>
//             Save and export
//           </Button>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default SaveExportDesign;
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import * as MailComposer from "expo-mail-composer";
import * as MediaLibrary from "expo-media-library";
import * as Print from "expo-print";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Back from "../../assets/images/back.svg";
import Image1 from "../../assets/images/Image.svg";
import Link from "../../assets/images/Link.svg";
import Mail from "../../assets/images/Mail.svg";
import Pdf from "../../assets/images/Pdf.svg";
import Whatsapp from "../../assets/images/WhatsApp.svg";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { Text12, Text16Bold } from "../../components/ui/Typography";
import useGet from "../../hooks/useGet";

const Frame6 = require("../../assets/images/Frame6.png");

const SkeletonView = ({ style }) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, [shimmer]);

  const backgroundColor = shimmer.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#e6e6e6", "#f2f2f2", "#e6e6e6"],
  });

  return <Animated.View style={[style, { backgroundColor }]} />;
};

const SaveExportDesign = () => {
  const router = useRouter();
  const { project_id } = useLocalSearchParams();

  const { data: projectData, loading, error } = useGet(`/api/v1/design/projects/${project_id}`);
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (projectData) setProject(projectData);
  }, [projectData]);

  const designImageUrl =
    project?.generations?.[0]?.generated_image_url ||
    project?.original_image_url ||
    Image.resolveAssetSource(Frame6).uri;

  const designLink = designImageUrl;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(designLink);
    Alert.alert("Success", "Image link copied!");
  };

  const handleShareWhatsApp = async () => {
    const message = `Check out my ${project?.name || "design"}: ${designLink}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) await Linking.openURL(url);
    else Alert.alert("Error", "WhatsApp not installed");
  };

  const handleShareEmail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      await MailComposer.composeAsync({
        subject: `My Design: ${project?.name || "Untitled"}`,
        body: `Check out my ${project?.design_style} ${project?.room_type} design: ${designLink}`,
      });
    } else Alert.alert("Error", "Email not available");
  };

  const handleSaveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Please allow access to gallery");
        return;
      }

      const fileUri = `${FileSystem.documentDirectory}design.png`;
      const download = await FileSystem.downloadAsync(designImageUrl, fileUri);
      const asset = await MediaLibrary.createAssetAsync(download.uri);
      await MediaLibrary.createAlbumAsync("My Designs", asset, false);
      Alert.alert("Success", "Image saved!");
    } catch (error) {
      Alert.alert("Error", "Failed to save image");
      console.log(error);
    }
  };

  const handleExportPDF = async () => {
    try {
      const html = `
        <html>
          <body style="font-family: Helvetica; padding: 20px;">
            <h2 style="color:#0461A6;">${project?.name || "My Design"}</h2>
            <img src="${designImageUrl}" style="width:100%;border-radius:10px;"/>
            <p><strong>Design Style:</strong> ${project?.design_style || "N/A"}</p>
            <p><strong>Room Type:</strong> ${project?.room_type || "N/A"}</p>
            <p><strong>Last Modified:</strong> ${formatDate(project?.updated_at)}</p>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
      Alert.alert("Success", "PDF exported!");
    } catch (error) {
      Alert.alert("Error", "Failed to export PDF");
    }
  };

  const handleSaveAndExport = async () => {
    await handleSaveImage();
    Alert.alert("Success", "Design saved and exported!");
  };

  // ✅ Native shimmer skeleton
  if (loading) {
    return (
      <ScrollView className="flex-1">
        <View className="flex-col h-[99Vh] justify-between">
          <View>
            <View className="mt-6">
              <Header
                left={<Back />}
                onLeftPress={() => router.back()}
                title="Save & Export Design"
                right={""}
                onRightPress={() => {}}
                rightWidth={60}
              />
            </View>

            <View style={{ padding: 16 }}>
              <SkeletonView style={{ height: 160, borderRadius: 12, marginTop: 8 }} />
              <SkeletonView style={{ height: 20, width: "60%", borderRadius: 6, marginTop: 16 }} />
              <SkeletonView style={{ height: 14, width: "40%", borderRadius: 6, marginTop: 8 }} />
              <SkeletonView style={{ height: 14, width: "80%", borderRadius: 6, marginTop: 8 }} />
              <SkeletonView style={{ height: 70, borderRadius: 12, marginTop: 20 }} />
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
                <SkeletonView style={{ height: 100, width: "48%", borderRadius: 12 }} />
                <SkeletonView style={{ height: 100, width: "48%", borderRadius: 12 }} />
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
                <SkeletonView style={{ height: 80, width: "31%", borderRadius: 12 }} />
                <SkeletonView style={{ height: 80, width: "31%", borderRadius: 12 }} />
                <SkeletonView style={{ height: 80, width: "31%", borderRadius: 12 }} />
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 20, alignItems: "center" }}>
            <SkeletonView style={{ height: 50, width: "90%", borderRadius: 12 }} />
          </View>
        </View>
      </ScrollView>
    );
  }

  if (error || !project) {
    return (
      <ScrollView className="flex-1">
        <View className="flex-col h-[99Vh] justify-between">
          <View className="mt-6">
            <Header
              left={<Back />}
              onLeftPress={() => router.back()}
              title="Save & Export Design"
              right={""}
              onRightPress={() => {}}
              rightWidth={60}
            />
          </View>
          <View className="items-center justify-center py-20">
            <Text16Bold className="text-red-500">Failed to load project</Text16Bold>
            <Text12 className="text-gray-500 mt-2">{error || "Project not found"}</Text12>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1">
      <View className="flex-col h-[99Vh] justify-between">
        <View>
          <View className="mt-6">
            <Header
              left={<Back />}
              onLeftPress={() => router.back()}
              title="Save & Export Design"
              right={""}
              onRightPress={() => {}}
              rightWidth={60}
            />
          </View>

          <View>
            <Image
              source={{ uri: designImageUrl }}
              className="w-full h-40 rounded-xl"
            />
          </View>

          <View className="mt-3">
            <Text16Bold>{project.name}</Text16Bold>
            <Text12 className="mt-0.5">
              {project.design_style} • {project.room_type}
            </Text12>
            <Text12 className="mt-0.5">
              Last modified: {formatDate(project.updated_at)}
            </Text12>
          </View>

          <View className="flex-row bg-white rounded-xl p-4 mt-4">
            <View className="w-6 mt-1 h-6 rounded-md justify-center items-center bg-[#0461A6]">
              <AntDesign name="check" size={14} color="white" />
            </View>
            <View className="ml-3">
              <Text className="text-[#464646] text-sm font-semibold">
                Save to my account
              </Text>
              <Text12>Access your design anytime from any device</Text12>
            </View>
          </View>

          <View className="mt-4">
            <Text16Bold>Export Design</Text16Bold>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="w-[48%] bg-white rounded-xl p-4 items-center"
                onPress={handleSaveImage}
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

          <View className="mt-6">
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
