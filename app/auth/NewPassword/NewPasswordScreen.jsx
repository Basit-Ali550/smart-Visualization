import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import * as yup from "yup";

// Your components
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputFeild";
import { Text14, Text20 } from "../../../components/ui/Typography";

const NewPasswordScreen = ({ navigation }) => {
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

  const handleResetPassword = (values) => {
    console.log("New password values:", values);
    // Handle password reset logic here
    // Typically you would update the password via API
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="px-6 pt-10 pb-6">
            <View className="items-center mb-8">
              <Text20 className="text-[28px] mb-2">unitec</Text20>
            </View>

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
              <Text20 className="text-[24px] mb-2 font-bold">
                New Password
              </Text20>
              <Text14 className="text-[#767C8C] leading-6">
                Enter your email to reset your new password
              </Text14>
            </View>
          </View>

          {/* Form Section */}
          <View className="flex-1 px-6">
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={newPasswordValidationSchema}
              onSubmit={handleResetPassword}
            >
              {({ handleSubmit, isSubmitting }) => (
                <View className="flex-1">
                  {/* Password Input */}
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

                  {/* Confirm Password Input */}
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

                  {/* Password Requirements */}
                  <View className="mb-6 p-4 bg-blue-50 rounded-[10px]">
                    <Text14 className="text-[#0461A6] font-semibold mb-2">
                      Password must contain:
                    </Text14>
                    <Text14 className="text-[#767C8C] mb-1">
                      • At least 8 characters
                    </Text14>
                    <Text14 className="text-[#767C8C] mb-1">
                      • One uppercase letter
                    </Text14>
                    <Text14 className="text-[#767C8C] mb-1">
                      • One lowercase letter
                    </Text14>
                    <Text14 className="text-[#767C8C]">• One number</Text14>
                  </View>

                  {/* Reset Password Button */}
                  <Button
                    variant="primary"
                    className="w-full"
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    Reset Password
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
