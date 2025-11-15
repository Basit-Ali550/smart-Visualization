
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import {
  Text12,
  Text14,
  Text16Bold,
  Text20,
} from "../../components/ui/Typography";

import Back from "../../assets/images/back.svg";
import { roomTypes } from "../../Halper/Constant";

const InteriorDesignScreen = () => {
  // const navigation = useNavigation();
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState(null);

 const handleContinue = () => {
  if (selectedRoom) {
    router.push({
      pathname: "pages/interior-exterior-style",
      params: {
        path: "interior",
        roomType: selectedRoom.name,  // sirf name bhej rahe hain
      },
    });
  }
};

  const RoomGridItem = ({ item, isSelected, onPress }) => {
    const ImageComponent = item.image;

    return (
      <TouchableOpacity
        onPress={() => {
          console.log("Selected room:", item.name);
          onPress(item);
        }}
        className={`w-[48%] mb-4 bg-white rounded-[10px] border-[1px] p-4 ${
          isSelected ? "border-[#0461A6]" : "border-[#F5F6FA]"
        }`}
      >
        <View className="items-center">
          <View className="w-16 h-16 items-center justify-center mb-3">
            <ImageComponent width={60} height={60} />
          </View>

          <Text12 className="text-center text-[#000] font-semibold mb-1">
            {item.name}
          </Text12>
          <Text className="text-[10px] text-[#A5A5A5] text-center">
            {item.description}
          </Text>

          {isSelected && (
            <View className="absolute top-2 right-2 w-5 h-5 bg-[#0461A6] rounded-full justify-center items-center">
              <Feather name="check" size={14} color="#FFFFFF" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F6FA]">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <Header
          left={<Back />}
          onLeftPress={() => router.back()}
          title=""
          right={""}
        />

        <View className="pb-4">
          <View className="mb-6">
            <Text20>Interior Design</Text20>
            <Text14 className="text-[#767C8C]">
              Transform your indoor spaces with our design tools.
            </Text14>
          </View>

          <View className="bg-white rounded-xl p-4 mb-10">
            <View className="mb-6">
              <Text16Bold>Select Room Type</Text16Bold>
              <Text12 className="text-[#767C8C] mt-1">
                Choose the type of room you want to design.
              </Text12>
            </View>

            <View className="flex-row flex-wrap justify-between">
              {roomTypes.map((room) => (
                <RoomGridItem
                  key={room.id}
                  item={room}
                  isSelected={selectedRoom?.id === room.id}
                  onPress={setSelectedRoom}
                />
              ))}
            </View>

            <Button
              variant="primary"
              className="w-full mt-8"
              onPress={handleContinue}
              disabled={!selectedRoom}
            >
              Continue to style selection
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InteriorDesignScreen;