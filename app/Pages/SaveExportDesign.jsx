import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Image1 from "../../assets/images/Image.svg";
import Link from "../../assets/images/Link.svg";
import Mail from "../../assets/images/Mail.svg";
import Pdf from "../../assets/images/Pdf.svg";
import Whatsapp from "../../assets/images/WhatsApp.svg";

import Button from "../../components/ui/Button";
import { Text12, Text16Bold } from "../../components/ui/Typography";
const Frame6 = require("../../assets/images/Frame6.png");
const SaveExportDesign = () => {
  return (
    <ScrollView className="flex-1">
      <View className="flex-col h-[99Vh] justify-between">
        <View>
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
                <Image1 />
                <Text className="mt-2 text-[#000000] text-sm font-semibold">
                  PNG Image
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  High-quality image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-[48%] bg-white rounded-xl p-4 items-center">
                <Pdf />
                <Text className="mt-2 text-[#000000] text-sm font-semibold">
                  PDF Document
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  With material list
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Share Options */}
          <View className=" mt-6">
            <Text16Bold>Export Design</Text16Bold>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity className="w-[31%] bg-white rounded-xl p-4 items-center">
                <Mail />
                <Text className="mt-2 text-[#000000] text-xs font-semibold ">
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-[31%] bg-white rounded-xl p-4 items-center">
                <Whatsapp />
                <Text className="mt-2 text-[#000000] text-xs font-semibold ">
                  WhatsApp
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-[31%] bg-white rounded-xl p-4 items-center">
                <Link />
                <Text className="mt-2 text-[#000000] text-xs font-semibold ">
                  Copy Link
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Save & Export Button */}
        <View className="flex-col justify-end mb-6">
          <Button variant="primary">Save and export</Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default SaveExportDesign;
