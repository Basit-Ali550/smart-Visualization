import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Appreance from "../../assets/Icon/Appreance.svg";
import Notification from "../../assets/Icon/Notification.svg";
import PersonIcon from "../../assets/Icon/PersonIcon.svg";
import Shield from "../../assets/Icon/Shield.svg";
import Button from "../../components/ui/Button";
import ToggleButton from "../../components/ui/ToggleButton";
import { Text12, Text14, Text16Bold } from "../../components/ui/Typography";
import { useAuth } from "../../context/AuthContext";
import usePost from "../../hooks/usePost";

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [appearance, setAppearance] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { user, logout, token, updateUserData } = useAuth();
  const { postData, loading } = usePost("api/v1/auth/logout");
  const router = useRouter();

  // Image Upload Handler - ONLY for profile picture
  const handleProfilePictureUpload = async () => {
    try {
      // Request camera and gallery permissions
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: galleryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || galleryStatus !== "granted") {
        Alert.alert(
          "Permission Required",
          "Camera and gallery permissions are required to upload images."
        );
        return;
      }

      // Show action sheet for camera or gallery
      Alert.alert("Update Profile Picture", "Choose an option", [
        {
          text: "Take Photo",
          onPress: takePhoto,
        },
        {
          text: "Choose from Gallery",
          onPress: pickImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.error("Error requesting permissions:", error);
      Alert.alert("Error", "Failed to access camera or gallery.");
    }
  };

  // Take photo with camera
  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert("Error", "Failed to take photo.");
    }
  };

  // Pick image from gallery
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Gallery error:", error);
      Alert.alert("Error", "Failed to pick image from gallery.");
    }
  };

  // Upload image to server
  const uploadImage = async (imageUri) => {
    try {
      setUploading(true);

      // Get token from SecureStore
      const authToken = await SecureStore.getItemAsync("authToken");

      if (!authToken) {
        throw new Error("No authentication token found");
      }

      // Create FormData
      const formData = new FormData();
      formData.append("avatar", {
        uri: imageUri,
        type: "image/jpeg",
        name: `avatar_${user?.id || "user"}_${Date.now()}.jpg`,
      });

      // Add name fields if available to maintain existing data
      if (user?.first_name) {
        formData.append("first_name", user.first_name);
      }
      if (user?.last_name) {
        formData.append("last_name", user.last_name);
      }

      // Make PATCH request
      const response = await fetch(
        "https://api.unitec.run.place/api/v1/users/profile",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      // Update user data in context
      if (updateUserData && result) {
        await updateUserData({
          ...user,
          avatar_url: result.avatar_url,
        });
        console.log("✅ User avatar updated in context");
      }

      Alert.alert("Success", "Profile picture updated successfully!");
    } catch (error) {
      console.error("💥 Upload Error:", error);
      Alert.alert(
        "Upload Failed",
        error.message || "Failed to upload image. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handlePersonalInfo = () => {
    // Navigate to personal info screen or show info
    Alert.alert(
      "Personal Information",
      "This section will open personal information settings."
    );
  };

  const handleSecurity = () => {
    // Navigate to security screen or show info
    Alert.alert("Security", "This section will open security settings.");
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: performLogout,
      },
    ]);
  };

  const performLogout = async () => {
    try {
      const payload = {
        refresh_token: token,
        logout_all_devices: false,
      };

      const result = await postData(payload);

      if (result.success) {
        await logout();
        router.replace("/auth/login");
      } else {
        await logout();
        router.replace("/auth/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      await logout();
      router.replace("/auth/login");
    }
  };

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Profile Section - ONLY this section is clickable for upload */}
        <View className="items-center mt-6">
          <View className="relative">
            {/* Profile Image - Clickable for upload */}
            <TouchableOpacity
              onPress={handleProfilePictureUpload}
              disabled={uploading}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri:
                    user?.avatar_url ||
                    "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                className="w-20 h-20 border-[1px] border-[#C8CCD9] rounded-full"
              />
            </TouchableOpacity>

            {/* Camera Icon Overlay - Also clickable */}
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-blue-500 w-8 h-8 rounded-full items-center justify-center border-2 border-white"
              onPress={handleProfilePictureUpload}
              disabled={uploading}
              activeOpacity={0.7}
            >
              {uploading ? (
                <Feather name="loader" size={14} color="#fff" />
              ) : (
                <Feather name="camera" size={14} color="#fff" />
              )}
            </TouchableOpacity>
          </View>

          <Text16Bold className="mt-2">
            {user?.first_name} {user?.last_name}
          </Text16Bold>
          <Text14 className="">{user?.email}</Text14>
        </View>

        {/* Stats */}
        <View className="flex-row justify-center gap-4 mt-4 space-x-8">
          <View className="items-center">
            <Text16Bold>24</Text16Bold>
            <Text12 className="">Projects</Text12>
          </View>
          <View className="items-center">
            <Text16Bold className="font-bold">136</Text16Bold>
            <Text12>Materials</Text12>
          </View>
          <View className="items-center">
            <Text16Bold className="text-lg font-bold">4.8</Text16Bold>
            <Text12>Rating</Text12>
          </View>
        </View>

        {/* Account Settings */}
        <View className="mt-6  bg-white p-4 rounded-xl">
          <Text16Bold className="mb-2">Account Settings</Text16Bold>

          {/* Personal Information - Different handler, NO upload */}
          <TouchableOpacity
            className="flex-row items-center justify-between py-4 border-b-[1px] border-[#EBEDF0]"
            onPress={handlePersonalInfo}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View className="p-2 bg-[#DFF8E9] rounded-lg">
                <PersonIcon />
              </View>
              <View className="ml-3">
                <Text className=" text-[#000000] font-semibold text-sm">
                  Personal Information
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  Update your name, email, and photo
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={14} color="#767C8C" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-between py-4 border-b-[1px] border-[#EBEDF0]"
            onPress={handleSecurity}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View className="p-2 bg-[#FFF9E6] rounded-lg">
                <Shield />
              </View>
              <View className="ml-3">
                <Text className=" text-[#000000] font-semibold text-sm">
                  Security
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  Change password and 2FA settings
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={14} color="#767C8C" />
          </TouchableOpacity>

          {/* Notifications Toggle - No upload functionality */}
          <View className="flex-row items-center justify-between py-4 border-b-[1px] border-[#EBEDF0]">
            <View className="flex-row items-center">
              <View className="p-2 bg-[#E6F6FF] rounded-lg">
                <Notification />
              </View>
              <View className="ml-3">
                <Text className=" text-[#000000] font-semibold text-sm">
                  Notifications
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  Manage your notifications
                </Text>
              </View>
            </View>
            <ToggleButton value={notifications} onToggle={setNotifications} />
          </View>

          {/* Appearance Toggle - No upload functionality */}
          <View className="flex-row items-center justify-between bg-white pt-4 rounded-xl">
            <View className="flex-row items-center">
              <View className="p-2 bg-[#FEE9EA] rounded-lg">
                <Appreance />
              </View>
              <View className="ml-3">
                <Text className=" text-[#000000] font-semibold text-sm">
                  Appearance
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  Dark mode and theme settings
                </Text>
              </View>
            </View>
            <ToggleButton value={appearance} onToggle={setAppearance} />
          </View>
        </View>

        {/* Free Plan - Not clickable for upload */}
        <View className="bg-white mt-6 p-4 rounded-xl">
          <Text16Bold className=" mb-2">Free Plan</Text16Bold>
          <Text14>
            Upgrade to unlock all features and export unlimited designs
          </Text14>

          <View className="mt-3 space-y-3">
            <View className="flex-row items-center mb-2">
              <View className="w-5 h-5 rounded-full bg-[#0461A6] flex items-center justify-center">
                <Feather name="check" size={12} color="#fff" />
              </View>
              <Text className="text-[#000000] text-sm  font-normal ml-2">
                5 projects limit
              </Text>
            </View>
            <View className="flex-row items-center mb-2 ">
              <View className="w-5 h-5 rounded-full bg-[#0461A6] flex items-center justify-center">
                <Feather name="check" size={12} color="#fff" />
              </View>
              <Text className="text-[#000000] text-sm  font-normal ml-2">
                Basic materials
              </Text>
            </View>
            <View className="flex-row items-center mb-2">
              <View className="w-5 h-5 rounded-full bg-[#0461A6] flex items-center justify-center">
                <Feather name="check" size={12} color="#fff" />
              </View>
              <Text className="text-[#000000] text-sm  font-normal ml-2">
                No PDF export
              </Text>
            </View>
          </View>

          <Button variant="primary" className="mt-4">
            Upgrade to pro
          </Button>
        </View>

        <Button
          variant="secondary"
          className="mt-6"
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Log out"}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
