import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";

// Your components
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputFeild";
import { Text14, Text16Bold, Text20 } from "../../../components/ui/Typography";

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
          <View className="items-center pt-10 pb-6">
            <Text20 className="text-[28px] mb-2">unitec</Text20>
            <Text16Bold className="text-[18px] text-center mb-1">
              Visualize Smarter Living
            </Text16Bold>
          </View>

          {/* Sign Up Form */}
          <View className="flex-1 px-6">
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
                    className="mb-4"
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
                    className="mb-4"
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
                    className="mb-4"
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
                    className="mb-4"
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
                    className="mb-6"
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
                  <View className="flex-row justify-center space-x-4 mb-8">
                    <TouchableOpacity className="w-12 h-12 border border-[#E5E5E5] rounded-[10px] items-center justify-center">
                      <Feather name="facebook" size={24} color="#0461A6" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-12 h-12 border border-[#E5E5E5] rounded-[10px] items-center justify-center">
                      <Feather name="github" size={24} color="#0461A6" />
                    </TouchableOpacity>
                  </View>

                  {/* Login Link */}
                  <View className="flex-row justify-center items-center mb-8">
                    <Text14>Already have an account? </Text14>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text14 className="text-[#0461A6] font-semibold">
                        Log in
                      </Text14>
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
