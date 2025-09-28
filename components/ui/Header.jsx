import { Text, TouchableOpacity, View } from "react-native";

const Header = ({ left, onLeftPress, title, right, rightWidth = 48 }) => {
  return (
    <View className="flex-row justify-between items-center mb-6">
      {/* Left */}
      {left ? (
        <TouchableOpacity onPress={onLeftPress} className="mr-4">
          {left}
        </TouchableOpacity>
      ) : (
        <View className="w-12" />
      )}

      {/* Title */}
      {title && <Text className="text-[24px] font-bold">{title}</Text>}

      {/* Right (or placeholder with custom width) */}
      {right ? <View>{right}</View> : <View style={{ width: rightWidth }} />}
    </View>
  );
};

export default Header;
