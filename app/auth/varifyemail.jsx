import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import { Text14, Text20 } from "../../components/ui/Typography";
import usePost from "../../hooks/usePost";

const VerifyEmailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const inputs = useRef([]);

  const { postData: verifyOtp, loading: verifyLoading } = usePost(
    "api/v1/auth/verify-otp"
  );

  // Start countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto move to next field
    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit code");
      return;
    }

    if (!email) {
      Alert.alert("Error", "Email not found");
      return;
    }

    const payload = {
      email: email,
      otp_code: otpCode,
    };

    try {
      const result = await verifyOtp(payload);

      if (result.success) {
        console.log("OTP verification successful:", result.data);
        Alert.alert("Success", "Email verified successfully!");

        // Navigate to login page after successful verification
        navigation.navigate("auth/login");
      } else {
        Alert.alert("Error", result.error || "Invalid OTP code");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      Alert.alert("Error", "Verification failed. Please try again.");
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(60); // restart timer
    inputs.current[0]?.focus();
    console.log("Resend code triggered");

    // Here you can add API call to resend OTP
    // await resendOtp({ email: email });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9F9FB]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="pt-10 pb-6 px-4">
            <View className="mb-6">
              <Feather
                name="arrow-left"
                size={24}
                color="#000000"
                onPress={() => navigation.goBack()}
              />
            </View>

            {/* Title & Info */}
            <View className="mb-8">
              <Text20 className="text-[20px] mb-2 font-bold">
                Enter Your Code
              </Text20>
              <Text14 className="text-[#767C8C] leading-6">
                Enter the Code that we have sent to{" "}
              </Text14>
              <Text className="font-semibold text-base text-[#000]">
                {email || "sheraz@gmail.com"}
              </Text>
            </View>

            {/* OTP Boxes */}
            <View className="flex-row justify-between mb-6">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  className="w-12 h-12 rounded-lg text-center text-lg bg-white border border-gray-300"
                  maxLength={1}
                  keyboardType="number-pad"
                  placeholder="0"
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

            {/* Timer & Resend */}
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-[#000] text-base font-medium">
                {formatTime()}
              </Text>
              {timeLeft === 0 ? (
                <Text
                  className="text-[#0461A6] text-base font-semibold"
                  onPress={handleResend}
                >
                  Resend code
                </Text>
              ) : (
                <Text className="text-[#767C8C] text-base">Resend code</Text>
              )}
            </View>

            {/* Verify Button */}
            <Button
              variant="primary"
              className="w-full"
              onPress={handleVerify}
              disabled={verifyLoading}
            >
              {verifyLoading ? "Verifying..." : "Verify Code"}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyEmailScreen;
