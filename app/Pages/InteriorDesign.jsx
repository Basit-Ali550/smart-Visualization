import { Feather } from "@expo/vector-icons"; // Import Expo icon
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Back from "../../assets/images/back.svg";
// Import images using require
const Frame = require("../../assets/images/Frame.png");
const Frame1 = require("../../assets/images/Frame (1).png");
const Frame2 = require("../../assets/images/Frame (2).png");
const Frame4 = require("../../assets/images/Frame (4).png");
// Your components
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import {
  Text12,
  Text14,
  Text16Bold,
  Text20,
} from "../../components/ui/Typography";

// Mock data for room types
const roomTypes = [
  {
    id: 1,
    name: "Living Room",
    description: "Sofas, chairs and entertainment areas",
    image1: Frame,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Bedroom",
    description: "Beds, storage, and personal spaces",
    image1: Frame1,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Kitchen",
    description: "Cabinets, counters, and appliances",
    image1: Frame2,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Bathroom",
    description: "Vanities, showers, and fixtures",
    image1: Frame4,
    image:
      "https://images.unsplash.com/photo-1584621247940-688ce92e3e2e?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Dining Room",
    description: "Tables, chairs, and serving areas",
    image1: Frame2,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Home Office",
    description: "Desks, storage, and workspaces",
    image1: Frame2,
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=200&fit=crop",
  },
];

const ExteriorDesigncreen = () => {
  const navigation = useNavigation();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const router = useRouter();
  const handleContinue = () => {
    if (selectedRoom) {
      navigation.navigate("Pages/UploadPhoto");
    }
  };

  const RoomGridItem = ({ item, isSelected, onPress }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("Selected room:", item); // Debug log to confirm click
        onPress(item);
      }}
      className={`w-[48%] mb-4 bg-white rounded-[10px] border-[1px] p-4 ${
        isSelected ? "border-[#0461A6]" : "border-[#F5F6FA]"
      }`}
    >
      <View className="items-center">
        <View className="w-16 h-16 items-center justify-center mb-3">
          <Image
            source={item.image1} // Use fallback if image1 is invalid
            style={{
              width: 60,
              height: 60,
              resizeMode: "contain", // Ensure image fits within bounds
            }}
            onError={(error) =>
              console.log(
                `Failed to load image for ${item.name}:`,
                error.nativeEvent.error
              )
            }
          />
        </View>

        <Text12 className="text-center text-[#000] font-semibold mb-1">
          {item.name}
        </Text12>
        <Text className="text-[10px] text-[#A5A5A5] font-normal text-center text-xs">
          {item.description}
        </Text>

        {isSelected && (
          <View className="absolute top-2 right-2 flex justify-center items-center w-5 h-5 bg-[#0461A6] rounded-full ">
            <Feather name="check" size={14} color="#FFFFFF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <Header
          left={<Back />}
          onLeftPress={() => router.back()}
          title=""
          right={""}
          onRightPress={() => setIsModalVisible(true)}
          rightWidth={60}
        />
        <View className="pb-4">
          <View className="flex-row items-center mb-4">
            <View className="flex-1">
              <Text20 className="">Interior Design</Text20>
              <Text14 className="">
                Transform your indoor spaces with our design tools.
              </Text14>
            </View>
          </View>
        </View>

        {/* Room Selection Section */}
        <View className="p-4 rounded-xl bg-white mb-10">
          <View className="mb-8">
            <Text16Bold className="font-bold">Select Room Type</Text16Bold>
            <Text12 className="text-[#767C8C] mb-4">
              Choose the type of room you want to design.
            </Text12>

            {/* Room Type Grid */}
            <View className="flex-row flex-wrap justify-between">
              {roomTypes.map((room) => (
                <RoomGridItem
                  key={room.id}
                  item={room}
                  isSelected={selectedRoom?.id === room.id}
                  onPress={setSelectedRoom}
                />
              ))}
            </View>
          </View>
          <Button variant="primary" className="w-full" onPress={handleContinue}>
            Continue to style selection
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExteriorDesigncreen;

// import { AntDesign, Feather } from "@expo/vector-icons";
// import { useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import Button from "../../components/ui/Button";
// import {
//   Text12,
//   Text14,
//   Text16Bold,
//   Text20,
// } from "../../components/ui/Typography";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = (width - 48) / 2; // 48 = padding (24*2)

// const mockProjects = [
//   // Your mock data remains unchanged
//   {
//     id: 1,
//     title: "$4.99/sq ft",
//     type: "Interior",
//     image:
//       "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
//     quality: "High-quality image",
//     createdAt: "2024-01-15",
//     category: "Living Room",
//   },
//   // ... other mock projects
// ];

// const filters = [
//   // Your filters remain unchanged
//   { id: "all", label: "All" },
//   { id: "interior", label: "Interior" },
//   { id: "exterior", label: "Exterior" },
//   { id: "recent", label: "Recent" },
//   { id: "job", label: "Hamy" },
//   { id: "job1", label: "Hammy" },
// ];

// const SelectMaterialsScreen = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [projects, setProjects] = useState(mockProjects);
//   const [selectedProjectId, setSelectedProjectId] = useState(null); // New state for selected project

//   const filteredProjects = projects.filter((project) => {
//     const matchesSearch = project.title
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());

//     let matchesFilter = true;
//     switch (activeFilter) {
//       case "interior":
//         matchesFilter = project.type === "Interior";
//         break;
//       case "exterior":
//         matchesFilter = project.type === "Exterior";
//         break;
//       case "recent":
//         const projectDate = new Date(project.createdAt);
//         const weekAgo = new Date();
//         weekAgo.setDate(weekAgo.getDate() - 7);
//         matchesFilter = projectDate >= weekAgo;
//         break;
//       default:
//         matchesFilter = true;
//     }

//     return matchesSearch && matchesFilter;
//   });

//   const ProjectGridCard = ({ project }) => {
//     const isSelected = project.id === selectedProjectId; // Check if this card is selected

//     return (
//       <TouchableOpacity
//         onPress={() => setSelectedProjectId(project.id)} // Set this project as selected on press
//         className={`bg-white rounded-[12px] shadow-sm overflow-hidden mb-4 ${
//           isSelected ? "border border-[#0461A6]" : ""
//         }`} // Add border if selected
//         style={{ width: CARD_WIDTH }}
//       >
//         <Image
//           source={{ uri: project.image }}
//           className="w-full h-[120px] rounded-t-[8px]"
//           resizeMode="cover"
//         />
//         {isSelected && (
//           <View className="absolute top-2 right-2 flex justify-center items-center w-5 h-5 bg-[#0461A6] rounded-full">
//             <Feather name="check" size={14} color="#FFFFFF" />
//           </View>
//         )}
//         <View className="p-2">
//           <View className="flex-row flex justify-between">
//             <Text
//               className="font-semibold text-[#000000] text-sm mt-1"
//               numberOfLines={1}
//             >
//               {project.title}
//             </Text>
//             <View className="flex-row items-center space-x-1.5">
//               <AntDesign name="star" size={12} color="#FFC900" />
//               <Text className="font-semibold text-[#000000] text-sm">4.7</Text>
//             </View>
//           </View>
//           <Text12
//             className="text-[#A5A5A5] text-[10px] font-normal"
//             numberOfLines={1}
//           >
//             {project.quality}
//           </Text12>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const FilterButton = ({ filter, isActive, onPress }) => (
//     <TouchableOpacity
//       onPress={() => onPress(filter.id)}
//       className={`px-5 py-2.5 rounded-xl font-normal flex justify-center items-center text-sm mr-2 ${
//         isActive ? "bg-[#0461A6]" : "bg-[#EBEDF0]"
//       }`}
//     >
//       <Text14 className={isActive ? "text-white" : "text-[#464646]"}>
//         {filter.label}
//       </Text14>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-blue-50">
//       <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
//         {/* Header Section */}
//         <View className="bg-blue-50 px-6 pt-6 pb-4">
//           <View className="flex-row justify-center items-center mb-6">
//             <Text20 className="text-[18px] text-[#464646] text-center font-bold">
//               My Projects
//             </Text20>
//           </View>

//           {/* Filter Tabs */}
//           <View className="mb-2">
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingRight: 20 }}
//             >
//               {filters.map((filter) => (
//                 <FilterButton
//                   key={filter.id}
//                   filter={filter}
//                   isActive={activeFilter === filter.id}
//                   onPress={setActiveFilter}
//                 />
//               ))}
//             </ScrollView>
//           </View>
//         </View>

//         <View className="px-4 mb-4">
//           <Text16Bold>Material Catalog</Text16Bold>
//           <Text12 className="mt-1">
//             Select materials to apply to your design
//           </Text12>
//         </View>
//         {/* Projects Grid */}
//         <View className="px-4 pt-4 pb-8">
//           {filteredProjects.length > 0 ? (
//             <FlatList
//               data={filteredProjects}
//               renderItem={({ item }) => <ProjectGridCard project={item} />}
//               keyExtractor={(item) => item.id.toString()}
//               numColumns={2}
//               columnWrapperStyle={{ justifyContent: "space-between" }}
//               scrollEnabled={false}
//               showsVerticalScrollIndicator={false}
//             />
//           ) : (
//             <View className="items-center justify-center py-16">
//               <Feather name="folder" size={64} color="#D1D5DB" />
//               <Text16Bold className="text-gray-400 mt-4 mb-2">
//                 No projects found
//               </Text16Bold>
//               <Text14 className="text-gray-400 text-center">
//                 {searchQuery
//                   ? "Try adjusting your search terms"
//                   : "Create your first project to get started"}
//               </Text14>
//             </View>
//           )}
//           <View>
//             <Button variant="primary" className="w-full">
//               Visualize my design
//             </Button>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default SelectMaterialsScreen;
