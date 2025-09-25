import { Text, View } from "react-native";

// Typography component for 20px text
export const Text20 = ({ children, className }) => {
  return (
    <View>
      <Text
        className={`text-[20px] font-[Montserrat] font-bold text-[#000000] ${
          className || ""
        }`}
        style={{ fontWeight: "700", lineHeight: 24, letterSpacing: 0 }}
      >
        {children}
      </Text>
    </View>
  );
};

// Typography component for 16px text (original variant)
export const Text16 = ({ children, className }) => {
  return (
    <View>
      <Text
        className={`text-[16px] font-[Montserrat] font-normal text-[#A5A5A5] ${
          className || ""
        }`}
      >
        {children}
      </Text>
    </View>
  );
};

// Typography component for 16px text (bold variant)
export const Text16Bold = ({ children, className }) => {
  return (
    <View>
      <Text
        className={`text-[14px] font-[Montserrat] font-semibold text-[#000000] ${
          className || ""
        }`}
      >
        {children}
      </Text>
    </View>
  );
};
export const Text14 = ({ children, className }) => {
  return (
    <View>
      <Text
        className={`text-[14px] font-[Montserrat] font-normal text-[#A5A5A5] ${
          className || ""
        }`}
      >
        {children}
      </Text>
    </View>
  );
};

export const Text12 = ({ children, className }) => {
  return (
    <View>
      <Text
        className={`text-[12px] font-[Montserrat] font-normal text-[#A5A5A5] ${
          className || ""
        }`}
      >
        {children}
      </Text>
    </View>
  );
};
