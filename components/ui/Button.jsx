import { Text, TouchableOpacity, View } from "react-native";

const Button = ({
  children,
  variant = "primary",
  className,
  onPress,
  disabled = false,
}) => {
  const baseStyles = {
    primary: {
      bg: "bg-[#0461A6]",
      text: "text-white",
    },
    secondary: {
      bg: "bg-[#E02227]",
      text: "text-white",
    },
    alpha: {
      bg: "bg-[#fff]",
      text: "text-[#0461A6]",
    },
    beta: {
      bg: "bg-[#D9D9D9]",
      text: "text-[#464646]",
    },
    beta: {
      bg: "bg-[#EBEDF0]",
      text: "text-[#464646]",
    },
  };

  const variantStyles =
    baseStyles[variant] || baseStyles.primary || baseStyles.alpha;

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        className={`px-2 py-4 rounded-[10px] opacity-100 ${variantStyles.bg} ${
          disabled ? "opacity-50" : ""
        } ${className || ""}`}
      >
        <Text
          className={`text-[16px] font-[Montserrat] font-medium text-center ${variantStyles.text} `}
          style={{ fontWeight: "500", lineHeight: 24 }}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
