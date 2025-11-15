import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,

  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text12,
  Text14,
  Text16Bold,
  Text20,
} from "../../components/ui/Typography";
import useGet from "../../hooks/useGet";
const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; 

const filters = [
  { id: "all", label: "All" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
  { id: "recent", label: "Recent" },
 
];
const ProjectGridSkeleton = () => (
  <View
    className="bg-white p-3 rounded-[12px] shadow-sm overflow-hidden mb-4"
    style={{ width: CARD_WIDTH }}
  >
    <View className="w-full rounded-[8px] h-24 bg-gray-200 animate-pulse" />
    <View className="mt-2">
      <View className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-1" />
      <View className="h-3 bg-gray-200 rounded w-1/2 animate-pulse mb-2" />
      <View className="flex-row justify-between">
        <View className="flex-row space-x-2">
          <View className="h-3 bg-gray-200 rounded w-8 animate-pulse" />
          <View className="h-3 bg-gray-200 rounded w-8 animate-pulse" />
        </View>
      </View>
    </View>
  </View>
);

const FilterSkeleton = () => (
  <View className="h-10 bg-gray-200 rounded-xl w-20 mr-2 animate-pulse" />
);

const MyProjectsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  const { data: projectsData, loading, error } = useGet('/api/v1/design/projects');

  console.log({projectsData, error})
  
  const transformProjectData = (apiProject) => {
    const generation = apiProject.generations?.[0];
    return {
      id: apiProject.id,
      title: apiProject.name,
      type: apiProject.design_type,
      image: generation?.generated_image_url || apiProject.original_image_url,
      quality: "High-quality image",
      likes: 45,
      views: 45,
      createdAt: apiProject.created_at,
      category: apiProject.room_type,
      design_style: apiProject.design_style,
      is_favorite: generation?.is_favorite || false,
    };
  };

  const projects = projectsData ? projectsData.map(transformProjectData) : [];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    switch (activeFilter) {
      case "interior":
        matchesFilter = project.type === "Interior";
        break;
      case "exterior":
        matchesFilter = project.type === "Exterior";
        break;
      case "recent":
        const projectDate = new Date(project.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesFilter = projectDate >= weekAgo;
        break;
      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });

  const ProjectGridCard = ({ project }) => {
    const router=useRouter()
    const handleProjectPress = () => {
      // Navigate to SaveExportDesign screen with project_id as parameter
      router.push(`pages/save-project?project_id=${project.id}`);
    };

    return (
      <TouchableOpacity
        className="bg-white p-3 rounded-[12px] shadow-sm overflow-hidden mb-4"
        style={{ width: CARD_WIDTH }}
        activeOpacity={0.7}
        onPress={handleProjectPress} // Add this onPress handler
      >
        <Image
          source={{ uri: project.image }}
          className="w-full rounded-[8px] h-24"
          resizeMode="cover"
        />

        <View className="">
          <Text
            className="font-semibold text-[#000000] text-sm mt-1"
            numberOfLines={1}
          >
            {project.title}
          </Text>
          <Text12
            className="text-[#A5A5A5] text-[10px] font-normal mb-1"
            numberOfLines={1}
          >
            {project.design_style} • {project.category}
          </Text12>

          <View className="flex-row justify-between gap-3 items-center">
            <View className="flex-row items-center space-x-2">
              <View className="flex-row items-center">
                <Feather 
                  name="heart" 
                  size={12} 
                  color={project.is_favorite ? "#FF0000" : "#000000"} 
                />
                <Text12 className="text-[#767C8C] ml-1">{project.likes}</Text12>
              </View>
              <View className="flex-row items-center">
                <Feather name="eye" size={12} color="#000000" />
                <Text12 className="text-[#767C8C] ml-1">{project.views}</Text12>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  const FilterButton = ({ filter, isActive, onPress }) => (
    <TouchableOpacity
      onPress={() => onPress(filter.id)}
      className={`px-5 py-2.5 rounded-xl font-normal flex justify-center items-center text-sm mr-2 ${
        isActive ? "bg-[#0461A6]" : "bg-[#EBEDF0]"
      }`}
    >
      <Text14 className={isActive ? "text-white " : "text-[#464646]"}>
        {filter.label}
      </Text14>
    </TouchableOpacity>
  );

  // Show loading skeleton
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-blue-50">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Header Section Skeleton */}
          <View className="bg-blue-50 pt-6 pb-4">
            <View className="flex-row justify-between items-center mb-6">
              <View className="h-8 bg-gray-200 rounded w-40 animate-pulse" />
              <View className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            </View>

            {/* Search Bar Skeleton */}
            <View className="mb-4">
              <View className="h-12 bg-gray-200 rounded-xl animate-pulse" />
            </View>

            {/* Filter Tabs Skeleton */}
            <View className="mb-2">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
              >
                {filters.map((filter) => (
                  <FilterSkeleton key={filter.id} />
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Projects Grid Skeleton */}
          <View className="pt-4 pb-8">
            <View className="flex-row flex-wrap justify-between">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <ProjectGridSkeleton key={item} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Show error state
  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-blue-50">
        <View className="flex-1 items-center justify-center">
          <Feather name="alert-triangle" size={64} color="#EF4444" />
          <Text16Bold className="text-red-500 mt-4 mb-2">
            Failed to load projects
          </Text16Bold>
          <Text14 className="text-gray-600 text-center px-8">
            {error}
          </Text14>
          <TouchableOpacity 
            className="bg-[#0461A6] px-6 py-3 rounded-xl mt-4"
            onPress={() => window.location.reload()} // Or implement retry logic
            activeOpacity={0.7}
          >
            <Text14 className="text-white">Try Again</Text14>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <View className="bg-blue-50 pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text20 className="text-[24px] font-bold">My Projects</Text20>
            <TouchableOpacity className="p-2">
              <Feather name="plus" size={24} color="#0461A6" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="mb-4">
            <View className="flex-row items-center bg-white px-3 rounded-xl py-2.5">
              <Feather name="search" size={20} color="#767C8C" />
              <TextInput
                placeholder="Search designs..."
                placeholderTextColor="#767C8C"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 ml-3 py-1 text-[16px] font-[Montserrat]"
                style={{ fontWeight: "500" }}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Feather name="x" size={20} color="#767C8C" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Filter Tabs */}
          <View className="mb-2">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {filters.map((filter) => (
                <FilterButton
                  key={filter.id}
                  filter={filter}
                  isActive={activeFilter === filter.id}
                  onPress={setActiveFilter}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Projects Grid */}
        <View className="pt-4 pb-8">
          {filteredProjects.length > 0 ? (
            <FlatList
              data={filteredProjects}
              renderItem={({ item }) => <ProjectGridCard project={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="items-center justify-center py-16">
              <Feather name="folder" size={64} color="#D1D5DB" />
              <Text16Bold className="text-gray-400 mt-4 mb-2">
                No projects found
              </Text16Bold>
              <Text14 className="text-gray-400 text-center">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Create your first project to get started"}
              </Text14>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProjectsScreen;