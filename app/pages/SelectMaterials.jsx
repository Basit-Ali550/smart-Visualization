import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import Button from "../../components/ui/Button";
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

// Skeleton Loading Component for Material Cards
const MaterialCardSkeleton = () => (
  <View
    className="bg-gray-100 rounded-[12px] overflow-hidden mb-4 border border-gray-200"
    style={{ width: CARD_WIDTH }}
  >
    {/* Image Skeleton */}
    <View className="w-full h-[120px] bg-gray-200 rounded-t-[8px]" />

    {/* Content Skeleton */}
    <View className="p-2">
      <View className="flex-row justify-between mb-2">
        <View className="h-4 bg-gray-300 rounded w-3/5" />
        <View className="flex-row items-center space-x-1.5">
          <View className="h-3 w-3 bg-gray-300 rounded" />
          <View className="h-4 bg-gray-300 rounded w-6" />
        </View>
      </View>
      <View className="h-3 bg-gray-300 rounded w-4/5 mb-1" />
      <View className="h-3 bg-gray-300 rounded w-3/4" />
    </View>
  </View>
);

// Skeleton array for loading state
const skeletonData = Array.from({ length: 4 }, (_, index) => ({
  id: `skeleton-${index}`,
}));

const SelectMaterialsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [page, setPage] = useState(1);
  const [allMaterials, setAllMaterials] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const router = useRouter();

  const {
    data: materialData,
    loading,
    error,
  } = useGet(`/api/v1/materials?page=${page}&page_size=6`);

  // Filter function for materials
  const filterMaterial = (material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.material_type.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    switch (activeFilter) {
      case "interior":
        matchesFilter = material.material_type
          .toLowerCase()
          .includes("interior");
        break;
      case "exterior":
        matchesFilter = material.material_type
          .toLowerCase()
          .includes("exterior");
        break;
      case "recent":
        const projectDate = new Date(material.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesFilter = projectDate >= weekAgo;
        break;
      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  };

  // Handle data from API
  useEffect(() => {
    if (materialData?.materials) {
      const newMaterials = materialData.materials;

      // Check if any new materials match the current filter/search
      const addedMatching = newMaterials.some(filterMaterial);

      if (page === 1) {
        setAllMaterials(newMaterials);
      } else {
        setAllMaterials((prev) => [...prev, ...newMaterials]);
      }

      // Set hasMore primarily based on items returned
      let newHasMore = newMaterials.length >= 6;

      // If total_pages is available, use it
      if (materialData.total_pages) {
        newHasMore = page < materialData.total_pages;
      }

      setHasMore(newHasMore);

      // If no matching items added on subsequent pages, stop loading more
      if (page > 1 && !addedMatching) {
        setHasMore(false);
      }
    }
  }, [materialData, page, searchQuery, activeFilter]); // Dependencies include filters to re-evaluate

  // Handle errors
  useEffect(() => {
    if (error) {
      setIsLoadingMore(false);
      setHasMore(false);
    }
  }, [error]);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setPage(1);
    setAllMaterials([]);
    setHasMore(true);
  }, [activeFilter, searchQuery]);

  const transformedMaterials = allMaterials.map((material) => ({
    id: material.id,
    price_per_sqft: `$${material.price_per_sqft}/sq ft`,
    material_type: material.material_type,
    thumbnail_url: material.thumbnail_url,
    quality: "High-quality image",
    createdAt: material.created_at || "2024-01-15",
    category: material.material_type,
    title: material.name,
    image: material.thumbnail_url,
    rating: material.rating,
    is_favorite: material.is_favorite,
  }));

  const filteredMaterials = transformedMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.material_type.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    switch (activeFilter) {
      case "interior":
        matchesFilter = material.material_type
          .toLowerCase()
          .includes("interior");
        break;
      case "exterior":
        matchesFilter = material.material_type
          .toLowerCase()
          .includes("exterior");
        break;
      case "recent":
        const projectDate = new Date(material.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesFilter = projectDate >= weekAgo;
        break;
      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });

  const getUniqueKey = (item, index) => {
    return `${item.id}-${index}`;
  };

  // Load more data when reaching end of list
  const loadMore = useCallback(() => {
    if (!loading && !isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [loading, isLoadingMore, hasMore]);

  // Reset loading more state when data is loaded
  useEffect(() => {
    if (!loading) {
      setIsLoadingMore(false);
    }
  }, [loading]);

  const MaterialGridCard = ({ material }) => {
    const isSelected = material.id === selectedMaterialId;

    return (
      <TouchableOpacity
        onPress={() => setSelectedMaterialId(material.id)}
        className={`bg-white rounded-[12px] shadow-sm overflow-hidden mb-4 ${
          isSelected ? "border-2 border-[#0461A6]" : "border border-gray-200"
        }`}
        style={{ width: CARD_WIDTH }}
      >
        <Image
          source={{ uri: material.image }}
          className="w-full h-[120px] rounded-t-[8px]"
          resizeMode="cover"
        />
        {isSelected && (
          <View className="absolute top-2 right-2 flex justify-center items-center w-5 h-5 bg-[#0461A6] rounded-full">
            <Feather name="check" size={14} color="#FFFFFF" />
          </View>
        )}
        <View className="p-2">
          <View className="flex-row flex justify-between">
            <Text
              className="font-semibold text-[#000000] text-sm mt-1"
              numberOfLines={1}
            >
              {material.title}
            </Text>
            <View className="flex-row items-center space-x-1.5">
              <AntDesign name="star" size={12} color="#FFC900" />
              <Text className="font-semibold text-[#000000] text-sm">
                {material.rating}
              </Text>
            </View>
          </View>
          <Text12
            className="text-[#A5A5A5] text-[10px] font-normal"
            numberOfLines={1}
          >
            {material.price_per_sqft}
          </Text12>
          <Text12
            className="text-[#A5A5A5] text-[10px] font-normal"
            numberOfLines={1}
          >
            {material.quality}
          </Text12>
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
      <Text14 className={isActive ? "text-white" : "text-[#464646]"}>
        {filter.label}
      </Text14>
    </TouchableOpacity>
  );

  // Footer component for loading indicator
  const ListFooterComponent = () => {
    if (!isLoadingMore || !hasMore) return null;

    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#0461A6" />
        <Text12 className="text-center text-gray-500 mt-2">
          Loading more materials...
        </Text12>
      </View>
    );
  };

  // Render skeleton loading state for initial load
  if (loading && page === 1) {
    return (
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Header Section */}
          <View className="pt-2 pb-4">
            <View className="flex-row justify-center items-center mb-6">
              <Text20 className="text-[18px] text-[#464646] text-center font-bold">
                Material Catalog
              </Text20>
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
                  <View
                    key={filter.id}
                    className="px-5 py-2.5 rounded-xl bg-gray-200 mr-2"
                  >
                    <View className="h-4 w-12 bg-gray-300 rounded" />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Title Section Skeleton */}
          <View className="mb-4">
            <View className="h-6 bg-gray-300 rounded w-2/5 mb-2" />
            <View className="h-4 bg-gray-300 rounded w-3/4" />
          </View>

          {/* Skeleton Grid */}
          <View className="pt-4 pb-8">
            <FlatList
              data={skeletonData}
              renderItem={() => <MaterialCardSkeleton />}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />

            {/* Button Skeleton */}
            <View className="mt-4">
              <View className="w-full h-12 bg-gray-300 rounded-lg" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (error && page === 1) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Error loading materials: {error.message}</Text>
        <Button
          onPress={() => router.back()}
          variant="primary"
          className="mt-4"
        >
          Go Back
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <View className="pt-2 pb-4">
          <View className="flex-row justify-center items-center mb-6">
            <Text20 className="text-[18px] text-[#464646] text-center font-bold">
              Material Catalog
            </Text20>
          </View>

          {/* Search Bar */}
          <View className="mb-4">
            <View className="flex-row items-center bg-white px-3 rounded-xl py-2.5">
              <Feather name="search" size={20} color="#767C8C" />
              <TextInput
                placeholder="Search materials..."
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

          {/* <View className="mb-2">
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
          </View> */}
        </View>

        <View className="mb-4">
          <Text16Bold>Available Materials</Text16Bold>
          <Text12 className="mt-1">
            Select materials to apply to your design
          </Text12>
        </View>

        <View className="flex-1 pt-4 pb-8">
          {filteredMaterials.length > 0 ? (
            <FlatList
              data={filteredMaterials}
              renderItem={({ item }) => <MaterialGridCard material={item} />}
              keyExtractor={(item, index) => getUniqueKey(item, index)}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={ListFooterComponent}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : hasMore || loading || isLoadingMore ? (
            <View className="items-center justify-center py-16">
              <ActivityIndicator size="large" color="#0461A6" />
              <Text16Bold className="text-gray-500 mt-4">
                Loading materials...
              </Text16Bold>
            </View>
          ) : (
            <View className="items-center justify-center py-16">
              <Feather name="folder" size={64} color="#D1D5DB" />
              <Text16Bold className="text-gray-400 mt-4 mb-2">
                No materials found
              </Text16Bold>
              <Text14 className="text-gray-400 text-center">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "No materials available"}
              </Text14>
            </View>
          )}

          <View className="mt-4 px-4">
            <Button
              onPress={() => {
                if (selectedMaterialId) {
                  router.push({
                    pathname: "pages/MaterialDetails",
                    params: { materialId: selectedMaterialId },
                  });
                } else {
                  alert("Please select a material first");
                }
              }}
              variant="primary"
              className="w-full"
              disabled={!selectedMaterialId}
            >
              {selectedMaterialId
                ? "Visualize my design"
                : "Select a material to continue"}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectMaterialsScreen;
