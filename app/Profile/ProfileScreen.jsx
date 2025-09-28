import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Appreance from "../../assets/Icon/Appreance.svg";
import Notification from "../../assets/Icon/Notification.svg";
import PersonIcon from "../../assets/Icon/PersonIcon.svg";
import Shield from "../../assets/Icon/Shield.svg";
import Button from "../../components/ui/Button";
import ToggleButton from "../../components/ui/ToggleButton";
import { Text12, Text14, Text16Bold } from "../../components/ui/Typography";

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [appearance, setAppearance] = useState(false);

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Profile Section */}
        <View className="items-center mt-6">
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/women/44.jpg",
            }}
            className="w-20 h-20 border-[1px] border-[#C8CCD9] rounded-full"
          />
          <Text16Bold className="mt-2">Sheraz Toor</Text16Bold>
          <Text14 className="">sheraz@example.com</Text14>
        </View>

        {/* Stats */}
        <View className="flex-row justify-center gap-4 mt-4 space-x-8">
          <View className="items-center">
            <Text16Bold>24</Text16Bold>
            <Text12 className="">Projects</Text12>
          </View>
          <View className="items-center">
            <Text16Bold className="font-bold">136</Text16Bold>
            <Text12>Materials</Text12>
          </View>
          <View className="items-center">
            <Text16Bold className="text-lg font-bold">4.8</Text16Bold>
            <Text12>Rating</Text12>
          </View>
        </View>

        {/* Account Settings */}
        <View className="mt-6  bg-white p-4 rounded-xl">
          <Text16Bold className="mb-2">Account Settings</Text16Bold>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b-[1px] border-[#EBEDF0]">
            <View className="flex-row items-center">
              <View className="p-2 bg-[#DFF8E9] rounded-lg">
                <PersonIcon />
              </View>
              <View className="ml-3">
                <Text className=" text-[#000000] font-semibold text-xs">
                  Personal Information
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  Update your name, email, and photo
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={14} color="#767C8C" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b-[1px] border-[#EBEDF0] ">
            <View className="flex-row items-center">
              <View className="p-2 bg-[#FFF9E6] rounded-lg">
                <Shield />
              </View>
              <View className="ml-3">
                <Text className=" text-[#000000] font-semibold text-xs">
                  Security
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  Change password and 2FA settings
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={14} color="#767C8C" />
          </TouchableOpacity>

          {/* Notifications Toggle */}
          <View className="flex-row items-center justify-between py-4 border-b-[1px] border-[#EBEDF0] ">
            <View className="flex-row items-center">
              <View className="p-2 bg-[#E6F6FF] rounded-lg">
                <Notification />
              </View>
              <View className="ml-3">
                <Text className=" text-[#000000] font-semibold text-xs">
                  Notifications
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  Manage your notifications
                </Text>
              </View>
            </View>
            <ToggleButton value={notifications} onToggle={setNotifications} />
          </View>

          {/* Appearance Toggle */}
          <View className="flex-row items-center justify-between bg-white pt-4 rounded-xl">
            <View className="flex-row items-center">
              <View className="p-2 bg-[#FEE9EA] rounded-lg">
                <Appreance />
              </View>
              <View className="ml-3">
                <Text className=" text-[#000000] font-semibold text-xs">
                  Appearance
                </Text>
                <Text className="text-[#A5A5A5] text-[10px] font-normal">
                  Dark mode and theme settings
                </Text>
              </View>
            </View>
            <ToggleButton value={appearance} onToggle={setAppearance} />
          </View>
        </View>

        {/* Free Plan */}
        <View className="bg-white mt-6 p-4 rounded-xl">
          <Text16Bold className=" mb-2">Free Plan</Text16Bold>
          <Text14>
            Upgrade to unlock all features and export unlimited designs
          </Text14>

          <View className="mt-3 space-y-3">
            <View className="flex-row items-center mb-2">
              <View className="w-5 h-5 rounded-full bg-[#0461A6] flex items-center justify-center">
                <Feather name="check" size={12} color="#fff" />
              </View>
              <Text className="text-[#000000] text-sm  font-normal ml-2">
                5 projects limit
              </Text>
            </View>
            <View className="flex-row items-center mb-2 ">
              <View className="w-5 h-5 rounded-full bg-[#0461A6] flex items-center justify-center">
                <Feather name="check" size={12} color="#fff" />
              </View>
              <Text className="text-[#000000] text-sm  font-normal ml-2">
                Basic materials
              </Text>
            </View>
            <View className="flex-row items-center mb-2">
              <View className="w-5 h-5 rounded-full bg-[#0461A6] flex items-center justify-center">
                <Feather name="check" size={12} color="#fff" />
              </View>
              <Text className="text-[#000000] text-sm  font-normal ml-2">
                No PDF export
              </Text>
            </View>
          </View>

          <Button variant="primary" className="mt-4">
            Upgrade to pro
          </Button>
        </View>

        {/* Logout */}
        <Button variant="secondary" className="mt-6">
          Log out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
