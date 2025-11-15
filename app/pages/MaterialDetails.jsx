import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../../assets/images/back.svg";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { Text12, Text14, Text16Bold } from "../../components/ui/Typography";
import useGet from "../../hooks/useGet";

const Frame5 = require("../../assets/images/Frame 5.png");

// Skeleton Components
const ImageSkeleton = () => (
  <View className="w-full h-[140px] bg-gray-200 rounded-2xl" />
);

const TextSkeleton = ({ width = "100%", height = 16, className = "" }) => (
  <View 
    className={`bg-gray-300 rounded ${className}`} 
    style={{ width, height }}
  />
);

const AttributeSkeleton = () => (
  <View className="w-[48%] bg-white mb-4 rounded-xl py-3 px-4">
    <TextSkeleton width="60%" height={14} className="mb-1" />
    <TextSkeleton width="80%" height={18} />
  </View>
);

const SupplierSkeleton = () => (
  <View className="mt-3 p-4 flex flex-row gap-4 items-center bg-white rounded-xl">
    <View className="w-10 h-10 bg-gray-300 rounded-[8px]" />
    <View className="flex-1">
      <TextSkeleton width="70%" height={18} className="mb-1" />
      <TextSkeleton width="50%" height={14} />
    </View>
  </View>
);

const CommonUseSkeleton = () => (
  <View className="p-1.5 rounded-[4px] bg-white">
    <TextSkeleton width={80} height={16} />
  </View>
);

const SimilarMaterialSkeleton = () => (
  <View className="w-[30%] border border-white bg-white overflow-hidden rounded-[8px] items-center">
    <View className="w-full h-16 bg-gray-300" />
    <TextSkeleton width={60} height={16} className="my-2" />
  </View>
);

// Main Component
const MaterialDetails = () => {
  const router = useRouter();
  const { materialId } = useLocalSearchParams();
  
  // Fetch main material details
  const { data: materialData, loading, error } = useGet(`/api/v1/materials/${materialId}`);
  
  // Fetch similar materials
  const { data: similarMaterialsData, loading: similarLoading } = useGet(
    materialId ? `/api/v1/materials/${materialId}/similar?limit=3` : null
  );

  // Fetch common uses
  const { data: commonUsesData, loading: commonUsesLoading } = useGet(
    materialId ? `/api/v1/materials/${materialId}/common-uses` : null
  );

  const material = materialData || {};
  const similarMaterials = similarMaterialsData || [];
  const commonUses = commonUsesData || [];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AntDesign key={`full-${i}`} name="star" size={20} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<AntDesign key="half" name="star" size={20} color="#FFD700" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<AntDesign key={`empty-${i}`} name="star" size={20} color="#EBEDF0" />);
    }

    return stars;
  };

  const handleSimilarMaterialPress = (similarMaterialId) => {
    router.push({
      pathname: "pages/MaterialDetails",
      params: { materialId: similarMaterialId }
    });
  };

  // Loading state with skeleton
  if (loading) {
    return (
      <SafeAreaView className="flex-1">
        <View className="">
          <Header
            left={<Back />}
            onLeftPress={() => router.back()}
            title="Material Details"
            right={""}
            onRightPress={() => {}}
            rightWidth={60}
          />
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Image Skeleton */}
          <View className="relative">
            <ImageSkeleton />
            <View className="absolute right-3 top-3 bg-white/40 blur-sm p-2 rounded-full">
              <View className="w-6 h-6 bg-gray-300 rounded" />
            </View>
          </View>

          <View className="py-3">
            {/* Title + SKU Skeleton */}
            <TextSkeleton width="60%" height={20} className="mb-2" />
            <TextSkeleton width="40%" height={14} className="mb-1" />
            <TextSkeleton width="50%" height={14} className="mb-3" />

            {/* Supplier Skeleton */}
            <SupplierSkeleton />

            {/* Attributes Skeleton */}
            <View className="flex-row flex-wrap justify-between mt-4">
              <AttributeSkeleton />
              <AttributeSkeleton />
              <AttributeSkeleton />
              <AttributeSkeleton />
            </View>

            {/* Rating Skeleton */}
            <View className="flex-row items-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <View key={i} className="w-5 h-5 bg-gray-300 rounded" />
              ))}
              <TextSkeleton width={30} height={16} className="ml-2" />
            </View>

            {/* Description Skeleton */}
            <View className="mt-4">
              <TextSkeleton width="40%" height={18} className="mb-2" />
              <TextSkeleton width="100%" height={14} className="mb-1" />
              <TextSkeleton width="100%" height={14} className="mb-1" />
              <TextSkeleton width="80%" height={14} className="mb-1" />
              <TextSkeleton width="90%" height={14} className="mb-1" />
              <TextSkeleton width="70%" height={14} />
            </View>

            {/* Common Uses Skeleton */}
            <View className="mt-5">
              <TextSkeleton width="50%" height={18} className="mb-2" />
              <View className="flex-row flex-wrap mt-2 gap-2">
                <CommonUseSkeleton />
                <CommonUseSkeleton />
                <CommonUseSkeleton />
                <CommonUseSkeleton />
              </View>
            </View>

            {/* Material Type Skeleton */}
            <View className="mt-4">
              <TextSkeleton width="45%" height={18} className="mb-2" />
              <View className="self-start">
                <CommonUseSkeleton />
              </View>
            </View>

            {/* Similar Materials Skeleton */}
            <View className="mt-6">
              <TextSkeleton width="55%" height={18} className="mb-3" />
              <View className="flex-row justify-between">
                <SimilarMaterialSkeleton />
                <SimilarMaterialSkeleton />
                <SimilarMaterialSkeleton />
              </View>
            </View>
          </View>

          {/* Button Skeleton */}
          <View className="mb-6">
            <View className="w-full h-12 bg-gray-300 rounded-lg" />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView className="flex-1">
        <View className="">
          <Header
            left={<Back />}
            onLeftPress={() => router.back()}
            title="Material Details"
            right={""}
            onRightPress={() => {}}
            rightWidth={60}
          />
        </View>
        <View className="flex-1 justify-center items-center">
          <Text>Error loading material: {error.message}</Text>
          <Button onPress={() => router.back()} variant="primary" className="mt-4">
            Go Back
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  // If no material data found
  if (!material.id) {
    return (
      <SafeAreaView className="flex-1">
        <View className="">
          <Header
            left={<Back />}
            onLeftPress={() => router.back()}
            title="Material Details"
            right={""}
            onRightPress={() => {}}
            rightWidth={60}
          />
        </View>
        <View className="flex-1 justify-center items-center">
          <Text>Material not found</Text>
          <Button onPress={() => router.back()} variant="primary" className="mt-4">
            Go Back
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 ">
        {/* Header Section */}
        <View className="">
          <Header
            left={<Back />}
            onLeftPress={() => router.back()}
            title="Material Details"
            right={""}
            onRightPress={() => {}}
            rightWidth={60}
          />
        </View>

        {/* Material Image */}
        <View className="relative">
          <Image 
            source={{ uri: material.image_url || material.thumbnail_url }} 
            className="w-full h-[140px] rounded-2xl" 
            defaultSource={Frame5}
          />

          <View className="absolute right-3 top-3 bg-white/40 blur-sm p-2 rounded-full">
            <AntDesign 
              name={material.is_favorite ? "heart" : "hearto"} 
              size={24} 
              color={material.is_favorite ? "#E02227" : "#FFFFFF"} 
            />
          </View>
        </View>

        <View className="py-3">
          {/* Title + SKU */}
          <Text16Bold>{material.name}</Text16Bold>
          <Text12 className="mt-2">SKU: {material.sku}</Text12>
          <Text12 className="mt-1">Price: ${material.price_per_sqft}/sq ft</Text12>

          {/* Supplier */}
          <View className="mt-3 p-4 flex flex-row gap-4 items-center bg-white rounded-xl">
            <Image 
              source={{ uri: material.supplier_logo_url }} 
              className="w-10 h-10 rounded-[8px]" 
              defaultSource={Frame5}
            />
            <View>
              <Text16Bold>{material.supplier_name}</Text16Bold>
              <Text14>Premium material supplier</Text14>
            </View>
          </View>

          {/* Attributes */}
          <View className="flex-row flex-wrap justify-between mt-4">
            <View className="w-[48%] bg-white mb-4 rounded-xl py-3 px-4">
              <Text12>Finish</Text12>
              <Text16Bold>{material.finish}</Text16Bold>
            </View>

            <View className="w-[48%] mb-4 bg-white rounded-xl py-3 px-4">
              <Text12>Thickness</Text12>
              <Text16Bold>{material.thickness}</Text16Bold>
            </View>

            <View className="w-[48%] mb-4 bg-white rounded-xl py-3 px-4">
              <Text12>Origin</Text12>
              <Text16Bold>{material.origin}</Text16Bold>
            </View>

            <View className="w-[48%] mb-4 bg-white rounded-xl py-3 px-4">
              <Text12>Maintenance</Text12>
              <Text16Bold>{material.maintenance}</Text16Bold>
            </View>
          </View>

          {/* Rating */}
          <View className="flex-row items-center gap-1 mt-4">
            {renderStars(material.rating)}
            <Text14 className="ml-2">{material.rating}</Text14>
          </View>

          {/* Description */}
          <View className="mt-4">
            <Text16Bold>Description</Text16Bold>
            <Text12 className="mt-1">
              {material.description}
            </Text12>
          </View>

          {/* Common Uses */}
          <View className="mt-5">
            <Text16Bold>Common Uses</Text16Bold>
            {commonUsesLoading ? (
              <View className="flex-row flex-wrap mt-2 gap-2">
                <CommonUseSkeleton />
                <CommonUseSkeleton />
                <CommonUseSkeleton />
                <CommonUseSkeleton />
              </View>
            ) : commonUses.length > 0 ? (
              <View className="flex-row flex-wrap mt-2 gap-2">
                {commonUses.map((use, index) => (
                  <View key={use.id} className="p-1.5 rounded-[4px] bg-[#FFFFFF]">
                    <Text className="text-[#464646] text-sm font-medium">
                      {use.name}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text12 className="text-gray-500 mt-2">No common uses specified</Text12>
            )}
          </View>

          {/* Material Type */}
          <View className="mt-4">
            <Text16Bold>Material Type</Text16Bold>
            <View className="mt-2">
              <View className="p-1.5 rounded-[4px] bg-[#FFFFFF] self-start">
                <Text className="text-[#464646] text-sm font-medium">
                  {material.material_type}
                </Text>
              </View>
            </View>
          </View>

          {/* Similar Materials */}
          <View className="mt-6">
            <Text16Bold>Similar Materials</Text16Bold>
            <View className="flex-row justify-between mt-3">
              {similarLoading ? (
                // Show skeleton while loading similar materials
                <>
                  <SimilarMaterialSkeleton />
                  <SimilarMaterialSkeleton />
                  <SimilarMaterialSkeleton />
                </>
              ) : similarMaterials.length > 0 ? (
                // Show actual similar materials
                similarMaterials.map((item, idx) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSimilarMaterialPress(item.id)}
                    className="w-[30%] border border-white bg-white overflow-hidden rounded-[8px] items-center"
                  >
                    <Image 
                      source={{ uri: item.thumbnail_url }} 
                      className="w-full h-16" 
                      defaultSource={Frame5}
                    />
                    <Text className="text-[#000000] font-medium text-xs py-2 text-center">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                // Fallback if no similar materials
                <Text12 className="text-gray-500">No similar materials found</Text12>
              )}
            </View>
          </View>
        </View>

        {/* Button */}
        <View className="mb-6">
          <Button onPress={() => router.push("Pages/SaveExportDesign")}>
            Add to my materials
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MaterialDetails;