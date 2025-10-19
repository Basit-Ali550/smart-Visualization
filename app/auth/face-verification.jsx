import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
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
import Svg, { Defs, Ellipse, Mask, Rect } from "react-native-svg";
import Face from "../../assets/images/Face.svg";
import Button from "../../components/ui/Button";
import {
  Text16,
  Text16Bold,
  Text20,
  Text24,
} from "../../components/ui/Typography";
import { useAuth } from "../../context/AuthContext";

const FaceVerificationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user, updateUserData, hasAvatar, token } = useAuth();

  const { firstName, lastName, email, userId } = params;
  const [facing, setFacing] = useState("front");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [uploadLoading, setUploadLoading] = useState(false);

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
          skipProcessing: false,
          exif: false,
        });

        console.log("📸 Photo captured");
        setVerificationStatus("processing");
        await updateProfileWithAvatar(photo.uri);
      } catch (error) {
        console.error("❌ Camera error:", error);
        Alert.alert("Error", "Failed to capture image.");
        resetVerification();
      }
    }
  };

  const updateProfileWithAvatar = async (imageUri) => {
    try {
      setUploadLoading(true);
      console.log("🔄 Starting DIRECT PATCH API call...");

      // ✅ Get token directly from SecureStore
      const authToken = await SecureStore.getItemAsync("authToken");

      if (!authToken) {
        throw new Error("No authentication token found");
      }

      console.log(
        "🔐 Token retrieved:",
        authToken ? "✅ Present" : "❌ Missing"
      );

      // ✅ Create FormData
      const formData = new FormData();

      // Append text fields
      if (firstName) {
        formData.append("first_name", firstName);
        console.log("✅ first_name:", firstName);
      }
      if (lastName) {
        formData.append("last_name", lastName);
        console.log("✅ last_name:", lastName);
      }

      // Append file field
      if (imageUri) {
        formData.append("avatar", {
          uri: imageUri,
          type: "image/jpeg",
          name: "avatar.jpg",
        });
        console.log("✅ avatar file appended");
      }

      // ✅ DIRECT API CALL with fetch
      console.log("🚀 Making DIRECT PATCH request...");
      console.log("🌐 URL: https://api.unitec.run.place/api/v1/users/profile");

      const response = await fetch(
        "https://api.unitec.run.place/api/v1/users/profile",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
            // ❌ DON'T set Content-Type for FormData - let browser set it automatically
          },
          body: formData,
        }
      );

      console.log("📡 Response Status:", response.status);
      console.log("📡 Response OK:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("❌ Response Error Text:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ DIRECT PATCH SUCCESS!");
      console.log("📊 Response Data:", result);

      // Update user data
      if (updateUserData && result) {
        await updateUserData({
          ...user,
          first_name: result.first_name,
          last_name: result.last_name,
          avatar_url: result.avatar_url,
        });
        console.log("✅ User data updated in context");
      }

      setVerificationStatus("success");
      setTimeout(() => router.replace("/pages/home"), 1500);
    } catch (error) {
      console.error("💥 DIRECT PATCH Error:", error);
      Alert.alert(
        "Upload Failed",
        error.message || "Failed to upload image. Please try again."
      );
      resetVerification();
    } finally {
      setUploadLoading(false);
    }
  };

  const resetVerification = () => {
    setIsVerifying(false);
    setVerificationStatus("pending");
    setUploadLoading(false);
  };

  const handleContinue = () => {
    router.replace("/pages/home");
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
        <Text24 className="text-center mb-4">Camera Permission Required</Text24>
        <Text16 className="text-center mb-8 text-gray-600">
          We need camera access for face verification.
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
        <View className="flex-1 justify-center items-center px-6">
          <ActivityIndicator size="large" />
          <Text20 className="mt-4">
            {uploadLoading ? "Uploading..." : "Processing..."}
          </Text20>
          <Text16 className="text-gray-500 mt-2 text-center">
            Direct API call with multipart/form-data{"\n"}
            Token: {token ? "✅ Present" : "❌ Missing"}
          </Text16>
        </View>
      ) : verificationStatus === "success" ? (
        <View className="flex-1 justify-center items-center px-6">
          <Text16Bold>✅ Verification successful</Text16Bold>
          <Text16 className="text-gray-600 mb-4 text-center">
            Avatar uploaded successfully!{"\n"}
            Redirecting to home...
          </Text16>
          <Button onPress={handleContinue}>Continue to Home</Button>
        </View>
      ) : (
        <View className="flex-1 bg-black">
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing={facing}
            mode="picture"
          />

          <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
            <Defs>
              <Mask id="mask">
                <Rect width="100%" height="100%" fill="white" />
                <Ellipse cx="50%" cy="40%" rx="120" ry="160" fill="black" />
              </Mask>
            </Defs>
            <Rect
              width="100%"
              height="100%"
              fill="#00000099"
              mask="url(#mask)"
            />
          </Svg>

          <View className="absolute top-32 left-0 right-0 items-center px-4">
            <Text className="text-white text-lg font-bold text-center mb-2">
              Position your face in the oval
            </Text>
            <Text className="text-white text-sm text-center">
              We'll upload directly to API
            </Text>
          </View>

          <View className="absolute bottom-12 w-full items-center">
            <TouchableOpacity
              onPress={takePicture}
              disabled={uploadLoading}
              className={`${uploadLoading ? "opacity-50" : "opacity-100"}`}
            >
              <View className="w-20 h-20 bg-white rounded-full border-4 border-blue-500 items-center justify-center">
                <View className="w-16 h-16 bg-blue-500 rounded-full" />
              </View>
            </TouchableOpacity>
            {uploadLoading && (
              <Text className="text-white mt-4 text-center">
                Direct API upload...{"\n"}
                Please wait
              </Text>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FaceVerificationScreen;
