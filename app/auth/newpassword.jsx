import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import * as yup from "yup";

// Your components
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputFeild";
import { Text14, Text20 } from "../../components/ui/Typography";

const NewPasswordScreen = () => {
  const navigation = useNavigation();

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
    navigation.navigate("auth/login");
    // Handle password reset logic here
    // Typically you would update the password via API
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
          <View className=" pt-8 pb-6">
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
          <View className="flex-1">
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
