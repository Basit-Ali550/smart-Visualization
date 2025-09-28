import { TouchableOpacity, View } from "react-native";

const ToggleButton = ({ value, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={() => onToggle(!value)}
      activeOpacity={0.8}
      className={`w-9 h-5 rounded-full flex-row items-center px-0.5 ${
        value ? "bg-[#0461A6]" : "bg-[#EBEDF0]"
      }`}
    >
      <View
        className={`w-4 h-4 rounded-full bg-white ${
          value ? "ml-auto" : "mr-auto"
        }`}
      />
    </TouchableOpacity>
  );
};

export default ToggleButton;
