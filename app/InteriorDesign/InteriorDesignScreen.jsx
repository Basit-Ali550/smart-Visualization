import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";

// Your components
import Button from "../../components/ui/Button";
import { Text14, Text16Bold, Text20 } from "../../components/ui/Typography";

// Mock data for room types
const roomTypes = [
  {
    id: 1,
    name: "Living Room",
    description: "Sofas, chairs and entertainment areas",
    icon: "tv",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Bedroom",
    description: "Beds, storage, and personal spaces",
    icon: "bed",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Kitchen",
    description: "Cabinets, counters, and appliances",
    icon: "coffee",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Bathroom",
    description: "Vanities, showers, and fixtures",
    icon: "droplet",
    image:
      "https://images.unsplash.com/photo-1584621247940-688ce92e3e2e?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Dining Room",
    description: "Tables, chairs, and serving areas",
    icon: "coffee",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Home Office",
    description: "Desks, storage, and workspaces",
    icon: "monitor",
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
      onPress={() => onPress(item)}
      className={`w-[48%] mb-4 rounded-2xl border-2 p-4 ${
        isSelected ? "border-[#0461A6] bg-blue-50" : "border-gray-200 bg-white"
      }`}
    >
      <View className="items-center">
        <View
          className="w-16 h-16 rounded-full items-center justify-center mb-3"
          style={{ backgroundColor: isSelected ? "#0461A6" : "#F1F5F9" }}
        >
          <Feather
            name={item.icon}
            size={28}
            color={isSelected ? "#FFFFFF" : "#0461A6"}
          />
        </View>

        <Text16Bold className="text-center mb-1">{item.name}</Text16Bold>
        <Text14 className="text-[#767C8C] text-center text-xs">
          {item.description}
        </Text14>

        {isSelected && (
          <View className="absolute top-2 right-2 w-5 h-5 bg-[#0461A6] rounded-full items-center justify-center">
            <Feather name="check" size={12} color="#FFFFFF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-4"
            >
              <Feather name="arrow-left" size={24} color="#000000" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text20 className="text-[24px] font-bold">Interior Design</Text20>
              <Text14 className="text-[#767C8C] mt-1">
                Transform your indoor spaces with our design tools.
              </Text14>
            </View>
          </View>
        </View>

        {/* Room Selection Section */}
        <View className="px-6 pb-6">
          <View className="mb-6">
            <Text16Bold className="font-bold mb-2">Select Room Type</Text16Bold>
            <Text14 className="text-[#767C8C]">
              Choose the type of room you want to design.
            </Text14>
          </View>

          {/* Room Type Grid */}
          <View className="flex-row flex-wrap justify-between mb-8">
            {roomTypes.map((room) => (
              <RoomGridItem
                key={room.id}
                item={room}
                isSelected={selectedRoom?.id === room.id}
                onPress={setSelectedRoom}
              />
            ))}
          </View>

          {/* Continue Button */}
          <Button
            variant="primary"
            className="w-full"
            onPress={handleContinue}
            disabled={!selectedRoom}
          >
            Continue to style selection
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InteriorDesignScreen;
