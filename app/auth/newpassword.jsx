import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputFeild";
import { Text14, Text20 } from "../../components/ui/Typography";
import usePost from "../../hooks/usePost";

const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, otp_code } = route.params || {};

  // API hook for password reset confirmation
  const { postData: resetPassword, loading: resetLoading } = usePost(
    "/api/v1/auth/password/reset/confirm"
  );

  const newPasswordValidationSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleResetPassword = async (values) => {
    if (!email || !otp_code) {
      Alert.alert("Error", "Missing email or OTP code");
      return;
    }

    const payload = {
      email: email,
      otp_code: otp_code,
      password: values.password,
      password_confirm: values.confirmPassword,
      logout_all_devices: false,
    };

    try {
      const result = await resetPassword(payload);

      if (result.success) {
        Alert.alert("Success", "Password reset successfully!");
        navigation.navigate("login");
      } else {
        Alert.alert("Error", result.error || "Failed to reset password");
      }
    } catch (err) {
      console.error("Password reset failed:", err);
      Alert.alert("Error", "Failed to reset password. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className=" pt-8 pb-6">
            <View className="mb-6">
              <Feather
                name="arrow-left"
                size={24}
                color="#000000"
                onPress={() => navigation.goBack()}
              />
            </View>

            {/* Title and Description */}
            <View className="mb-8">
              <Text20 className="text-[24px] mb-2 font-bold">
                New Password
              </Text20>
              <Text14 className="text-[#767C8C] leading-6">
                Enter your email to reset your new password
              </Text14>
            </View>
          </View>

          {/* Form Section */}
          <View className="flex-1">
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={newPasswordValidationSchema}
              onSubmit={handleResetPassword}
            >
              {({ handleSubmit, isSubmitting }) => (
                <View className="flex-1">
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    leftIcon={Feather}
                    leftIconName="lock"
                    required={true}
                    className="mb-6"
                  />
                  <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Enter your password"
                    leftIcon={Feather}
                    leftIconName="lock"
                    required={true}
                    className="mb-8"
                  />
                  <Button
                    variant="primary"
                    className="w-full"
                    onPress={handleSubmit}
                    disabled={isSubmitting || resetLoading}
                  >
                    {resetLoading ? "Resetting..." : "Reset Password"}
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;
