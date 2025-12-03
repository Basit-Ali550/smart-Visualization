// pages/user-materials.tsx
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
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

// Skeleton Card
const MaterialCardSkeleton = () => (
  <View
    className="bg-white rounded-[12px] overflow-hidden mb-4 border border-gray-200 shadow-sm"
    style={{ width: CARD_WIDTH }}
  >
    <View className="w-full h-[120px] bg-gray-200 rounded-t-[8px]" />
    <View className="p-3">
      <View className="h-4 bg-gray-300 rounded w-4/5 mb-2" />
      <View className="h-3 bg-gray-300 rounded w-3/5 mb-2" />
      <View className="flex-row items-center justify-between">
        <View className="h-4 bg-gray-300 rounded w-10" />
        <View className="flex-row items-center space-x-1">
          <View className="w-3 h-3 bg-gray-300 rounded" />
          <View className="h-3 bg-gray-300 rounded w-8" />
        </View>
      </View>
    </View>
  </View>
);

const UserMaterialsScreen = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [allMaterials, setAllMaterials] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, loading, error } = useGet(
    `/api/v1/user/materials?page=${page}&page_size=20`
  );

  // Combine materials from multiple pages
  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (page === 1) {
        setAllMaterials(data);
      } else {
        setAllMaterials((prev) => [...prev, ...data]);
      }

      // If less than 20 items returned → no more pages
      setHasMore(data.length === 20);
      setIsLoadingMore(false);
    }
  }, [data, page]);

  // Reset when navigating back or refreshing
  const refresh = () => {
    setPage(1);
    setAllMaterials([]);
    setHasMore(true);
  };

  const loadMore = useCallback(() => {
    if (!loading && !isLoadingMore && hasMore && allMaterials.length >= 20) {
      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [loading, isLoadingMore, hasMore, allMaterials.length]);

  const handleMaterialPress = (materialId) => {
    router.push({
      pathname: "/pages/MaterialDetails",
      params: { materialId },
    });
  };

  const renderMaterial = ({ item }) => {
    const material = item.material;

    return (
      <TouchableOpacity
        onPress={() => handleMaterialPress(material.id)}
        className="bg-white rounded-[12px] shadow-sm overflow-hidden mb-4 border border-gray-200"
        style={{ width: CARD_WIDTH }}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: material.thumbnail_url }}
          className="w-full h-[120px] rounded-t-[8px]"
          resizeMode="cover"
        />
        <View className="p-3">
          <Text
            className="font-semibold text-[#000000] text-sm"
            numberOfLines={1}
          >
            {material.name}
          </Text>
          <Text12 className="text-[#A5A5A5] mt-1" numberOfLines={1}>
            {material.material_type}
          </Text12>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-[#0461A6] font-bold text-sm">
              ${material.price_per_sqft}/sqft
            </Text>
            <View className="flex-row items-center">
              <AntDesign name="star" size={14} color="#FFC900" />
              <Text className="text-[#464646] text-xs ml-1 font-medium">
                {material.rating}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View className="py-6">
        <ActivityIndicator size="small" color="#0461A6" />
        <Text12 className="text-center text-gray-500 mt-2">
          Loading more materials...
        </Text12>
      </View>
    );
  };

  // Initial Loading Skeleton
  if (loading && page === 1) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="pt-6 pb-4">
          <Text20 className="text-2xl font-bold text-[#464646]">
            My Materials
          </Text20>
        </View>
        <View className="flex-1 px-4">
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={() => <MaterialCardSkeleton />}
            keyExtractor={(_, i) => i.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Error State
  if (error && page === 1) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <Feather name="alert-triangle" size={64} color="#EF4444" />
        <Text16Bold className="text-red-500 mt-4">
          Failed to load materials
        </Text16Bold>
        <Text14 className="text-gray-600 text-center mt-2">
          {error.message || "Something went wrong"}
        </Text14>
        <Button onPress={refresh} variant="primary" className="mt-6">
          Try Again
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="pt-6 pb-4 px-4 border-b border-gray-200 bg-white">
        <View className="flex-row justify-between items-center">
          <Text20 className="text-2xl font-bold text-[#464646]">
            My Materials
          </Text20>
          <Text14 className="text-[#0461A6] font-medium">
            {allMaterials.length} item{allMaterials.length !== 1 ? "s" : ""}
          </Text14>
        </View>
      </View>

      {allMaterials.length > 0 ? (
        <FlatList
          data={allMaterials}
          renderItem={renderMaterial}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            // paddingHorizontal: 16,
          }}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooter}
        />
      ) : (
        <View className="flex-1 justify-center items-center px-8">
          <Feather name="heart" size={72} color="#D1D5DB" />
          <Text16Bold className="text-gray-500 mt-6 text-center">
            No materials added yet
          </Text16Bold>
          <Text14 className="text-gray-400 text-center mt-3">
            Browse the catalog and add your favorite materials here for quick
            access
          </Text14>
          <Button
            onPress={() => router.push("/pages/SelectMaterials")}
            variant="primary"
            className="mt-8"
          >
            Browse Materials
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserMaterialsScreen;
