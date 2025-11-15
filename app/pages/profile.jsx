import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import Appreance from "../../assets/Icon/Appreance.svg";
import Notification from "../../assets/Icon/Notification.svg";
import PersonIcon from "../../assets/Icon/PersonIcon.svg";
import Shield from "../../assets/Icon/Shield.svg";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputFeild";
import ToggleButton from "../../components/ui/ToggleButton";
import { Text12, Text14, Text16Bold } from "../../components/ui/Typography";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../hooks/apiClient";
import usePost from "../../hooks/usePost";

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [appearance, setAppearance] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);

  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);

  const { user, logout, token, updateUserData } = useAuth();
  const { postData, loading } = usePost("api/v1/auth/logout");
  const router = useRouter();

  // === PERSONAL INFO MODAL ===
  const handlePersonalInfo = () => {
    setFirstName(user?.first_name || "");
    setLastName(user?.last_name || "");
    setModalVisible(true);
    setTimeout(() => firstNameInputRef.current?.focus(), 300);
  };

  const handleSaveNames = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert("Error", "Both fields are required.");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("first_name", firstName.trim());
      formData.append("last_name", lastName.trim());

      const response = await apiClient.patch("/api/v1/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        await updateUserData({
          ...user,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
        });

        Alert.alert("Success", "Name updated successfully!");
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Name update error:", error);
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to update name. Please try again.";
      Alert.alert("Error", msg);
    } finally {
      setSaving(false);
    }
  };

  // === PROFILE PICTURE UPLOAD ===
  const handleProfilePictureUpload = async () => {
    try {
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

      Alert.alert("Update Profile Picture", "Choose an option", [
        { text: "Take Photo", onPress: takePhoto },
        { text: "Choose from Gallery", onPress: pickImage },
        { text: "Cancel", style: "cancel" },
      ]);
    } catch (error) {
      console.error("Error requesting permissions:", error);
      Alert.alert("Error", "Failed to access camera or gallery.");
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo.");
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image.");
    }
  };

  const uploadImage = async (imageUri) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("avatar", {
        uri: imageUri,
        type: "image/jpeg",
        name: `avatar_${user?.id || "user"}_${Date.now()}.jpg`,
      });

      if (user?.first_name) formData.append("first_name", user.first_name);
      if (user?.last_name) formData.append("last_name", user.last_name);

      const response = await apiClient.patch("/api/v1/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.avatar_url) {
        await updateUserData({
          ...user,
          avatar_url: response.data.avatar_url,
        });
        Alert.alert("Success", "Profile picture updated!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert(
        "Upload Failed",
        error.response?.data?.message || "Could not upload image."
      );
    } finally {
      setUploading(false);
    }
  };

  // === SECURITY MODAL - CHANGE PASSWORD ===
  const handleSecurity = () => {
    setPasswordModalVisible(true);
  };

  const changePasswordSchema = Yup.object().shape({
    current_password: Yup.string()
      .min(6, "Current password must be at least 6 characters")
      .required("Current password is required"),
    new_password: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .required("New password is required"),
    new_password_confirm: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Confirm new password is required"),
  });

  const handleChangePassword = async (values, { setSubmitting, setFieldError }) => {
    try {
      await apiClient.post("/api/v1/auth/change-password", {
        current_password: values.current_password,
        new_password: values.new_password,
        new_password_confirm: values.new_password_confirm,
      });

      Alert.alert("Success", "Password changed successfully!");
      setPasswordModalVisible(false);
    } catch (error) {
      console.error("Change password error:", error);
      const msg = error.response?.data?.message || "Failed to change password.";
      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          setFieldError(key, error.response.data.errors[key][0]);
        });
      } else {
        Alert.alert("Error", msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // === LOGOUT ===
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
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
      await postData(payload);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      await logout();
      router.replace("/auth/login");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Profile Section */}
        <View className="items-center mt-6">
          <View className="relative">
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

            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-blue-500 w-8 h-8 rounded-full items-center justify-center border-2 border-white"
              onPress={handleProfilePictureUpload}
              disabled={uploading}
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
          <Text14>{user?.email}</Text14>
        </View>

        {/* Stats */}
        <View className="flex-row justify-center gap-4 mt-4 space-x-8">
          <View className="items-center">
            <Text16Bold>24</Text16Bold>
            <Text12>Projects</Text12>
          </View>
          <View className="items-center">
            <Text16Bold>136</Text16Bold>
            <Text12>Materials</Text12>
          </View>
          <View className="items-center">
            <Text16Bold>4.8</Text16Bold>
            <Text12>Rating</Text12>
          </View>
        </View>

        {/* Account Settings */}
        <View className="mt-6 bg-white p-4 rounded-xl ">
          <Text16Bold className="mb-2">Account Settings</Text16Bold>

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
                <Text className="text-[#000000] font-semibold text-sm">
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
                <Text className="text-[#000000] font-semibold text-sm">
                  Security
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  Change password and 2FA settings
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={14} color="#767C8C" />
          </TouchableOpacity>

          <View className="flex-row items-center justify-between py-4 border-b-[1px] border-[#EBEDF0]">
            <View className="flex-row items-center">
              <View className="p-2 bg-[#E6F6FF] rounded-lg">
                <Notification />
              </View>
              <View className="ml-3">
                <Text className="text-[#000000] font-semibold text-sm">
                  Notifications
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  Manage your notifications
                </Text>
              </View>
            </View>
            <ToggleButton value={notifications} onToggle={setNotifications} />
          </View>

          <View className="flex-row items-center justify-between pt-4">
            <View className="flex-row items-center">
              <View className="p-2 bg-[#FEE9EA] rounded-lg">
                <Appreance />
              </View>
              <View className="ml-3">
                <Text className="text-[#000000] font-semibold text-sm">
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

        <View className="bg-white mt-6 p-4 rounded-xl">
          <Text16Bold className="mb-2">Free Plan</Text16Bold>
          <Text14>
            Upgrade to unlock all features and export unlimited designs
          </Text14>

          <View className="mt-3 space-y-3">
            {["5 projects limit", "Basic materials", "No PDF export"].map(
              (item, i) => (
                <View key={i} className="flex-row items-center">
                  <View className="w-5 h-5 rounded-full bg-[#0461A6] flex items-center justify-center">
                    <Feather name="check" size={12} color="#fff" />
                  </View>
                  <Text className="text-[#000000] text-sm font-normal ml-2">
                    {item}
                  </Text>
                </View>
              )
            )}
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

      {/* === PERSONAL INFO MODAL === */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center"
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View className="flex-1 bg-black/60 justify-center items-center px-6">
              <TouchableWithoutFeedback onPress={() => {}}>
                <View className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
                  <View className="px-6 pt-8 pb-6 border-b border-gray-100">
                    <Text className="text-xl font-bold text-center text-gray-900">
                      Edit Personal Information
                    </Text>
                  </View>

                  <View className="px-6 py-6 space-y-5">
                    <View>
                      <Text className="text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </Text>
                      <TextInput
                        ref={firstNameInputRef}
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="Enter first name"
                        className="border border-gray-300 rounded-xl px-4 py-4 text-base bg-gray-50"
                        autoCapitalize="words"
                        returnKeyType="next"
                        onSubmitEditing={() => lastNameInputRef.current?.focus()}
                      />
                    </View>

                    <View>
                      <Text className="text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </Text>
                      <TextInput
                        ref={lastNameInputRef}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Enter last name"
                        className="border border-gray-300 rounded-xl px-4 py-4 text-base bg-gray-50"
                        autoCapitalize="words"
                        returnKeyType="done"
                        onSubmitEditing={handleSaveNames}
                      />
                    </View>
                  </View>

                  <View className="px-6 pb-8 pt-4 bg-gray-50/50">
                    <View className="flex-row gap-3">
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        disabled={saving}
                        className="flex-1 bg-gray-200 py-4 rounded-xl justify-center items-center active:opacity-70"
                      >
                        <Text className="text-gray-800 font-semibold text-base">
                          Cancel
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handleSaveNames}
                        disabled={saving}
                        className="flex-1 bg-blue-600 py-4 rounded-xl justify-center items-center active:opacity-80"
                      >
                        {saving ? (
                          <View className="flex-row items-center">
                            <Feather name="loader" size={18} color="white" className="animate-spin mr-2" />
                            <Text className="text-white font-semibold text-base">
                              Saving...
                            </Text>
                          </View>
                        ) : (
                          <Text className="text-white font-semibold text-base">
                            Save Changes
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      {/* === CHANGE PASSWORD MODAL === */}
      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center"
        >
          <TouchableWithoutFeedback onPress={() => setPasswordModalVisible(false)}>
            <View className="flex-1 bg-black/60 justify-center items-center px-6">
              <TouchableWithoutFeedback onPress={() => {}}>
                <View className="bg-gray-100 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
                  <View className="px-6 pt-8 pb-6 border-b border-gray-100">
                    <Text className="text-xl font-bold text-center text-gray-900">
                      Change Password
                    </Text>
                  </View>

                  <Formik
                    initialValues={{
                      current_password: "",
                      new_password: "",
                      new_password_confirm: "",
                    }}
                    validationSchema={changePasswordSchema}
                    onSubmit={handleChangePassword}
                  >
                    {({
                      handleSubmit,
                      isSubmitting,
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                    }) => (
                      <>
                        <View className="px-4 py-6 space-y-5">
                          <InputField
                            label="Current Password"
                            name="current_password"
                            type="password"
                            placeholder="Enter current password"
                            required
                          />
                          <InputField
                          className="py-6"

                            label="New Password"
                            name="new_password"
                            type="password"
                            placeholder="Enter new password"
                            required
                          />
                          <InputField
                            label="Confirm New Password"
                            name="new_password_confirm"
                            type="password"
                            placeholder="Confirm new password"
                            required
                          />
                        </View>

                        <View className="px-6 pb-8 pt-4 bg-gray-50/50">
                          <View className="flex-row gap-3">
                            <TouchableOpacity
                              onPress={() => setPasswordModalVisible(false)}
                              disabled={isSubmitting}
                              className="flex-1 bg-gray-200 py-4 rounded-xl justify-center items-center active:opacity-70"
                            >
                              <Text className="text-gray-800 font-semibold text-base">
                                Cancel
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={handleSubmit}
                              disabled={isSubmitting}
                              className="flex-1 bg-blue-600 py-4 rounded-xl justify-center items-center active:opacity-80"
                            >
                              {isSubmitting ? (
                                <View className="flex-row items-center">
                                  <Feather name="loader" size={18} color="white" className="animate-spin mr-2" />
                                  <Text className="text-white font-semibold text-base">
                                    Saving...
                                  </Text>
                                </View>
                              ) : (
                                <Text className="text-white font-semibold text-base">
                                  Change Password
                                </Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        </View>
                      </>
                    )}
                  </Formik>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;