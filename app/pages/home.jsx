import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Exterior from "../../assets/Icon/Exterior.svg";
import HomeIcon from "../../assets/Icon/Home.svg";
import Visualize from "../../assets/images/Visualize.png";
import Button from "../../components/ui/Button";
import { Text14, Text16Bold } from "../../components/ui/Typography";
import { useAuth } from "../../context/AuthContext";
import useGet from "../../hooks/useGet"; // API hook

const DashboardScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Fetch user's projects from API
  const { data: projectsData, loading: projectsLoading } = useGet(
    "/api/v1/design/projects"
  );

  // Transform API project to match dashboard format
  const transformProjectData = (apiProject) => {
    const generation = apiProject.generations?.[0];
    const updatedAt = apiProject.updated_at || apiProject.created_at;
    const date = new Date(updatedAt);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    return {
      id: apiProject.id,
      title: apiProject.name || "Untitled Project",
      image:
        generation?.generated_image_url ||
        apiProject.original_image_url ||
        "https://via.placeholder.com/300x200/eeeeee/999999?text=No+Image",
      lastEdited: isToday
        ? "Today"
        : `${date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`,
      style: apiProject.design_style || "Custom",
    };
  };

  // Get latest 2 projects (most recently updated/created)
  const recentProjects = projectsData
    ? projectsData
        .sort(
          (a, b) =>
            new Date(b.updated_at || b.created_at).getTime() -
            new Date(a.updated_at || a.created_at).getTime()
        )
        .slice(0, 2)
        .map(transformProjectData)
    : [];

  // Render recent project card
  const renderProjectItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`pages/save-project?project_id=${item.id}`)}
      className="p-3 bg-white flex-1 m-2 rounded-xl shadow-sm"
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-28 rounded-lg mb-2"
          resizeMode="cover"
        />
        <TouchableOpacity className="absolute top-2 right-2">
          <View className="bg-white/60 backdrop-blur-sm p-2 rounded-full">
            <FontAwesome5 name="heart" size={14} color="#000" />
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

  // Render popular styles (still mock — agar API se lana hai to bata dena)
  const popularStyles = [
    {
      id: 1,
      name: "Japanese Minimalism",
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Contemporary",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=200&fit=crop",
    },
  ];

  const renderStyleItem = ({ item }) => (
    <TouchableOpacity
      className="p-3 bg-white flex-1 m-2 rounded-xl shadow-sm"
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-28 rounded-lg mb-2"
          resizeMode="cover"
        />
        <TouchableOpacity className="absolute top-2 right-2">
          <View className="bg-white/60 backdrop-blur-sm p-2 rounded-full">
            <FontAwesome5 name="heart" size={14} color="#000" />
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

  // Main sections renderer
  const renderSection = ({ item }) => (
    <View>
      {/* Header */}
      {item.type === "header" && (
        <View className="pb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-[#464646] text-[24px] font-bold">
                Hi {user?.first_name || "User"}
              </Text>
              <Text14 className="font-bold text-[#464646]/80">
                Ready to visualize your space?
              </Text14>
            </View>
            <View className="flex-row gap-3">
              {/* <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center shadow-sm">
                <EvilIcons name="search" size={24} color="black" />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => router.push("/pages/notifications")}
                className="w-10 h-10 rounded-full bg-white justify-center items-center shadow-sm"
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/pages/profile")}>
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

      {/* Interior Design Card */}
      {item.type === "interiorDesign" && (
        <View className="p-4 bg-white rounded-xl shadow-sm">
          <View className="flex-row gap-4">
            <View className="bg-[#E6EFF6] w-12 h-12 justify-center items-center rounded-lg">
              <HomeIcon width={28} height={28} />
            </View>
            <View className="flex-1">
              <Text16Bold>Interior Design</Text16Bold>
              <Text14 className="text-[#767C8C] mt-1">
                Transform indoor spaces with premium materials
              </Text14>
            </View>
          </View>
          <Button
            onPress={() => router.push("/pages/interior-design")}
            variant="primary"
            className="mt-6"
          >
            Start project
          </Button>
        </View>
      )}

      {/* Exterior Design Card */}
      {item.type === "exteriorDesign" && (
        <View className="p-4 bg-white mt-4 rounded-xl shadow-sm">
          <View className="flex-row gap-4">
            <View className="bg-[#E6EFF6] w-12 h-12 justify-center items-center rounded-lg">
              <Exterior width={28} height={28} />
            </View>
            <View className="flex-1">
              <Text16Bold>Exterior Design</Text16Bold>
              <Text14 className="text-[#767C8C] mt-1">
                Enhance your home's facade with beautiful materials
              </Text14>
            </View>
          </View>
          <Button
            onPress={() => router.push("/pages/exterior-design")}
            variant="primary"
            className="mt-6"
          >
            Start project
          </Button>
        </View>
      )}

      {/* My Projects Section */}
      {item.type === "recentProjects" && (
        <View className="mt-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>My Projects</Text16Bold>
            <TouchableOpacity onPress={() => router.push("/pages/my-projects")}>
              <Text className="text-[#0461A6] font-medium">View all</Text>
            </TouchableOpacity>
          </View>

          {projectsLoading ? (
            <View className="flex-row justify-between">
              {[1, 2].map((i) => (
                <View
                  key={i}
                  className="flex-1 m-2 bg-white rounded-xl p-3 shadow-sm"
                >
                  <View className="w-full h-28 bg-gray-200 rounded-lg animate-pulse" />
                  <View className="h-4 bg-gray-200 rounded mt-3 w-24 animate-pulse" />
                  <View className="h-3 bg-gray-200 rounded mt-2 w-16 animate-pulse" />
                </View>
              ))}
            </View>
          ) : recentProjects.length > 0 ? (
            <FlatList
              data={recentProjects}
              renderItem={renderProjectItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4 }}
            />
          ) : (
            <View className="bg-white rounded-xl p-8 items-center shadow-sm">
              <Feather name="folder" size={64} color="#D1D5DB" />
              <Text16Bold className="text-gray-500 mt-4">
                No projects yet
              </Text16Bold>
              <Text14 className="text-gray-400 text-center mt-2 px-6">
                Start designing your dream space and see them here!
              </Text14>
              <Button
                onPress={() => router.push("/pages/interior-design")}
                variant="primary"
                className="mt-6"
              >
                Create Your First Project
              </Button>
            </View>
          )}
        </View>
      )}

      {/* Material Catalog */}
      {item.type === "popularStyles" && (
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>Material Catalog</Text16Bold>
            <TouchableOpacity
              onPress={() => router.push("/pages/SelectMaterials")}
            >
              <Text className="text-[#0461A6] font-medium">View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={popularStyles}
            renderItem={renderStyleItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 4 }}
          />
        </View>
      )}
    </View>
  );

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
        // contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
