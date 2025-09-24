// import { Feather } from "@expo/vector-icons";
// import { useField } from "formik";
// import { useState } from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";

// const InputField = ({
//   label,
//   name,
//   type = "text",
//   placeholder,
//   className,
//   leftIcon: LeftIcon,
//   rightIcon: RightIcon,
//   leftIconName,
//   rightIconName,
//   hideLabel = false,
//   required = false,
//   onChange,
//   variant = "default",
// }) => {
//   const [field, meta] = useField(name);
//   const [isFocused, setIsFocused] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const inputType =
//     type === "password" ? (showPassword ? "text" : "password") : type;
//   const hasError = meta.touched && meta.error;

//   const handleChange = (value) => {
//     field.onChange({ target: { name, value } });
//     if (onChange) onChange({ target: { name, value } });
//   };

//   const baseColors =
//     variant === "on-dark"
//       ? {
//           label: "text-gray-400",
//           border: "border-gray-600",
//           bg: "bg-gray-800",
//           text: "text-white placeholder-gray-500",
//           focus: "border-blue-400",
//           errorBorder: "border-red-500",
//           icon: "#7A7A7A",
//         }
//       : {
//           label: "text-gray-600",
//           border: "border-gray-300",
//           bg: "bg-white",
//           text: "text-gray-900 placeholder-gray-400",
//           focus: "border-blue-400",
//           errorBorder: "border-red-500",
//           icon: "#666C7C",
//         };

//   return (
//     <View className={`w-full ${className || ""}`}>
//       {!hideLabel && label && (
//         <View className="flex-row items-center mb-2">
//           <Text className={`${baseColors.label} text-sm font-normal`}>
//             {label}
//           </Text>
//           {required && <Text className="text-red-500 ml-1">*</Text>}
//         </View>
//       )}

//       <View className="relative flex-row items-center">
//         {/* Left Icon */}
//         {LeftIcon && leftIconName && (
//           <View className="absolute left-3 z-10 h-full flex items-center justify-center">
//             <LeftIcon name={leftIconName} size={16} color={baseColors.icon} />
//           </View>
//         )}

//         {/* Text Input */}
//         <TextInput
//           value={field.value || ""}
//           onChangeText={handleChange}
//           placeholder={placeholder}
//           placeholderTextColor={variant === "on-dark" ? "#9E9E9E" : "#9E9E9E"}
//           secureTextEntry={type === "password" && !showPassword}
//           keyboardType={
//             type === "number"
//               ? "numeric"
//               : type === "email"
//               ? "email-address"
//               : "default"
//           }
//           className={`w-full px-4 py-3 rounded-lg border text-base font-normal ${
//             baseColors.bg
//           } ${baseColors.text} ${
//             hasError
//               ? baseColors.errorBorder
//               : `${baseColors.border} ${isFocused ? baseColors.focus : ""}`
//           } ${LeftIcon && leftIconName ? "pl-10" : "pl-3"} ${
//             (RightIcon && rightIconName) || type === "password"
//               ? "pr-10"
//               : "pr-3"
//           }`}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => {
//             setIsFocused(false);
//             field.onBlur({ target: { name } });
//           }}
//           autoCapitalize={
//             type === "password" || type === "email" ? "none" : "sentences"
//           }
//           autoCorrect={type !== "password" && type !== "email"}
//           returnKeyType="done"
//         />

//         {/* Right Icon or Password Toggle */}
//         <View className="absolute right-3 h-full flex items-center justify-center">
//           {RightIcon && rightIconName && type !== "password" && (
//             <RightIcon name={rightIconName} size={16} color={baseColors.icon} />
//           )}
//           {type === "password" && !RightIcon && (
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               className="p-1"
//               hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//             >
//               <Feather
//                 name={showPassword ? "eye-off" : "eye"}
//                 size={16}
//                 color={baseColors.icon}
//               />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {hasError && (
//         <Text className="text-red-500 text-xs font-normal mt-1">
//           {meta.error}
//         </Text>
//       )}
//     </View>
//   );
// };

// export default InputField;
import { Feather } from "@expo/vector-icons";
import { useField } from "formik";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  className,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftIconName,
  rightIconName,
  hideLabel = false,
  required = false,
  onChange,
  variant = "default",
}) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;
  const hasError = meta.touched && meta.error;

  const handleChange = (value) => {
    field.onChange({ target: { name, value } });
    if (onChange) onChange({ target: { name, value } });
  };

  const baseColors =
    variant === "on-dark"
      ? {
          label: "text-black",
          border: "border-white",
          bg: "bg-white",
          text: "text-[#000000] placeholder-[#767C8C]",
          focus: "border-[#0461A6]",
          errorBorder: "border-red-500",
          icon: "#000000",
        }
      : {
          label: "text-black",
          border: "border-white",
          bg: "bg-white",
          text: "text-[#000000] placeholder-[#767C8C]",
          focus: "border-[#0461A6]",
          errorBorder: "border-red-500",
          icon: "#000000",
        };

  return (
    <View className={`w-full ${className || ""}`}>
      {!hideLabel && label && (
        <View className="flex-row items-center mb-2">
          <Text
            className={`${baseColors.label} text-[16px] font-[Montserrat] font-normal`}
            style={{ fontWeight: "400" }}
          >
            {label}
          </Text>
          {required && <Text className="text-red-500 ml-1">*</Text>}
        </View>
      )}

      <View className="relative flex-row items-center">
        {/* Left Icon */}
        {LeftIcon && leftIconName && (
          <View className="absolute left-3 z-10 h-full flex items-center justify-center">
            <LeftIcon name={leftIconName} size={20} color={baseColors.icon} />
          </View>
        )}

        {/* Text Input */}
        <TextInput
          value={field.value || ""}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#767C8C"
          secureTextEntry={type === "password" && !showPassword}
          keyboardType={
            type === "number"
              ? "numeric"
              : type === "email"
              ? "email-address"
              : "default"
          }
          className={`w-full px-4 py-3 rounded-[10px] border-[1px] text-[16px] font-[Montserrat] font-medium opacity-100 ${
            baseColors.bg
          } ${baseColors.text} ${
            hasError
              ? baseColors.errorBorder
              : `${baseColors.border} ${isFocused ? baseColors.focus : ""}`
          } ${LeftIcon && leftIconName ? "pl-10" : "pl-3"} ${
            (RightIcon && rightIconName) || type === "password"
              ? "pr-10"
              : "pr-3"
          }`}
          style={{ fontWeight: "500" }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            field.onBlur({ target: { name } });
          }}
          autoCapitalize={
            type === "password" || type === "email" ? "none" : "sentences"
          }
          autoCorrect={type !== "password" && type !== "email"}
          returnKeyType="done"
        />

        {/* Right Icon or Password Toggle */}
        <View className="absolute right-3 h-full flex items-center justify-center">
          {RightIcon && rightIconName && type !== "password" && (
            <RightIcon name={rightIconName} size={20} color={baseColors.icon} />
          )}
          {type === "password" && !RightIcon && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="p-1"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={baseColors.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {hasError && (
        <Text className="text-red-500 text-xs font-normal mt-1">
          {meta.error}
        </Text>
      )}
    </View>
  );
};

export default InputField;
