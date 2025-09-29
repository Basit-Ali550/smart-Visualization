// import { useState } from "react";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import Ai from "../../assets/Icon/Ai.svg";
// import Button from "../../components/ui/Button";
// const DesignStylesScreen = () => {
//   const [selectedStyle, setSelectedStyle] = useState(null);

//   const stylesData = [
//     { id: 1, name: "Modern Living Room", date: "Today" },
//     { id: 2, name: "Modern Living Room", date: "Today" },
//     { id: 3, name: "Modern Living Room", date: "Today" },
//     { id: 4, name: "Modern Living Room", date: "Today" },
//     { id: 5, name: "Modern Living Room", date: "Today" },
//     { id: 6, name: "Modern Living Room", date: "Today" },
//     { id: 7, name: "Modern Living Room", date: "Today" },
//     { id: 8, name: "Modern Living Room", date: "Today" },
//   ];

//   return (
//     <View className="flex-1 ">
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       >
//         {/* AI Suggestion Box */}
//         <View className="bg-[#0461A6] p-4 my-6 overflow-hidden rounded-2xl">
//           <View className="flex-row  gap-3 mb-4">
//             <Ai />
//             <View>
//               <Text className="text-[#FFFFFF] text-[16px] font-semibold mb-1">
//                 Not sure which style to choose?
//               </Text>
//               <Text className="text-[#F5F6FA] text-wrap text-[14px] mb-3">
//                 Our AI can suggest the perfect {"\n"} style for your space
//               </Text>
//             </View>
//           </View>
//           <Button
//             variant="alpha"
//             onPress={() => console.log("AI Suggest style")}
//           >
//             Suggested a style
//           </Button>
//         </View>

//         {/* Popular Styles */}
//         <Text className="text-[18px] font-semibold text-black mb-3">
//           Popular Design Styles
//         </Text>

//         <View className="flex-row flex-wrap justify-between">
//           {stylesData.map((item) => (
//             <TouchableOpacity
//               key={item.id}
//               onPress={() => setSelectedStyle(item.id)}
//               activeOpacity={1} // Yeh line add karen - opacity change nahi hoga
//               className={`w-[48%] mb-4 h-[160px] box-border relative rounded-xl overflow-hidden border ${
//                 selectedStyle === item.id
//                   ? "border-[#0461A6] border-[1px]"
//                   : "border-[#fff] border-[1px]"
//               }`}
//             >
//               <Image
//                 source={{
//                   uri: "https://picsum.photos/200/150",
//                 }}
//                 className="w-full h-[160px]"
//               />
//               <View className="absolute bottom-0 p-2 bg-gradient-to-t from-black via-black via-50% to-white/0">
//                 <Text className="text-[14px] font-medium text-white">
//                   {item.name}
//                 </Text>
//                 <Text className="text-[12px] text-gray-300">
//                   Last edited: {item.date}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>

//       {/* Continue Button (Bottom fixed) */}
//       <View className="absolute bottom-4 w-full">
//         <Button
//           onPress={() => console.log("Continue to color")}
//           className="w-full"
//         >
//           Continue to color
//         </Button>
//       </View>
//     </View>
//   );
// };

// export default DesignStylesScreen;

import { Feather } from "@expo/vector-icons"; // 👈 make sure installed
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ai from "../../assets/Icon/Ai.svg";
import Back from "../../assets/images/back.svg";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { Text12 } from "../../components/ui/Typography";
const DesignStylesScreen = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const router = useRouter();
  const stylesData = [
    { id: 1, name: "Modern Living Room", date: "Today" },
    { id: 2, name: "Modern Living Room", date: "Today" },
    { id: 3, name: "Modern Living Room", date: "Today" },
    { id: 4, name: "Modern Living Room", date: "Today" },
    { id: 5, name: "Modern Living Room", date: "Today" },
    { id: 6, name: "Modern Living Room", date: "Today" },
    { id: 7, name: "Modern Living Room", date: "Today" },
    { id: 8, name: "Modern Living Room", date: "Today" },
  ];

  return (
    <View className="flex-1 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="mt-6">
          <Header
            left={<Back />}
            onLeftPress={() => router.back()}
            title="Select Style"
            right={""}
            onRightPress={() => setIsModalVisible(true)}
            rightWidth={60}
          />
        </View>
        {/* AI Suggestion Box */}
        <View className="bg-[#0461A6] p-4 mb-6 overflow-hidden rounded-2xl">
          <View className="flex-row  gap-3 mb-4">
            <Ai />
            <View>
              <Text className="text-[#FFFFFF] text-[16px] font-semibold mb-1">
                Not sure which style to choose?
              </Text>
              <Text className="text-[#F5F6FA] text-wrap text-[14px] mb-3">
                Our AI can suggest the perfect {"\n"} style for your space
              </Text>
            </View>
          </View>
          <Button
            variant="alpha"
            onPress={() => console.log("AI Suggest style")}
          >
            Suggested a style
          </Button>
        </View>

        {/* Popular Styles */}
        <Text className="text-[18px] font-semibold text-black ">
          Popular Design Styles
        </Text>
        <Text12 className={"mb-3"}>
          Select a style to visualize your space
        </Text12>
        <View className="flex-row flex-wrap justify-between">
          {stylesData.map((item) => {
            const isSelected = selectedStyle === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedStyle(item.id)}
                activeOpacity={1}
                className={`w-[48%] mb-4 h-[160px] relative rounded-xl overflow-hidden border ${
                  isSelected
                    ? "border-[#0461A6] border-[1px]"
                    : "border-[#fff] border-[1px]"
                }`}
              >
                <Image
                  source={{
                    uri: "https://picsum.photos/200/150",
                  }}
                  className="w-full h-[160px]"
                />

                {/* ✅ Checkmark on selected */}
                {isSelected && (
                  <View className="absolute top-2 right-2 flex justify-center items-center w-5 h-5 bg-[#0461A6] rounded-full">
                    <Feather name="check" size={14} color="#FFFFFF" />
                  </View>
                )}

                {/* Gradient footer */}
                <View className="absolute bottom-0 p-2 bg-gradient-to-t from-black via-black via-50% to-white/0">
                  <Text className="text-[14px] font-medium text-white">
                    {item.name}
                  </Text>
                  <Text className="text-[12px] text-gray-300">
                    Last edited: {item.date}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Continue Button (Bottom fixed) */}
      <View className="absolute bottom-4 w-full">
        <Button
          onPress={() => router.push("Pages/RecommendedStyles")}
          className="w-full"
        >
          Continue to color
        </Button>
      </View>
    </View>
  );
};

export default DesignStylesScreen;
