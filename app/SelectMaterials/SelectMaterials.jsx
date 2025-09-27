// import { AntDesign, Feather } from "@expo/vector-icons";
// import { useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // Your components
// import { Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Button } from "react-native-web";
// import {
//   Text12,
//   Text14,
//   Text16Bold,
//   Text20,
// } from "../../components/ui/Typography";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = (width - 48) / 2; // 48 = padding (24*2)

// // Mock data (same as above)

// const mockProjects = [
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
//   {
//     id: 2,
//     title: "$4.99/sq ft",
//     type: "Interior",
//     image:
//       "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
//     quality: "High-quality image",

//     createdAt: "2024-01-10",
//     category: "Kitchen",
//   },
//   {
//     id: 3,
//     title: "$4.99/sq ft",
//     type: "Interior",
//     image:
//       "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop",
//     quality: "High-quality image",

//     createdAt: "2024-01-05",
//     category: "Bedroom",
//   },
//   {
//     id: 4,
//     title: "$4.99/sq ft",
//     type: "Exterior",
//     image:
//       "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=300&h=200&fit=crop",
//     quality: "High-quality image",

//     createdAt: "2024-01-01",
//     category: "Exterior",
//   },
//   {
//     id: 5,
//     title: "$4.99/sq ft",
//     type: "Interior",
//     image:
//       "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=200&fit=crop",
//     quality: "High-quality image",

//     createdAt: "2023-12-28",
//     category: "Dining Room",
//   },
//   {
//     id: 6,
//     title: "$4.99/sq ft",
//     type: "Interior",
//     image:
//       "https://images.unsplash.com/photo-1584621247940-688ce92e3e2e?w=300&h=200&fit=crop",
//     quality: "High-quality image",

//     createdAt: "2023-12-25",
//     category: "Bathroom",
//   },
// ];

// const filters = [
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

//   const ProjectGridCard = ({ project }) => (
//     <View
//       className="bg-white rounded-[12px] shadow-sm overflow-hidden mb-4"
//       style={{ width: CARD_WIDTH }}
//     >
//       <Image
//         source={{ uri: project.image }}
//         className="w-full h-[120px] rounded-t-[8px]"
//         resizeMode="cover"
//       />

//       <View className="p-2">
//         <View className="flex-row flex justify-between">
//           <Text
//             className="font-semibold text-[#000000] text-sm mt-1"
//             numberOfLines={1}
//           >
//             {project.title}
//           </Text>
//           <View className="flex-row items-center space-x-1.5">
//             <AntDesign name="star" size={12} color="#FFC900" />
//             <Text className="font-semibold text-[#000000] text-sm ">4.7</Text>
//           </View>
//         </View>
//         <Text12
//           className="text-[#A5A5A5] text-[10px] font-normal"
//           numberOfLines={1}
//         >
//           {project.quality}
//         </Text12>
//       </View>
//     </View>
//   );

//   const FilterButton = ({ filter, isActive, onPress }) => (
//     <TouchableOpacity
//       onPress={() => onPress(filter.id)}
//       className={`px-5 py-2.5 rounded-xl font-normal flex justify-center items-center text-sm mr-2 ${
//         isActive ? "bg-[#0461A6]" : "bg-[#EBEDF0]"
//       }`}
//     >
//       <Text14 className={isActive ? "text-white " : "text-[#464646]"}>
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

import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
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

// Your provided Button component

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 48 = padding (24*2)

const mockProjects = [
  {
    id: 1,
    title: "$4.99/sq ft",
    type: "Interior",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    quality: "High-quality image",
    createdAt: "2024-01-15",
    category: "Living Room",
  },
  {
    id: 2,
    title: "$4.99/sq ft",
    type: "Interior",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
    quality: "High-quality image",
    createdAt: "2024-01-10",
    category: "Kitchen",
  },
  {
    id: 3,
    title: "$4.99/sq ft",
    type: "Interior",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop",
    quality: "High-quality image",
    createdAt: "2024-01-05",
    category: "Bedroom",
  },
  {
    id: 4,
    title: "$4.99/sq ft",
    type: "Exterior",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=300&h=200&fit=crop",
    quality: "High-quality image",
    createdAt: "2024-01-01",
    category: "Exterior",
  },
  {
    id: 5,
    title: "$4.99/sq ft",
    type: "Interior",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=200&fit=crop",
    quality: "High-quality image",
    createdAt: "2023-12-28",
    category: "Dining Room",
  },
  {
    id: 6,
    title: "$4.99/sq ft",
    type: "Interior",
    image:
      "https://images.unsplash.com/photo-1584621247940-688ce92e3e2e?w=300&h=200&fit=crop",
    quality: "High-quality image",
    createdAt: "2023-12-25",
    category: "Bathroom",
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
  { id: "recent", label: "Recent" },
  { id: "job", label: "Hamy" },
  { id: "job1", label: "Hammy" },
];

const SelectMaterialsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(null); // Track selected project

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
    const isSelected = project.id === selectedProjectId;

    return (
      <TouchableOpacity
        onPress={() => setSelectedProjectId(project.id)} // Toggle selection
        className={`bg-white rounded-[12px] shadow-sm overflow-hidden mb-4 ${
          isSelected ? "border border-[#0461A6]" : ""
        }`} // Add 1px border if selected
        style={{ width: CARD_WIDTH }}
      >
        <Image
          source={{ uri: project.image }}
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
              {project.title}
            </Text>
            <View className="flex-row items-center space-x-1.5">
              <AntDesign name="star" size={12} color="#FFC900" />
              <Text className="font-semibold text-[#000000] text-sm">4.7</Text>
            </View>
          </View>
          <Text12
            className="text-[#A5A5A5] text-[10px] font-normal"
            numberOfLines={1}
          >
            {project.quality}
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

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <View className="bg-blue-50 px-6 pt-6 pb-4">
          <View className="flex-row justify-center items-center mb-6">
            <Text20 className="text-[18px] text-[#464646] text-center font-bold">
              My Projects
            </Text20>
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

        <View className="px-4 mb-4">
          <Text16Bold>Material Catalog</Text16Bold>
          <Text12 className="mt-1">
            Select materials to apply to your design
          </Text12>
        </View>
        {/* Projects Grid */}
        <View className="px-4 pt-4 pb-8">
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
          <View>
            <Button variant="primary" className="w-full">
              Visualize my design
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectMaterialsScreen;
