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

// Your components
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/Icon/Logo.svg";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputFeild";
import { Text14, Text16, Text20 } from "../../components/ui/Typography";
const FaceBook = require("../../assets/images/Facebook.png");
const Google = require("../../assets/images/Google.png");
const SignUpScreen = ({ navigation }) => {
  const signUpValidationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must contain only numbers")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignUp = (values) => {
    console.log("Sign up values:", values);
    // Handle sign up logic here
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
          <View className="py-4">
            <View className="flex-row justify-center mb-6">
              <Logo />
            </View>
            <Text20>Visualize Smarter Living</Text20>
            <Text16 className="mt-1">
              Transform your spaces with confidence
            </Text16>
          </View>

          {/* Sign Up Form */}
          <View className="flex-1 ">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
              }}
              validationSchema={signUpValidationSchema}
              onSubmit={handleSignUp}
            >
              {({ handleSubmit, isSubmitting }) => (
                <View className="flex-1">
                  {/* First Name Input */}
                  <InputField
                    label="Enter First Name"
                    name="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    leftIcon={Feather}
                    leftIconName="user"
                    required={true}
                    className="mb-5"
                  />

                  {/* Last Name Input */}
                  <InputField
                    label="Enter Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    leftIcon={Feather}
                    leftIconName="user"
                    required={true}
                    className="mb-5"
                  />

                  {/* Phone Number Input */}
                  <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    type="number"
                    placeholder="Enter Phone Number"
                    leftIcon={Feather}
                    leftIconName="phone"
                    required={true}
                    className="mb-5"
                  />

                  {/* Email Input */}
                  <InputField
                    label="Enter Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    leftIcon={Feather}
                    leftIconName="mail"
                    required={true}
                    className="mb-5"
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
                    className="mb-10"
                  />

                  {/* Sign Up Button */}
                  <Button
                    variant="primary"
                    className="w-full mb-6"
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>

                  {/* Divider */}
                  <View className="flex-row items-center mb-6">
                    <View className="flex-1 h-px bg-[#E5E5E5]" />
                    <Text14 className="mx-4">or</Text14>
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

                  {/* Login Link */}
                  <View className="flex-row justify-center items-center">
                    <Text className="text-[#000000] font-normal text-xs">
                      Already have an account?
                    </Text>
                    <TouchableOpacity>
                      <Text className="text-[#0461A6] text-sm font-semibold">
                        Log in
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

export default SignUpScreen;
