import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../../assets/images/back.svg";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { Text12, Text14, Text16Bold } from "../../components/ui/Typography";
const Frame5 = require("../../assets/images/Frame 5.png");
const MaterialDetails = () => {
  const router = useRouter();
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
            onRightPress={() => setIsModalVisible(true)}
            rightWidth={60}
          />
        </View>
        <View className="relative">
          <Image source={Frame5} className="w-full h-[140px] rounded-2xl" />

          <View className="absolute right-3 top-3 bg-white/40 blur-sm p-2 rounded-full">
            <AntDesign name="heart" size={24} color="#E02227" />{" "}
          </View>
        </View>

        <View className=" py-3">
          {/* Title + SKU */}
          <Text16Bold> Carrara Marble </Text16Bold>
          <Text12 className="mt-2"> SKU: CM-2457 </Text12>

          {/* Supplier */}
          <View className="mt-3 p-4 flex flex-row gap-4 items-center  bg-white rounded-xl">
            <Image source={Frame5} className="w-10 h-10 rounded-[8px]" />
            <View>
              <Text16Bold>Stone Legends Inc.</Text16Bold>
              <Text14>Premium natural stone supplier</Text14>
            </View>
          </View>

          {/* Attributes */}
          <View className="flex-row flex-wrap justify-between mt-4">
            <View className="w-[48%] bg-white mb-4 rounded-xl py-3 px-4">
              <Text12>Finish</Text12>
              <Text16Bold>Polished</Text16Bold>
            </View>

            <View className="w-[48%] mb-4 bg-white rounded-xl py-3 px-4">
              <Text12>Thickness</Text12>
              <Text16Bold>2 cm</Text16Bold>
            </View>

            <View className="w-[48%] mb-4 bg-white rounded-xl py-3 px-4">
              <Text12>Origin</Text12>
              <Text16Bold>Italy</Text16Bold>
            </View>

            <View className="w-[48%] mb-4 bg-white rounded-xl py-3 px-4">
              <Text12>Maintenance</Text12>
              <Text16Bold>Low</Text16Bold>
            </View>
          </View>

          {/* Rating */}
          <View className="flex-row items-center gap-1 mt-4">
            {[...Array(4)].map((_, i) => (
              <AntDesign key={i} name="star" size={20} color="#FFD700" />
            ))}
            <AntDesign name="star" size={20} color="#EBEDF0" />
            <Text14 className="ml-2">4.5</Text14>
          </View>

          {/* Description */}
          <View className="mt-4">
            <Text16Bold>Description</Text16Bold>
            <Text12 className="mt-1">
              Carrara Marble is a high-end natural stone known for its
              white-and-blue-gray background and delicate veining. This premium
              material is ideal for countertops, flooring, and accent walls. Its
              timeless elegance adds sophistication to any space.
            </Text12>
          </View>

          {/* Common Uses */}
          <View className="mt-5">
            <Text16Bold>Common Uses</Text16Bold>
            <View className="flex-row flex-wrap mt-2 gap-2">
              {[
                "Kitchen Countertops",
                "Bathroom Vanities",
                "Flooring",
                "Backsplashes",
                "Fireplace Surrounds",
              ].map((item, index) => (
                <View key={index} className="p-1.5 rounded-[4px] bg-[#FFFFFF]">
                  <Text className="text-[#464646] text-sm font-medium">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Similar Materials */}
          <View className="mt-6">
            <Text16Bold>Similar Materials</Text16Bold>
            <View className="flex-row justify-between mt-3">
              {["Calacatta", "Statuario", "Bianco"].map((item, idx) => (
                <View
                  key={idx}
                  className="w-[30%] border border-white bg-white overflow-hidden rounded-[8px] items-center"
                >
                  <Image source={Frame5} className="w-full h-16 " />
                  <Text className="text-[#000000] font-medium text-xs py-2">
                    {item}
                  </Text>
                </View>
              ))}
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
