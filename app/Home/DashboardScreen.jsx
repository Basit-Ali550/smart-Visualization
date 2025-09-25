import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

// Your components
import Button from "../../components/ui/Button";
import {
  Text12,
  Text14,
  Text16Bold,
  Text20,
} from "../../components/ui/Typography";

// Mock data
const mockData = {
  user: {
    name: "Sheraz",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
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

const DashboardScreen = ({ navigation }) => {
  // Render recent project item
  const renderProjectItem = ({ item }) => (
    <TouchableOpacity className="mr-4 w-32">
      <Image
        source={{ uri: item.image }}
        className="w-32 h-24 rounded-lg mb-2"
      />
      <Text14 className="font-semibold mb-1" numberOfLines={1}>
        {item.title}
      </Text14>
      <Text12 className="text-[#767C8C]">Last edited {item.lastEdited}</Text12>
    </TouchableOpacity>
  );

  // Render style item
  const renderStyleItem = ({ item }) => (
    <TouchableOpacity className="flex-row items-center mb-4">
      <Image
        source={{ uri: item.image }}
        className="w-12 h-12 rounded-lg mr-3"
      />
      <Text14 className="font-semibold">{item.name}</Text14>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text14 className="text-[#767C8C]">
                Hi {mockData.user.name}
              </Text14>
              <Text20 className="font-bold">
                Ready to visualize your space?
              </Text20>
            </View>
            <TouchableOpacity>
              <Image
                source={{ uri: mockData.user.avatar }}
                className="w-12 h-12 rounded-full"
              />
            </TouchableOpacity>
          </View>

          {/* Create and Visualize Card */}
          <TouchableOpacity className="bg-blue-50 rounded-2xl p-6 mb-6">
            <Text16Bold className="text-[#0461A6] mb-2">
              Create and Visualize
            </Text16Bold>
            <Text20 className="font-bold mb-2">Your Ideal Dream Space</Text20>
            <Text14 className="text-[#767C8C]">
              Upload your photo, transform it instantly, and share with others
            </Text14>
          </TouchableOpacity>
        </View>

        {/* Design Categories Section */}
        <View className="px-6 mb-6">
          <Text16Bold className="mb-4">Interior Design</Text16Bold>
          <View className="bg-gray-50 rounded-2xl p-6 mb-4">
            <Text14 className="text-[#767C8C] mb-4">
              Transform indoor spaces with premium materials
            </Text14>
            <Button variant="primary" className="w-32">
              Start project
            </Button>
          </View>

          <Text16Bold className="mb-4">Exterior Design</Text16Bold>
          <View className="bg-gray-50 rounded-2xl p-6">
            <Text14 className="text-[#767C8C] mb-4">
              Enhance your homes facade with beautiful materials
            </Text14>
            <Button variant="primary" className="w-32">
              Start project
            </Button>
          </View>
        </View>

        {/* Recent Projects Section */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>Recent Projects</Text16Bold>
            <TouchableOpacity>
              <Text14 className="text-[#0461A6]">View all</Text14>
            </TouchableOpacity>
          </View>

          <FlatList
            data={mockData.recentProjects}
            renderItem={renderProjectItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          />
        </View>

        {/* Popular Styles Section */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>Popular Styles</Text16Bold>
            <TouchableOpacity>
              <Text14 className="text-[#0461A6]">View all</Text14>
            </TouchableOpacity>
          </View>

          <FlatList
            data={mockData.popularStyles}
            renderItem={renderStyleItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
