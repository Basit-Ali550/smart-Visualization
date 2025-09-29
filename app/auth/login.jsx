import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import Logo from "../../assets/Icon/Logo.svg";
// Your components
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputFeild";
import { Text14, Text16, Text20 } from "../../components/ui/Typography";

// Import PNG images
const FaceBook = require("../../assets/images/Facebook.png");
const Google = require("../../assets/images/Google.png");
const LoginScreen = () => {
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = (values) => {
    console.log("Login values:", values);
    // Handle login logic here
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="pt-4">
            <View className="flex-row justify-center mb-6">
              <Logo />
            </View>
            <Text20>Visualize Smarter Living</Text20>
            <Text16 className="mt-1">
              Transform your spaces with confidence
            </Text16>
          </View>

          {/* Login Form */}
          <View className="flex-1  pt-8">
            <Formik
              initialValues={{ email: "", password: "", rememberMe: false }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
            >
              {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
                <View className="flex-1">
                  {/* Email Input */}
                  <InputField
                    label="Email/Phone number"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    leftIcon={Feather}
                    leftIconName="mail"
                    required={true}
                    className="mb-6"
                  />

                  {/* Password Input */}
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    leftIcon={Feather}
                    leftIconName="lock"
                    required={true}
                    className="mb-4"
                  />

                  {/* Remember Me & Forgot Password */}
                  <View className="flex-row justify-between items-center mb-8 mt-2">
                    <TouchableOpacity
                      className="flex-row items-center"
                      onPress={() =>
                        setFieldValue("rememberMe", !values.rememberMe)
                      }
                    >
                      <View
                        className={`w-5 h-5 border-2 rounded-sm mr-2 ${
                          values.rememberMe
                            ? "bg-[#0461A6] border-[#0461A6]"
                            : "border-[#767C8C]"
                        }`}
                      >
                        {values.rememberMe && (
                          <Feather name="check" size={14} color="white" />
                        )}
                      </View>
                      <Text14>Remember me</Text14>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Text className="text-[#0461A6] text-sm font-normal">
                        Forgot password?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Login Button */}
                  <Button
                    variant="primary"
                    className="w-full mb-6"
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    Log in
                  </Button>

                  {/* Divider */}
                  <View className="flex-row items-center mb-6">
                    <View className="flex-1 h-px bg-[#E5E5E5]" />
                    <Text14 className="mx-4 text-[#A8AEBF]">or</Text14>
                    <View className="flex-1 h-px bg-[#E5E5E5]" />
                  </View>

                  {/* Social Login Buttons */}
                  <View className="flex-row  gap-4 justify-center space-x-4 mb-8">
                    <TouchableOpacity className="w-16 h-16 bg-white   rounded-full  items-center justify-center">
                      <Image
                        source={FaceBook}
                        style={{ width: 24, height: 24 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-16 h-16 bg-white   rounded-full  items-center justify-center">
                      <Image
                        source={Google}
                        style={{ width: 24, height: 24 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Sign Up Link */}
                  <View className="flex-row justify-center items-center">
                    <Text className="text-[#000000] font-normal text-xs">
                      Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity>
                      <Text className="text-[#0461A6] text-sm font-semibold">
                        Sign up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
