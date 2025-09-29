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

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const forgotPasswordValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const handleContinue = (values) => {
    navigation.navigate("auth/otpscreen");
    // Handle forgot password logic here
    // Typically you would send a reset password email
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
                    disabled={isSubmitting}
                  >
                    Continue
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
