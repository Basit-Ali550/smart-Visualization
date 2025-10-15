import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import Logo from "../../assets/Icon/Logo.svg";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputFeild";
import { Text14, Text16, Text20 } from "../../components/ui/Typography";
import usePost from "../../hooks/usePost";

const FaceBook = require("../../assets/images/Facebook.png");
const Google = require("../../assets/images/Google.png");

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { postData, loading, error } = usePost("api/v1/auth/register");

  const signUpValidationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSignUp = async (values) => {
    const payload = {
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      password: values.password,
      password_confirm: values.passwordConfirm,
    };

    try {
      const result = await postData(payload);
      if (result.success) {
        navigation.navigate("varifyemail", {
          email: values.email,
        });
      } else {
        console.error("Sign up error:", result.error);
      }
    } catch (err) {
      console.error("Sign up failed:", err);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustContentInsets={true}
            contentInsetAdjustmentBehavior="automatic"
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
            <View className="flex-1 pt-4">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  passwordConfirm: "",
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
                    <InputField
                      label="Confirm Password"
                      name="passwordConfirm"
                      type="password"
                      placeholder="Confirm your password"
                      leftIcon={Feather}
                      leftIconName="lock"
                      required={true}
                      className="mb-6"
                    />
                    <Button
                      variant="primary"
                      className="w-full mb-6"
                      onPress={handleSubmit}
                      disabled={isSubmitting || loading}
                    >
                      {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                    <View className="flex-row items-center mb-6">
                      <View className="flex-1 h-px bg-[#E5E5E5]" />
                      <Text14 className="mx-4">or</Text14>
                      <View className="flex-1 h-px bg-[#E5E5E5]" />
                    </View>
                    <View className="flex-row gap-4 justify-center space-x-4 mb-8">
                      <TouchableOpacity className="w-16 h-16 bg-white rounded-full items-center justify-center border border-gray-200">
                        <Image
                          source={FaceBook}
                          style={{ width: 24, height: 24 }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity className="w-16 h-16 bg-white rounded-full items-center justify-center border border-gray-200">
                        <Image
                          source={Google}
                          style={{ width: 24, height: 24 }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Login Link */}
                    <View className="flex-row justify-center items-center mb-6">
                      <Text className="text-[#000000] font-normal text-xs">
                        Already have an account?
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("login")}
                      >
                        <Text className="text-[#0461A6] text-sm font-semibold ml-1">
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
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
