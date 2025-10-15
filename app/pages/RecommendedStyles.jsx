import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ai from "../../assets/Icon/Ai.svg";
import Back from "../../assets/images/back.svg";
import Scandinavian from "../../assets/images/Scandinavian.png";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { Text12, Text16Bold } from "../../components/ui/Typography";
const RecommendedStyles = () => {
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();
  const styles = [
    {
      id: 1,
      title: "Scandinavian",
      desc: "Light, airy spaces with functional furniture",
      match: "94%",
      image: Scandinavian,
    },
    {
      id: 2,
      title: "Japanese Minimalism",
      desc: "Light, airy spaces with functional furniture",
      match: "94%",
      image: Scandinavian,
    },
    {
      id: 3,
      title: "Scandinavian",
      desc: "Light, airy spaces with functional furniture",
      match: "94%",
      image: Scandinavian,
    },
    {
      id: 4,
      title: "Modern",
      desc: "Sleek, clean lines with minimalist approach",
      match: "94%",
      image: Scandinavian,
    },
  ];

  const handleSelect = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <View className="flex-1 ">
      <View className="mt-6">
        <Header
          left={<Back />}
          onLeftPress={() => router.back()}
          title="Suggested a style"
          right={""}
          onRightPress={() => setIsModalVisible(true)}
          rightWidth={60}
        />
      </View>
      <Text16Bold>AI Style Recommendations</Text16Bold>
      <Text12>Our AI has analyzed your room and suggests these styles</Text12>

      {/* AI Analysis Card */}
      <View className="bg-[#0461A6] p-4 my-6 overflow-hidden rounded-2xl">
        <View className="flex-row  justify-between gap-3 mb-2">
          <View className="flex-row gap-3">
            <Ai />
            <Text className="text-[#FFFFFF] text-[16px] font-semibold mt-2">
              AI Analysis
            </Text>
          </View>
          <View>
            <Text className="text-[#FFFFFF] text-right text-[18px] font-semibold ">
              94%{" "}
            </Text>
            <Text className="text-[#F5F6FA] text-right text-[14px] ">
              Match Confidence
            </Text>
          </View>
        </View>
        <Text className="text-[#F5F6FA] text-sm font-normal ">
          Our AI has analyzed your room's dimensions, lighting, architectural
          features, and existing elements to recommend styles that would work
          best for your space.
        </Text>
      </View>

      {/* Recommended Styles */}
      <ScrollView className="mt-4">
        {styles.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={1}
              onPress={() => handleSelect(item.id)}
              className={`flex-row  p-4 rounded-xl mb-3 bg-[#FFFFFF] border ${
                isSelected ? "border-[#0461A6] " : "border-white"
              }`}
            >
              {/* Thumbnail */}
              <Image
                source={item.image}
                className="w-12 h-12 rounded-lg mr-3"
              />

              {/* Texts */}
              <View className="flex-1">
                <Text className="font-semibold text-[14px] text-[#000000]">
                  {item.title}
                </Text>
                <Text className="text-[13px] text-[#A5A5A5]">{item.desc}</Text>
                <Text className="text-[#20C375] text-[12px] font-medium">
                  {item.match} Match
                </Text>
              </View>

              {/* Selected Check */}
              {isSelected && (
                <View className="absolute top-2 right-2 flex justify-center items-center w-5 h-5 bg-[#0461A6] rounded-full">
                  <Feather name="check" size={14} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer Buttons */}
      <View className="flex-row justify-between mt-4">
        <View className="flex-1 mr-2">
          <Button variant="beta" onPress={() => console.log("Back to style")}>
            Back to style
          </Button>
        </View>
        <View className="flex-1 ml-2">
          <Button
            variant="primary"
            onPress={() => router.push("Pages/SelectColorsScreen")}
          >
            Continue to color
          </Button>
        </View>
      </View>
    </View>
  );
};

export default RecommendedStyles;
