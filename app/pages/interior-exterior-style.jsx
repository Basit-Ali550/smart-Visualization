import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import { Text12, Text20 } from "../../components/ui/Typography";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 50) / 2; // 2 cards with 24px padding on sides

const mockProjects = [
  {
    id: 1,
    title: "$4.99/sq ft",
    type: "Interior",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    quality: "High-quality image",
    category: "Living Room",
  },
  {
    id: 2,
    title: "$4.99/sq ft",
    type: "Interior",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
    quality: "High-quality image",
    category: "Kitchen",
  },
  {
    id: 3,
    title: "$4.99/sq ft",
    type: "Interior",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop",
    quality: "High-quality image",
    category: "Bedroom",
  },
  {
    id: 4,
    title: "$4.99/sq ft",
    type: "Exterior",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=300&h=200&fit=crop",
    quality: "High-quality image",
    category: "Exterior",
  },
  {
    id: 5,
    title: "$4.99/sq ft",
    type: "Interior",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=200&fit=crop",
    quality: "High-quality image",
    category: "Dining Room",
  },
  {
    id: 6,
    title: "$4.99/sq ft",
    type: "Interior",
    image: "https://images.unsplash.com/photo-1584621247940-688ce92e3e2e?w=300&h=200&fit=crop",
    quality: "High-quality image",
    category: "Bathroom",
  },
];

const InteriorExteriorStyle = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const router = useRouter();

  const ProjectGridCard = ({ project }) => {
    const isSelected = project.id === selectedProjectId;

    return (
      <TouchableOpacity
        onPress={() => setSelectedProjectId(project.id)}
        className={`bg-white rounded-[14px] shadow-sm overflow-hidden p-3 mb-4 ${
          isSelected ? "border-2 border-[#0461A6]" : "border border-transparent"
        }`}
        style={{ width: CARD_WIDTH }}
      >
        <Image
          source={{ uri: project.image }}
          className="w-full h-[100px] rounded-[12px]"
          resizeMode="cover"
        />
        {isSelected && (
          <View className="absolute top-2 right-2 flex justify-center items-center w-6 h-6 bg-[#0461A6] rounded-full">
            <Feather name="check" size={16} color="#FFFFFF" />
          </View>
        )}
        <View className="p-3">
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-[#000000] text-sm" numberOfLines={1}>
              {project.title}
            </Text>
            <View className="flex-row items-center gap-1">
              <AntDesign name="star" size={14} color="#FFC900" />
              <Text className="font-bold text-[#000000] text-sm">4.7</Text>
            </View>
          </View>
          <Text12 className="text-[#A5A5A5] mt-1" numberOfLines={1}>
            {project.quality}
          </Text12>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1">
        {/* Header */}
        <Text20 className="text-center font-bold text-[#464646] mb-4">
          My Projects
        </Text20>

        <FlatList
          data={mockProjects}
          renderItem={({ item }) => <ProjectGridCard project={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        {/* Fixed Button at Bottom */}
        <View className="absolute bottom-8 left-6 right-6">
          <Button
            onPress={() => router.push("Pages/MaterialDetails")}
            variant="primary"
            className="w-full"
          >
            Visualize my design
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InteriorExteriorStyle;