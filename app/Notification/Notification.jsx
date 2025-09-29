import { View } from "react-native";
import Notification from "../../assets/Icon/Notification.svg";
import PersonIcon from "../../assets/Icon/PersonIcon.svg";
import { Text14, Text16, Text16Bold } from "../../components/ui/Typography";

const NotificationList = () => {
  return (
    <View className="flex-1 ">
      {/* First Section */}
      <Text16Bold>Today</Text16Bold>
      <View className="mt-3">
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            className="flex-row  justify-between bg-white p-4 mb-3 rounded-xl "
          >
            {/* Left side */}
            <View className="flex-row flex-1">
              <View>
                <View className="rounded-md p-2 bg-[#DFF8E9]">
                  <PersonIcon />
                </View>
              </View>
              <View className="ml-3 flex-1">
                <Text16Bold numberOfLines={1}>Design Completed</Text16Bold>
                <Text14 numberOfLines={1}>
                  Your living room design is ready for review
                </Text14>
              </View>
            </View>

            {/* Right side (time) */}
            <View className="flex flex-col items-end">
              <View className="w-2 h-2 bg-primary rounded-full"></View>
              <Text14 className="text-[#A5A5A5] ml-2 text-[10px] shrink-0">
                09:10 AM
              </Text14>
            </View>
          </View>
        ))}
      </View>

      {/* Second Section */}
      <Text16Bold className="mt-4">Earlier</Text16Bold>
      <View className="mt-4">
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            className="flex-row  justify-between bg-white p-4 mb-2 rounded-xl shadow-sm"
          >
            {/* Left side */}
            <View className="flex-row flex-1">
              <View>
                {" "}
                <View className="rounded-md p-2 bg-[#E6F6FF]">
                  <Notification />{" "}
                </View>{" "}
              </View>
              <View className="ml-3 flex-1">
                <Text16Bold numberOfLines={1}>Profile Updated</Text16Bold>
                <Text16 numberOfLines={1}>
                  Your profile changes have been saved successfully
                </Text16>
              </View>
            </View>

            {/* Right side (time) */}
            <View className="flex flex-col items-end">
              <View className="w-2 h-2 bg-primary rounded-full"></View>
              <Text14 className="text-[#A5A5A5] ml-2 text-[10px] shrink-0">
                09:10 AM
              </Text14>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default NotificationList;
