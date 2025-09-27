import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import {
  Text12,
  Text14,
  Text16Bold,
  Text20,
} from "../../components/ui/Typography";

const MaterialDetails = () => {
  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4 pt-6 "
      >
        {/* Header Section */}
        <View className="relative">
          {/* Background Image */}
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop",
            }}
            className="w-full h-52 rounded-2xl"
          />

          {/* Back Button */}
          <TouchableOpacity className="absolute top-4 left-4 bg-white/80 p-2 rounded-full">
            <AntDesign name="arrowleft" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View className=" py-3">
          {/* Title + SKU */}
          <Text20> Carrara Marble </Text20>
          <Text14> SKU: CM-2457 </Text14>

          {/* Supplier */}
          <View className="mt-3 p-3 border border-gray-200 rounded-xl">
            <Text16Bold>Stone Legends Inc.</Text16Bold>
            <Text14>Premium natural stone supplier</Text14>
          </View>

          {/* Attributes */}
          <View className="flex-row justify-between mt-4">
            <View>
              <Text14>Finish</Text14>
              <Text16Bold>Polished</Text16Bold>
            </View>
            <View>
              <Text14>Thickness</Text14>
              <Text16Bold>2 cm</Text16Bold>
            </View>
            <View>
              <Text14>Origin</Text14>
              <Text16Bold>Italy</Text16Bold>
            </View>
            <View>
              <Text14>Maintenance</Text14>
              <Text16Bold>Low</Text16Bold>
            </View>
          </View>

          {/* Rating */}
          <View className="flex-row items-center mt-4">
            {[...Array(4)].map((_, i) => (
              <AntDesign key={i} name="star" size={18} color="#FFD700" />
            ))}
            <AntDesign name="staro" size={18} color="#FFD700" />
            <Text14 className="ml-2">4.5</Text14>
          </View>

          {/* Description */}
          <View className="mt-4">
            <Text16Bold>Description</Text16Bold>
            <Text14 className="mt-1">
              Carrara Marble is a high-end natural stone known for its
              white-and-blue-gray background and delicate veining. This premium
              material is ideal for countertops, flooring, and accent walls. Its
              timeless elegance adds sophistication to any space.
            </Text14>
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
                <View
                  key={index}
                  className="px-3 py-2 rounded-full bg-gray-100"
                >
                  <Text12>{item}</Text12>
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
                  className="w-[30%] p-2 border border-gray-200 rounded-xl items-center"
                >
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1618219941780-5a1fcd508c45",
                    }}
                    className="w-full h-20 rounded-lg"
                  />
                  <Text14 className="mt-2">{item}</Text14>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Button */}
        <View className="px-4 py-6">
          <Button>Add to my materials</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MaterialDetails;
