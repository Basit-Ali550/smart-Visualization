import { Feather } from "@expo/vector-icons"; // Import Expo icon
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import images using require
const Frame = require("../../assets/images/Frame.png");
const Frame1 = require("../../assets/images/Frame (1).png");
const Frame2 = require("../../assets/images/Frame (2).png");
const Frame4 = require("../../assets/images/Frame (4).png");

// Your components
import Button from "../../components/ui/Button";
import {
  Text12,
  Text14,
  Text16Bold,
  Text20,
} from "../../components/ui/Typography";

// Mock data for room types
const roomTypes = [
  {
    id: 1,
    name: "Living Room",
    description: "Sofas, chairs and entertainment areas",
    image1: Frame,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Bedroom",
    description: "Beds, storage, and personal spaces",
    image1: Frame1,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Kitchen",
    description: "Cabinets, counters, and appliances",
    image1: Frame2,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Bathroom",
    description: "Vanities, showers, and fixtures",
    image1: Frame4,
    image:
      "https://images.unsplash.com/photo-1584621247940-688ce92e3e2e?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Dining Room",
    description: "Tables, chairs, and serving areas",
    image1: Frame2,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Home Office",
    description: "Desks, storage, and workspaces",
    image1: Frame2,
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=200&fit=crop",
  },
];

const InteriorDesignScreen = ({ navigation }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleContinue = () => {
    if (selectedRoom) {
      navigation.navigate("StyleSelection", { roomType: selectedRoom });
    }
  };

  const RoomGridItem = ({ item, isSelected, onPress }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("Selected room:", item); // Debug log to confirm click
        onPress(item);
      }}
      className={`w-[48%] mb-4 bg-white rounded-[10px] border-[1px] p-4 ${
        isSelected ? "border-[#0461A6]" : "border-[#F5F6FA]"
      }`}
    >
      <View className="items-center">
        <View className="w-16 h-16 items-center justify-center mb-3">
          <Image
            source={item.image1} // Use fallback if image1 is invalid
            style={{
              width: 60,
              height: 60,
              resizeMode: "contain", // Ensure image fits within bounds
            }}
            onError={(error) =>
              console.log(
                `Failed to load image for ${item.name}:`,
                error.nativeEvent.error
              )
            }
          />
        </View>

        <Text12 className="text-center text-[#000] font-semibold mb-1">
          {item.name}
        </Text12>
        <Text className="text-[10px] text-[#A5A5A5] font-normal text-center text-xs">
          {item.description}
        </Text>

        {isSelected && (
          <View className="absolute top-2 right-2 flex justify-center items-center w-5 h-5 bg-[#0461A6] rounded-full ">
            <Feather name="check" size={14} color="#FFFFFF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        {/* Header Section */}
        <View className="pt-6 pb-4">
          <View className="flex-row items-center mb-6">
            <View className="flex-1 mt-5">
              <Text20 className="">Select Exterior Element</Text20>
              <Text14 className="">
                Transform your indoor spaces with our design tools.
              </Text14>
            </View>
          </View>
        </View>

        {/* Room Selection Section */}
        <View className="p-4 rounded-xl bg-white mb-10">
          <View className="mb-8">
            <Text16Bold className="font-bold">Select Room Type</Text16Bold>
            <Text12 className="text-[#767C8C] mb-4">
              Choose the type of room you want to design.
            </Text12>

            {/* Room Type Grid */}
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
          </View>
          <Button variant="primary" className="w-full" onPress={handleContinue}>
            Continue to style selection
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InteriorDesignScreen;
