import { EvilIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ✅ Use expo-router instead of react-navigation
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Exterior from "../../assets/Icon/Exterior.svg";
import HomeIcon from "../../assets/Icon/Home.svg"; // Renamed to avoid conflict
import Visualize from "../../assets/images/Visualize.png";
import Button from "../../components/ui/Button";
import { Text14, Text16Bold } from "../../components/ui/Typography";
import { useAuth } from "../../context/AuthContext"; // Add this to get real user data

// Mock data
const mockData = {
  recentProjects: [
    {
      id: 1,
      title: "Modern Living Room",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=100&fit=crop",
      lastEdited: "Today",
      style: "Modern",
    },
    {
      id: 2,
      title: "Scandinavian Kitchen",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=100&fit=crop",
      lastEdited: "3 days ago",
      style: "Scandinavian",
    },
  ],
  popularStyles: [
    {
      id: 1,
      name: "Japanese Minimalism",
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Contemporary",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&h=100&fit=crop",
    },
  ],
};

const DashboardScreen = () => {
  const router = useRouter(); // ✅ Use expo-router
  const { user } = useAuth(); // ✅ Get real user data from context

  // Render recent project item
  const renderProjectItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push("/pages/profile")}
      className="p-3 bg-white flex-1 m-2 rounded-xl"
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-28 rounded-lg mb-2"
        />
        <TouchableOpacity className="absolute top-1 right-2">
          <View className="bg-white/40 flex-row items-center justify-center p-2 rounded-full">
            <FontAwesome5 name="heart" size={14} color="#000000" />
          </View>
        </TouchableOpacity>
      </View>
      <Text
        className="text-sm font-semibold text-[#464646] mb-1"
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <Text className="text-[#A5A5A5] text-[10px] font-normal">
        Last edited {item.lastEdited}
      </Text>
    </TouchableOpacity>
  );

  // Render style item
  const renderStyleItem = ({ item }) => (
    <TouchableOpacity
      className="p-3 bg-white flex-1 m-2 rounded-xl"
      // onPress={() => router.push("/pages/style-details")}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-28 rounded-lg mb-2"
        />
        <TouchableOpacity className="absolute top-1 right-2">
          <View className="bg-white/40 flex-row items-center justify-center p-2 rounded-full">
            <FontAwesome5 name="heart" size={14} color="#000000" />
          </View>
        </TouchableOpacity>
      </View>
      <Text
        className="text-sm font-semibold text-[#464646] mb-1"
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text className="text-[#A5A5A5] text-[10px] font-normal">Style</Text>
    </TouchableOpacity>
  );

  // Render section item for main FlatList
  const renderSection = ({ item }) => (
    <View>
      {item.type === "header" && (
        <View className="pb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              {/* ✅ Use real user data */}
              <Text className="text-[#464646] text-[24px] font-bold">
                Hi {user?.first_name || "User"}👋
              </Text>
              <Text14 className="font-bold">
                Ready to visualize your space?
              </Text14>
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center">
                <EvilIcons name="search" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => router.push("/pages/notifications")} // ✅ Expo Router
                className="w-10 h-10 rounded-full bg-white justify-center items-center"
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/pages/profile")} // ✅ Expo Router
              >
                <Image
                  source={{
                    uri:
                      user?.avatar_url ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                  }}
                  className="w-10 h-10 rounded-full"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Image source={Visualize} className="w-full rounded-xl" />
          </View>
        </View>
      )}
      {item.type === "interiorDesign" && (
        <View className="p-4 bg-white rounded-xl">
          <View className="flex-row gap-4">
            <View className="bg-[#E6EFF6] flex-row w-10 h-10 justify-center items-center rounded-lg">
              <HomeIcon />
            </View>
            <View className="flex-1">
              <Text16Bold className="">Interior Design</Text16Bold>
              <Text14 className="text-[#767C8C] mb-4">
                Transform indoor spaces with premium materials
              </Text14>
            </View>
          </View>
          <Button
            // onPress={() => router.push("/pages/interior-design")} // ✅ Expo Router
            variant="primary"
          >
            Start project
          </Button>
        </View>
      )}
      {item.type === "exteriorDesign" && (
        <View className="p-4 bg-white mt-4 gap-3 rounded-xl ">
          <View className="flex-row gap-3">
            <View className="bg-[#E6EFF6] flex-row w-10 h-10 justify-center items-center rounded-lg">
              <Exterior />
            </View>
            <View className="flex-1">
              <Text16Bold className="">Exterior Design</Text16Bold>
              <Text14
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-[#767C8C] mb-2"
              >
                Enhance your homes facade with beautiful materials
              </Text14>
            </View>
          </View>
          <Button
            // onPress={() => router.push("/pages/exterior-design")} // ✅ Expo Router
            variant="primary"
          >
            Start project
          </Button>
        </View>
      )}
      {item.type === "recentProjects" && (
        <View className="mt-3 mb-6 ">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>Recent Projects</Text16Bold>
            <TouchableOpacity
            // onPress={() => router.push("/pages/my-projects")} // ✅ Expo Router
            >
              <Text className="text-[#0461A6]">View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockData.recentProjects}
            renderItem={renderProjectItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            key="recentProjectsGrid"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
          />
        </View>
      )}
      {item.type === "popularStyles" && (
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>Popular Styles</Text16Bold>
            <TouchableOpacity
            // onPress={() => router.push("/pages/styles")} // ✅ Expo Router
            >
              <Text className="text-[#0461A6]">View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockData.popularStyles}
            renderItem={renderStyleItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            key="popularStylesGrid"
            contentContainerStyle={{ paddingHorizontal: 4 }}
          />
        </View>
      )}
    </View>
  );

  // Data for the main FlatList
  const sections = [
    { type: "header", id: "header" },
    { type: "interiorDesign", id: "interiorDesign" },
    { type: "exteriorDesign", id: "exteriorDesign" },
    { type: "recentProjects", id: "recentProjects" },
    { type: "popularStyles", id: "popularStyles" },
  ];

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingVertical: 8 }}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
