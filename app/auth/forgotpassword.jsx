import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import * as yup from "yup";

// Your components
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputFeild";
import { Text14, Text20 } from "../../components/ui/Typography";
import usePost from "../../hooks/usePost"; // Import your usePost hook

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { postData, loading, error } = usePost("/api/v1/auth/password/reset");

  const forgotPasswordValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const handleContinue = async (values) => {
    const payload = {
      email: values.email,
    };

    try {
      const result = await postData(payload);

      if (result.success) {
        console.log("Password reset email sent:", result.data);

        // Navigate to OTP screen with email parameter
        navigation.navigate("otpscreen", {
          email: values.email,
          fromForgotPassword: true,
        });

        // Optional: Show success message
        Alert.alert(
          "Success",
          "Password reset instructions have been sent to your email."
        );
      } else {
        console.error("Password reset error:", result.error);
        Alert.alert("Error", result.error || "Failed to send reset email");
      }
    } catch (err) {
      console.error("Password reset failed:", err);
      Alert.alert("Error", "Failed to send reset email. Please try again.");
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
          {/* Header Section */}
          <View className=" pt-10 pb-6">
            {/* Back Button */}
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
              <Text20 className="text-[20px] mb-2 font-bold">
                Forgot Password
              </Text20>
              <Text14 className="text-[#767C8C] leading-6">
                Enter your email to reset your new password
              </Text14>
            </View>
          </View>

          {/* Form Section */}
          <View className="flex--1">
            <Formik
              initialValues={{ email: "" }}
              validationSchema={forgotPasswordValidationSchema}
              onSubmit={handleContinue}
            >
              {({ handleSubmit, isSubmitting }) => (
                <View className="flex-1">
                  {/* Email Input */}
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    leftIcon={Feather}
                    leftIconName="mail"
                    required={true}
                    className="mb-10"
                  />
                  {/* Continue Button */}
                  <Button
                    variant="primary"
                    className="w-full"
                    onPress={handleSubmit}
                    disabled={isSubmitting || loading}
                  >
                    {loading ? "Sending..." : "Continue"}
                  </Button>

                  {/* Additional Help Text */}
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
