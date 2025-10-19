// import { CameraView, useCameraPermissions } from "expo-camera";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Face from "../../assets/images/Face.svg";
// import Button from "../../components/ui/Button";
// import { Text14, Text16, Text20, Text24 } from "../../components/ui/Typography";
// import { useAuth } from "../../context/AuthContext";
// import usePatch from "../../hooks/usePatch";

// const FaceVerificationScreen = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { user, updateUserData, hasAvatar } = useAuth();

//   const { firstName, lastName, email, userId } = params;
//   const [facing, setFacing] = useState("front");
//   const [permission, requestPermission] = useCameraPermissions();
//   const cameraRef = useRef(null);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [verificationStatus, setVerificationStatus] = useState("pending");

//   const { patchData, loading: patchLoading } = usePatch("api/v1/auth/profile");

//   useEffect(() => {
//     if (hasAvatar) {
//       router.replace("/pages/home");
//     }
//   }, [hasAvatar]);

//   const startVerification = async () => {
//     if (!permission?.granted) {
//       const permissionResult = await requestPermission();
//       if (!permissionResult.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Camera permission is required for face verification."
//         );
//         return;
//       }
//     }
//     setIsVerifying(true);
//   };

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       try {
//         const photo = await cameraRef.current.takePictureAsync({
//           quality: 0.8,
//           base64: false,
//           skipProcessing: true,
//           exif: false,
//         });

//         setVerificationStatus("processing");
//         await updateProfileWithAvatar(photo.uri);
//       } catch (error) {
//         console.error("Error taking picture:", error);
//         Alert.alert("Error", "Failed to capture image. Please try again.");
//         resetVerification();
//       }
//     }
//   };

//   const updateProfileWithAvatar = async (imageUri) => {
//     try {
//       // Create FormData
//       const formData = new FormData();

//       // Add text fields
//       if (firstName) {
//         formData.append("first_name", firstName);
//       }
//       if (lastName) {
//         formData.append("last_name", lastName);
//       }

//       // Add avatar file with proper formatting
//       if (imageUri) {
//         // Extract filename from URI
//         const filename = imageUri.split("/").pop();
//         const match = /\.(\w+)$/.exec(filename);
//         const type = match ? `image/${match[1]}` : "image/jpeg";

//         formData.append("avatar", {
//           uri: imageUri,
//           type: type,
//           name: `avatar_${userId || user?.id || "user"}_${Date.now()}.${
//             type.split("/")[1]
//           }`,
//         });
//       }

//       console.log("FormData entries:", {
//         first_name: firstName,
//         last_name: lastName,
//         has_avatar: !!imageUri,
//         user_id: userId || user?.id,
//         image_uri: imageUri ? "Present" : "Missing",
//       });

//       // Make PATCH request
//       const result = await patchData(formData);

//       if (result.success) {
//         console.log("Profile updated successfully:", result.data);

//         // Update user context
//         await updateUserData({
//           first_name: result.data.first_name || firstName,
//           last_name: result.data.last_name || lastName,
//           avatar_url: result.data.avatar_url,
//           has_avatar: true,
//           ...result.data,
//         });

//         setVerificationStatus("success");

//         setTimeout(() => {
//           router.replace("/pages/home");
//         }, 2000);
//       } else {
//         throw new Error(result.error || "Profile update failed");
//       }
//     } catch (error) {
//       console.error("Profile update error:", error);

//       let errorMessage = "Failed to update your profile. Please try again.";

//       if (error.message.includes("Network Error")) {
//         errorMessage =
//           "Network connection error. Please check your internet connection and try again.";
//       } else if (error.message.includes("timeout")) {
//         errorMessage = "Request timed out. Please try again.";
//       } else {
//         errorMessage = error.message || errorMessage;
//       }

//       Alert.alert("Update Failed", errorMessage);
//       resetVerification();
//     }
//   };

//   const resetVerification = () => {
//     setIsVerifying(false);
//     setVerificationStatus("pending");
//   };

//   const handleContinue = () => {
//     router.replace("/pages/home");
//   };

//   const toggleCameraFacing = () => {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   };

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
//         <Text24 className="text-center mb-4">Camera Permission Required</Text24>
//         <Text16 className="text-center mb-8 text-gray-600">
//           We need camera access to verify your identity for security purposes.
//         </Text16>
//         <Button variant="primary" onPress={requestPermission}>
//           Grant Permission
//         </Button>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1">
//       <StatusBar barStyle="light-content" />

//       {!isVerifying ? (
//         // Initial Screen - Instructions
//         <View className="flex-1">
//           <Text className="text-center text-[24px] font-bold my-6">
//             Private photo verification
//           </Text>
//           <View className="items-center flex-1 justify-center mb-12">
//             <View className="rounded-full items-center justify-center mb-12">
//               <Face />
//             </View>
//             <Text className="text-center text-3xl font-medium text-[#000] mb-2">
//               Look into the camera
//             </Text>
//           </View>

//           <View className="space-y-4">
//             <Button
//               variant="primary"
//               onPress={startVerification}
//               disabled={patchLoading}
//             >
//               {patchLoading ? "Starting..." : "Start verification"}
//             </Button>
//           </View>
//         </View>
//       ) : verificationStatus === "processing" ? (
//         // Processing Screen
//         <View className="flex-1 justify-center items-center px-6">
//           <View className="items-center mb-8">
//             <ActivityIndicator size="large" color="#0461A6" />
//             <Text20 className="text-center font-bold mt-4 mb-2">
//               We are processing your data
//             </Text20>
//             <Text16 className="text-center text-gray-600">
//               Your verification status will appear here
//             </Text16>
//             {patchLoading && (
//               <Text14 className="text-center text-blue-600 mt-2">
//                 Uploading your photo...
//               </Text14>
//             )}
//           </View>
//         </View>
//       ) : verificationStatus === "success" ? (
//         // Success Screen
//         <View className="flex-1 justify-center items-center px-6">
//           <View className="items-center mb-8">
//             <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-6">
//               <Text className="text-4xl">✅</Text>
//             </View>
//             <Text24 className="text-center font-bold mb-2 text-green-600">
//               Congratulations
//             </Text24>
//             <Text16 className="text-center text-gray-600 mb-2">
//               Your account has successfully been created.
//             </Text16>
//             <Text16 className="text-center text-gray-600">
//               Please wait 24 hours while we verify your account.
//             </Text16>
//           </View>

//           <Button variant="primary" onPress={handleContinue}>
//             Continue
//           </Button>
//         </View>
//       ) : (
//         // Camera Screen with Clear Oval Mask
//         <View className="flex-1 bg-[#00000099]">
//           <CameraView
//             ref={cameraRef}
//             style={StyleSheet.absoluteFill}
//             facing={facing}
//             mode="picture"
//           />

//           {/* Top header */}
//           <View className="absolute top-0 left-0 right-0 pt-12 px-6 z-10">
//             <View className="flex-row justify-between items-center">
//               <TouchableOpacity
//                 onPress={resetVerification}
//                 className="w-10 h-10 items-center justify-center rounded-full bg-[#00000046] bg-opacity-50"
//                 disabled={patchLoading}
//               >
//                 <Text className="text-white text-lg font-bold">←</Text>
//               </TouchableOpacity>

//               <Text className="text-white text-lg font-semibold">
//                 Face Verification
//               </Text>

//               <TouchableOpacity
//                 onPress={toggleCameraFacing}
//                 className="w-10 h-10 items-center justify-center rounded-full bg-[# #00000099] bg-opacity-50"
//                 disabled={patchLoading}
//               >
//                 <Text className="text-white text-lg">🔄</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Oval Mask Overlay */}
//           <View
//             style={StyleSheet.absoluteFill}
//             className="justify-center items-center"
//           >
//             {/* Black overlay with oval cutout */}
//             <View style={StyleSheet.absoluteFill} className="bg-[#00000099] ">
//               {/* This creates the oval cutout using a mask-like approach */}
//               <View
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   transform: [{ translateX: -140 }, { translateY: -180 }],
//                   width: 280,
//                   height: 360,
//                   borderRadius: 180,
//                   backgroundColor: " #fff",
//                   borderWidth: 2,
//                   borderColor: "white",
//                   borderStyle: "dashed",
//                 }}
//               />
//             </View>

//             {/* Instructions */}
//             <View className="absolute top-32 left-0 right-0 items-center z-20">
//               <Text className="text-white text-xl font-bold text-center mb-2">
//                 Position Your Face
//               </Text>
//               <Text className="text-white text-center text-base opacity-80">
//                 Make sure your face fits within the oval
//               </Text>
//             </View>

//             {/* Transparent oval area where camera shows through */}
//             <View
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: [{ translateX: -140 }, { translateY: -180 }],
//                 width: 280,
//                 height: 360,
//                 borderRadius: 180,
//                 backgroundColor: "transparent",
//                 overflow: "hidden",
//               }}
//             >
//               {/* This is where the camera preview shows through the oval */}
//               <CameraView
//                 ref={cameraRef}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: 180,
//                 }}
//                 facing={facing}
//                 mode="picture"
//               />
//             </View>
//           </View>

//           {/* Bottom controls */}
//           <View className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[ #00000099] via-[ #00000099] to-transparent z-10">
//             <View className="items-center">
//               {/* Capture button */}
//               <TouchableOpacity
//                 onPress={takePicture}
//                 disabled={patchLoading}
//                 className="w-24 h-24 items-center justify-center mb-4"
//               >
//                 <View className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-lg">
//                   <View
//                     className={`w-16 h-16 rounded-full border-4 ${
//                       patchLoading
//                         ? "bg-gray-400 border-gray-500"
//                         : "bg-white border-blue-500"
//                     }`}
//                   />
//                 </View>
//               </TouchableOpacity>

//               {/* Helper text */}
//               <Text className="text-white text-center text-sm opacity-70 mb-2">
//                 Tap to capture
//               </Text>
//               <Text className="text-white text-center text-xs opacity-60">
//                 Center your face in the oval and ensure good lighting
//               </Text>
//             </View>
//           </View>

//           {/* Loading overlay */}
//           {patchLoading && (
//             <View className="absolute top-0 left-0 right-0 bottom-0 bg-[#00000099]  justify-center items-center z-20">
//               <ActivityIndicator size="large" color="#FFFFFF" />
//               <Text className="text-white text-lg mt-4">
//                 Processing your photo...
//               </Text>
//             </View>
//           )}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default FaceVerificationScreen;
// ✅ Complete updated code
import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Defs, Mask, Rect } from "react-native-svg"; // ✅ Added for oval mask
import Face from "../../assets/images/Face.svg";
import Button from "../../components/ui/Button";
import { Text16, Text20, Text24 } from "../../components/ui/Typography";
import { useAuth } from "../../context/AuthContext";
import usePatch from "../../hooks/usePatch";

const FaceVerificationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user, updateUserData, hasAvatar } = useAuth();

  const { firstName, lastName, email, userId } = params;
  const [facing, setFacing] = useState("front");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("pending");

  const { patchData, loading: patchLoading } = usePatch("api/v1/auth/profile");

  useEffect(() => {
    if (hasAvatar) {
      router.replace("/pages/home");
    }
  }, [hasAvatar]);

  const startVerification = async () => {
    if (!permission?.granted) {
      const permissionResult = await requestPermission();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Camera permission is required for face verification."
        );
        return;
      }
    }
    setIsVerifying(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
          skipProcessing: true,
          exif: false,
        });

        setVerificationStatus("processing");
        await updateProfileWithAvatar(photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to capture image. Please try again.");
        resetVerification();
      }
    }
  };

  const updateProfileWithAvatar = async (imageUri) => {
    try {
      const formData = new FormData();

      if (firstName) {
        formData.append("first_name", firstName);
      }
      if (lastName) {
        formData.append("last_name", lastName);
      }

      if (imageUri) {
        const filename = imageUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("avatar", {
          uri: imageUri,
          type: type,
          name: `avatar_${userId || user?.id || "user"}_${Date.now()}.${
            type.split("/")[1]
          }`,
        });
      }

      const result = await patchData(formData);

      if (result.success) {
        await updateUserData({
          first_name: result.data.first_name || firstName,
          last_name: result.data.last_name || lastName,
          avatar_url: result.data.avatar_url,
          has_avatar: true,
          ...result.data,
        });

        setVerificationStatus("success");

        setTimeout(() => {
          router.replace("/pages/home");
        }, 2000);
      } else {
        throw new Error(result.error || "Profile update failed");
      }
    } catch (error) {
      Alert.alert("Update Failed", error.message);
      resetVerification();
    }
  };

  const resetVerification = () => {
    setIsVerifying(false);
    setVerificationStatus("pending");
  };

  const handleContinue = () => {
    router.replace("/pages/home");
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
        <Text24 className="text-center mb-4">Camera Permission Required</Text24>
        <Text16 className="text-center mb-8 text-gray-600">
          We need camera access to verify your identity.
        </Text16>
        <Button variant="primary" onPress={requestPermission}>
          Grant Permission
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="light-content" />

      {!isVerifying ? (
        // ✅ Initial screen
        <View className="flex-1">
          <Text className="text-center text-[24px] font-bold my-6">
            Private photo verification
          </Text>
          <View className="items-center flex-1 justify-center mb-12">
            <Face />
            <Text className="text-center text-3xl font-medium text-[#000] mb-2">
              Look into the camera
            </Text>
          </View>
          <Button variant="primary" onPress={startVerification}>
            Start Verification
          </Button>
        </View>
      ) : verificationStatus === "processing" ? (
        // ✅ Processing Screen
        <View className="flex-1 justify-center items-center px-6">
          <ActivityIndicator size="large" color="#0461A6" />
          <Text20 className="mt-4">Processing...</Text20>
        </View>
      ) : verificationStatus === "success" ? (
        // ✅ Success Screen
        <View className="flex-1 justify-center items-center px-6">
          <Text24>✅ Verification successful</Text24>
          <Button onPress={handleContinue}>Continue</Button>
        </View>
      ) : (
        // ✅ CAMERA SCREEN WITH OVAL MASK
        <View className="flex-1 bg-black">
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing={facing}
          />

          {/* ✅ OVAL MASK OVERLAY */}
          <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
            <Defs>
              <Mask id="mask">
                <Rect width="100%" height="100%" fill="white" />
                <Circle cx="50%" cy="40%" r="140" fill="black" />
              </Mask>
            </Defs>
            <Rect
              width="100%"
              height="100%"
              fill="#00000099"
              mask="url(#mask)"
            />
          </Svg>

          {/* ✅ Instructions */}
          <View className="absolute top-32 left-0 right-0 items-center">
            <Text className="text-white text-lg font-bold">
              Position your face in the oval
            </Text>
          </View>

          {/* ✅ Capture button */}
          <View className="absolute bottom-12 w-full items-center">
            <TouchableOpacity onPress={takePicture}>
              <View className="w-20 h-20 bg-white rounded-full border-4 border-blue-500" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FaceVerificationScreen;
