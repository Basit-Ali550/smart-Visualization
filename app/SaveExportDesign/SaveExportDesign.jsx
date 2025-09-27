import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Button from "../../components/ui/Button";
import { Text12, Text14, Text16Bold } from "../../components/ui/Typography";
const Frame6 = require("../../assets/images/Frame6.png");
const SaveExportDesign = () => {
  return (
    <ScrollView className="flex-1">
      {/* Header */}
      <View className="flex-row justify-center items-center py-3">
        <Text16Bold className="text-center ml-3">
          Save & Export Design
        </Text16Bold>
      </View>

      {/* Preview Image */}
      <View className=" mt-4">
        <Image source={Frame6} className="w-full h-40 rounded-xl" />
      </View>

      {/* Design Info */}
      <View className="mt-3">
        <Text16Bold>Modern Living Room Design</Text16Bold>
        <Text12 className="mt-0.5">Last modified: Today, 3:45 PM</Text12>
      </View>

      {/* Save to Account Checkbox */}
      <View className="flex-row bg-white rounded-xl p-4 mt-4">
        <View className="w-6 mt-1 h-6 rounded-md  justify-center items-center bg-[#0461A6]">
          <AntDesign name="check" size={14} color="white" />
        </View>
        <View className="ml-3">
          <Text className="text-[#464646] text-sm font-semibold">
            Save to my account
          </Text>
          <Text12>Access your design anytime from any device</Text12>
        </View>
      </View>

      {/* Export Design */}
      <View className="mt-4">
        <Text16Bold>Export Design</Text16Bold>
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity className="w-[48%] bg-white rounded-xl p-4 items-center">
            <AntDesign name="picture" size={28} color="#0461A6" />
            <Text16Bold className="mt-2">PNG Image</Text16Bold>
            <Text14>High-quality image</Text14>
          </TouchableOpacity>
          <TouchableOpacity className="w-[48%] bg-white rounded-xl p-4 items-center">
            <AntDesign name="file1" size={28} color="#E02227" />
            <Text16Bold className="mt-2">PDF Document</Text16Bold>
            <Text14>With material list</Text14>
          </TouchableOpacity>
        </View>
      </View>

      {/* Share Options */}
      <View className="px-4 mt-6">
        <Text16Bold>Export Design</Text16Bold>
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity className="w-[30%] bg-white rounded-xl p-4 items-center">
            <AntDesign name="mail" size={26} color="#0461A6" />
            <Text14 className="mt-2">Email</Text14>
          </TouchableOpacity>
          <TouchableOpacity className="w-[30%] bg-white rounded-xl p-4 items-center">
            <AntDesign name="wechat" size={26} color="#25D366" />
            <Text14 className="mt-2">WhatsApp</Text14>
          </TouchableOpacity>
          <TouchableOpacity className="w-[30%] bg-white rounded-xl p-4 items-center">
            <AntDesign name="link" size={26} color="#A5A5A5" />
            <Text14 className="mt-2">Copy Link</Text14>
          </TouchableOpacity>
        </View>
      </View>

      {/* Save & Export Button */}
      <View className="px-4 mt-8 mb-6">
        <Button variant="primary">Save and export</Button>
      </View>
    </ScrollView>
  );
};

export default SaveExportDesign;
