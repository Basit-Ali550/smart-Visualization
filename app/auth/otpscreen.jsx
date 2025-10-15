// import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useEffect, useRef, useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Button from "../../components/ui/Button";
// import { Text14, Text20 } from "../../components/ui/Typography";

// const OtpVerificationScreen = () => {
//   const navigation = useNavigation();
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
//   const inputs = useRef([]);

//   // Start countdown timer
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const formatTime = () => {
//     const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
//     const seconds = String(timeLeft % 60).padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   const handleChange = (text, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     // Auto move to next field
//     if (text && index < otp.length - 1) {
//       inputs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = ({ nativeEvent }, index) => {
//     if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   const handleVerify = () => {
//     navigation.navigate("auth/newpassword");
//     // Add verify logic
//   };

//   const handleResend = () => {
//     setOtp(["", "", "", "", "", ""]);
//     setTimeLeft(60); // restart timer
//     inputs.current[0]?.focus();
//     console.log("Resend code triggered");
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-[#F9F9FB]">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1"
//       >
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Header */}
//           <View className="pt-10 pb-6">
//             <View className="mb-6">
//               <Feather
//                 name="arrow-left"
//                 size={24}
//                 color="#000000"
//                 onPress={() => navigation.goBack()}
//               />
//             </View>

//             {/* Title & Info */}
//             <View className="mb-8">
//               <Text20 className="text-[20px] mb-2 font-bold">
//                 Enter Your Code
//               </Text20>
//               <Text14 className="text-[#767C8C] leading-6">
//                 Enter the Code that we have sent to{" "}
//               </Text14>
//               <Text className="font-semibold text-base text-[#000]">
//                 sheraz@gmail.com
//               </Text>
//             </View>

//             {/* OTP Boxes */}
//             <View className="flex-row justify-between mb-6">
//               {otp.map((digit, index) => (
//                 <TextInput
//                   key={index}
//                   ref={(el) => (inputs.current[index] = el)}
//                   className="w-12 h-12 rounded-lg text-center text-lg bg-white border border-gray-300"
//                   maxLength={1}
//                   keyboardType="number-pad"
//                   placeholder="0"
//                   value={digit}
//                   onChangeText={(text) => handleChange(text, index)}
//                   onKeyPress={(e) => handleKeyPress(e, index)}
//                 />
//               ))}
//             </View>

//             {/* Timer & Resend */}
//             <View className="flex-row justify-between items-center mb-8">
//               <Text className="text-[#000] text-base font-medium">
//                 {formatTime()}
//               </Text>
//               {timeLeft === 0 ? (
//                 <Text
//                   className="text-[#0461A6] text-base font-semibold"
//                   onPress={handleResend}
//                 >
//                   Resend code
//                 </Text>
//               ) : (
//                 <Text className="text-[#767C8C] text-base">Resend code</Text>
//               )}
//             </View>

//             {/* Verify Button */}
//             <Button variant="primary" className="w-full" onPress={handleVerify}>
//               Verify Code
//             </Button>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default OtpVerificationScreen;

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

const OtpVerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, fromForgotPassword } = route.params || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer (600 seconds)
  const [canResend, setCanResend] = useState(false);

  const inputs = useRef([]);

  // API hooks
  const { postData: verifyOtp, loading: verifyLoading } = usePost(
    "/api/v1/auth/password/reset/verify-otp"
  );
  const { postData: resendOtp, loading: resendLoading } = usePost(
    "/api/v1/auth/password/reset"
  );

  // Start countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

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
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, "");

    const newOtp = [...otp];
    newOtp[index] = numericText;
    setOtp(newOtp);

    // Auto move to next field
    if (numericText && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Auto submit when all fields are filled
    if (numericText && index === otp.length - 1) {
      const fullOtp = [...newOtp].join("");
      if (fullOtp.length === 6) {
        handleVerify();
      }
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
        Alert.alert("Success", "OTP verified successfully!");

        // Navigate to new password screen
        navigation.navigate("auth/newpassword", {
          email: email,
          otp_code: otpCode,
        });
      } else {
        Alert.alert("Error", result.error || "Invalid OTP code");
        // Clear OTP on error
        setOtp(["", "", "", "", "", ""]);
        inputs.current[0]?.focus();
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      Alert.alert("Error", "Verification failed. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!canResend && timeLeft > 0) {
      Alert.alert("Wait", `Please wait ${formatTime()} before resending OTP`);
      return;
    }

    if (!email) {
      Alert.alert("Error", "Email not found");
      return;
    }

    const payload = {
      email: email,
    };

    try {
      const result = await resendOtp(payload);

      if (result.success) {
        console.log("OTP resent successfully:", result.data);
        Alert.alert("Success", "New OTP has been sent to your email");

        // Reset timer and OTP fields
        setTimeLeft(600); // 10 minutes
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputs.current[0]?.focus();
      } else {
        Alert.alert("Error", result.error || "Failed to resend OTP");
      }
    } catch (err) {
      console.error("OTP resend failed:", err);
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
    }
  };

  // Focus first input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputs.current[0]?.focus();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F9F9FB]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="pt-6 pb-4">
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
                Enter Verification Code
              </Text20>
              <Text14 className="text-[#767C8C] leading-6 mb-2">
                Enter the 6-digit code that we have sent to
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
                  className="w-12 h-12 rounded-lg text-center text-lg bg-white border border-gray-300 focus:border-blue-500"
                  maxLength={1}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Timer & Resend */}
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-[#000] text-base font-medium">
                {formatTime()}
              </Text>

              {canResend || timeLeft === 0 ? (
                <Text
                  className="text-[#0461A6] text-base font-semibold"
                  onPress={handleResend}
                >
                  {resendLoading ? "Sending..." : "Resend code"}
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
              disabled={verifyLoading || otp.join("").length !== 6}
            >
              {verifyLoading ? "Verifying..." : "Verify Code"}
            </Button>

            {/* Info Text */}
            <View className="mt-6">
              <Text className="text-[#767C8C] text-sm text-center">
                The OTP will expire in 10 minutes
              </Text>
              <Text className="text-[#767C8C] text-sm text-center mt-1">
                Didn't receive the code? Wait for the timer to finish and click
                "Resend code"
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;
