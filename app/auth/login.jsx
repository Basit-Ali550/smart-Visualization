// app/auth/login.jsx
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import Logo from "../../assets/Icon/Logo.svg";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputFeild";
import { Text14, Text16, Text20 } from "../../components/ui/Typography";
import { useAuth } from "../../context/AuthContext";
import usePost from "../../hooks/usePost";

const FaceBook = require("../../assets/images/Facebook.png");
const Google = require("../../assets/images/Google.png");

const LoginScreen = () => {
  const router = useRouter();
  const { postData, loading: apiLoading, error } = usePost("api/v1/auth/login");
  const { login } = useAuth();

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
  // app/auth/login.jsx - Update the handleLogin function
  const handleLogin = async (values) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
      };

      const result = await postData(payload);

      if (result.success) {
        const loginSuccess = await login(
          result.data.tokens.access_token,
          result.data.user,
          result.data.tokens.refresh_token   // یہ لائن ایڈ کرو
        );

        if (loginSuccess) {
          // Check if user needs face verification based on avatar_url
          const needsFaceVerification = !result.data.user.avatar_url;

          console.log("Avatar URL:", result.data.user.avatar_url);
          console.log("Needs face verification:", needsFaceVerification);

          if (needsFaceVerification) {
            // Navigate to face verification with user data
            router.replace({
              pathname: "auth/face-verification",
              params: {
                firstName: result.data.user.first_name,
                lastName: result.data.user.last_name,
                email: result.data.user.email,
                userId: result.data.user.id,
              },
            });
          } else {
            // Navigate directly to home for users with avatar
            router.replace("/pages/home");
          }
        } else {
          Alert.alert("Error", "Failed to save login data");
        }
      } else {
        Alert.alert("Login Failed", result.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
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
          <View className="pt-4">
            <View className="flex-row justify-center mb-6">
              <Logo />
            </View>
            <Text20>Visualize Smarter Living</Text20>
            <Text16 className="mt-1">
              Transform your spaces with confidence
            </Text16>
          </View>

          <View className="flex-1 pt-8">
            <Formik
              initialValues={{ email: "", password: "", rememberMe: false }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
            >
              {({ handleSubmit, values, setFieldValue }) => (
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

                    <TouchableOpacity
                      onPress={() => router.push("/auth/forgotpassword")}
                    >
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
                    disabled={apiLoading}
                  >
                    {apiLoading ? "Logging in..." : "Log in"}
                  </Button>

                  {/* Error Message */}
                  {error && (
                    <Text className="text-red-500 text-center mb-4">
                      {error}
                    </Text>
                  )}

                  {/* Sign Up Link */}
                  <View className="flex-row justify-center items-center">
                    <Text className="text-[#000000] font-normal text-xs">
                      Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("/auth/signup")}
                    >
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
