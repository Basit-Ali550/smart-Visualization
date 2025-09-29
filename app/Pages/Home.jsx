// import {
//   FlatList,
//   Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Visualize from "../../assets/images/Visualize.png";
// // Your components
// import { EvilIcons, Ionicons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Exterior from "../../assets/Icon/Exterior.svg";
// import Home from "../../assets/Icon/Home.svg";
// import Button from "../../components/ui/Button";
// import { Text12, Text14, Text16Bold } from "../../components/ui/Typography";
// // Mock data
// const mockData = {
//   user: {
//     name: "Sheraz",
//     avatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//   },
//   recentProjects: [
//     {
//       id: 1,
//       title: "Modern Living Room",
//       image:
//         "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=100&fit=crop",
//       lastEdited: "Today",
//       style: "Modern",
//     },
//     {
//       id: 2,
//       title: "Scandinavian Kitchen",
//       image:
//         "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=100&fit=crop",
//       lastEdited: "3 days ago",
//       style: "Scandinavian",
//     },
//   ],
//   popularStyles: [
//     {
//       id: 1,
//       name: "Japanese Minimalism",
//       image:
//         "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=100&h=100&fit=crop",
//     },
//     {
//       id: 2,
//       name: "Contemporary",
//       image:
//         "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&h=100&fit=crop",
//     },
//   ],
// };

// const DashboardScreen = ({ navigation }) => {
//   // Render recent project item
//   const renderProjectItem = ({ item }) => (
//     <TouchableOpacity className="mr-2 p-4 bg-white w-[48%]">
//       <Image
//         source={{ uri: item.image }}
//         className="w-44 h-24 rounded-lg mb-2"
//       />
//       <Text14 className="font-semibold mb-1" numberOfLines={1}>
//         {item.title}
//       </Text14>
//       <Text12 className="text-[#767C8C]">Last edited {item.lastEdited}</Text12>
//     </TouchableOpacity>
//   );

//   // Render style item
//   const renderStyleItem = ({ item }) => (
//     <TouchableOpacity className="flex-row items-center mb-4">
//       <Image
//         source={{ uri: item.image }}
//         className="w-12 h-12 rounded-lg mr-3"
//       />
//       <Text14 className="font-semibold">{item.name}</Text14>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView className="flex-1">
//       <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
//         {/* Header Section */}
//         <View className=" pt-6 pb-4">
//           <View className="flex-row justify-between items-center mb-4">
//             <View>
//               <Text className="text-[#464646] text-[24px] font-bold">
//                 Hi {mockData.user.name}👋
//               </Text>
//               <Text14 className="font-bold">
//                 Ready to visualize your space?
//               </Text14>
//             </View>
//             <View className="flex-row gap-3">
//               <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center">
//                 <EvilIcons name="search" size={24} color="black" />
//               </TouchableOpacity>
//               <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center">
//                 <Ionicons
//                   name="notifications-outline"
//                   size={24}
//                   color="black"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Image
//                   source={{ uri: mockData.user.avatar }}
//                   className="w-10 h-10 rounded-full"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Create and Visualize Card */}
//           <View>
//             <Image source={Visualize} className="w-full rounded-xl" />
//           </View>
//         </View>

//         {/* Design Categories Section */}
//         <View className="p-4 bg-white rounded-xl">
//           <View className="flex-row gap-4">
//             <View className="bg-[#E6EFF6] flex-row w-10 h-10 justify-center items-center rounded-lg">
//               <Home />
//             </View>
//             <View className="flex-1">
//               <Text16Bold className="">Interior Design</Text16Bold>
//               <Text14 className="text-[#767C8C] mb-4">
//                 Transform indoor spaces with premium materials
//               </Text14>
//             </View>
//           </View>
//           <Button variant="primary">Start project</Button>
//         </View>
//         <View className="p-4 bg-white mt-4 gap-3 rounded-xl">
//           <View className="flex-row gap-3">
//             <View className="bg-[#E6EFF6] flex-row w-10 h-10 justify-center items-center rounded-lg">
//               <Exterior />
//             </View>
//             <View className="flex-1">
//               <Text16Bold className="">Exterior Design</Text16Bold>
//               <Text14
//                 numberOfLines={1}
//                 ellipsizeMode="tail"
//                 className="text-[#767C8C] mb-2"
//               >
//                 Enhance your homes facade with beautiful materials
//               </Text14>
//             </View>
//           </View>
//           <Button variant="primary">Start project</Button>
//         </View>

//         {/* Recent Projects Section */}
//         <View className=" mt-3 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text16Bold>Recent Projects</Text16Bold>
//             <TouchableOpacity>
//               <Text className="text-[#0461A6]">View all</Text>
//             </TouchableOpacity>
//           </View>

//           <FlatList
//             data={mockData.recentProjects}
//             renderItem={renderProjectItem}
//             keyExtractor={(item) => item.id.toString()}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingRight: 24 }}
//           />
//         </View>

//         {/* Popular Styles Section */}
//         <View className="px-6 mb-8">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text16Bold>Popular Styles</Text16Bold>
//             <TouchableOpacity>
//               <Text14 className="text-[#0461A6]">View all</Text14>
//             </TouchableOpacity>
//           </View>

//           <FlatList
//             data={mockData.popularStyles}
//             renderItem={renderStyleItem}
//             keyExtractor={(item) => item.id.toString()}
//             scrollEnabled={false}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default DashboardScreen;

// import { EvilIcons, Ionicons } from "@expo/vector-icons";
// import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Exterior from "../../assets/Icon/Exterior.svg";
// import Home from "../../assets/Icon/Home.svg";
// import Visualize from "../../assets/images/Visualize.png";
// import Button from "../../components/ui/Button";
// import { Text12, Text14, Text16Bold } from "../../components/ui/Typography";

// // Mock data
// const mockData = {
//   user: {
//     name: "Sheraz",
//     avatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//   },
//   recentProjects: [
//     {
//       id: 1,
//       title: "Modern Living Room",
//       image:
//         "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=100&fit=crop",
//       lastEdited: "Today",
//       style: "Modern",
//     },
//     {
//       id: 2,
//       title: "Scandinavian Kitchen",
//       image:
//         "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=100&fit=crop",
//       lastEdited: "3 days ago",
//       style: "Scandinavian",
//     },
//   ],
//   popularStyles: [
//     {
//       id: 1,
//       name: "Japanese Minimalism",
//       image:
//         "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=100&h=100&fit=crop",
//     },
//     {
//       id: 2,
//       name: "Contemporary",
//       image:
//         "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&h=100&fit=crop",
//     },
//   ],
// };

// const DashboardScreen = ({ navigation }) => {
//   // Render recent project item
//   const renderProjectItem = ({ item }) => (
//     <TouchableOpacity className="p-4 bg-white flex-1 m-2 rounded-xl">
//       <Image
//         source={{ uri: item.image }}
//         className="w-full h-24 rounded-lg mb-2"
//       />
//       <Text14 className="font-semibold mb-1" numberOfLines={1}>
//         {item.title}
//       </Text14>
//       <Text12 className="text-[#767C8C]">Last edited {item.lastEdited}</Text12>
//     </TouchableOpacity>
//   );

//   // Render style item
//   const renderStyleItem = ({ item }) => (
//     <TouchableOpacity className="flex-row items-center p-4 bg-white m-2 rounded-xl flex-1">
//       <Image
//         source={{ uri: item.image }}
//         className="w-12 h-12 rounded-lg mr-3"
//       />
//       <Text14 className="font-semibold">{item.name}</Text14>
//     </TouchableOpacity>
//   );

//   // Render section item for main FlatList
//   const renderSection = ({ item }) => (
//     <View>
//       {item.type === "header" && (
//         <View className="pt-6 pb-4 ">
//           <View className="flex-row justify-between items-center mb-4">
//             <View>
//               <Text className="text-[#464646] text-[24px] font-bold">
//                 Hi {mockData.user.name}👋
//               </Text>
//               <Text14 className="font-bold">
//                 Ready to visualize your space?
//               </Text14>
//             </View>
//             <View className="flex-row gap-3">
//               <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center">
//                 <EvilIcons name="search" size={24} color="black" />
//               </TouchableOpacity>
//               <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center">
//                 <Ionicons
//                   name="notifications-outline"
//                   size={24}
//                   color="black"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Image
//                   source={{ uri: mockData.user.avatar }}
//                   className="w-10 h-10 rounded-full"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View>
//             <Image source={Visualize} className="w-full rounded-xl" />
//           </View>
//         </View>
//       )}
//       {item.type === "interiorDesign" && (
//         <View className="p-4 bg-white rounded-xl ">
//           <View className="flex-row gap-4">
//             <View className="bg-[#E6EFF6] flex-row w-10 h-10 justify-center items-center rounded-lg">
//               <Home />
//             </View>
//             <View className="flex-1">
//               <Text16Bold className="">Interior Design</Text16Bold>
//               <Text14 className="text-[#767C8C] mb-4">
//                 Transform indoor spaces with premium materials
//               </Text14>
//             </View>
//           </View>
//           <Button variant="primary">Start project</Button>
//         </View>
//       )}
//       {item.type === "exteriorDesign" && (
//         <View className="p-4 bg-white mt-4 gap-3 rounded-xl ">
//           <View className="flex-row gap-3">
//             <View className="bg-[#E6EFF6] flex-row w-10 h-10 justify-center items-center rounded-lg">
//               <Exterior />
//             </View>
//             <View className="flex-1">
//               <Text16Bold className="">Exterior Design</Text16Bold>
//               <Text14
//                 numberOfLines={1}
//                 ellipsizeMode="tail"
//                 className="text-[#767C8C] mb-2"
//               >
//                 Enhance your homes facade with beautiful materials
//               </Text14>
//             </View>
//           </View>
//           <Button variant="primary">Start project</Button>
//         </View>
//       )}
//       {item.type === "recentProjects" && (
//         <View className=" mt-3 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text16Bold>Recent Projects</Text16Bold>
//             <TouchableOpacity>
//               <Text className="text-[#0461A6]">View all</Text>
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={mockData.recentProjects}
//             renderItem={renderProjectItem}
//             keyExtractor={(item) => item.id.toString()}
//             numColumns={2}
//             key="recentProjectsGrid"
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 4 }}
//           />
//         </View>
//       )}
//       {item.type === "popularStyles" && (
//         <View className=" mb-8">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text16Bold>Popular Styles</Text16Bold>
//             <TouchableOpacity>
//               <Text14 className="text-[#0461A6]">View all</Text14>
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={mockData.popularStyles}
//             renderItem={renderStyleItem}
//             keyExtractor={(item) => item.id.toString()}
//             numColumns={2}
//             key="popularStylesGrid"
//             contentContainerStyle={{ paddingHorizontal: 4 }}
//           />
//         </View>
//       )}
//     </View>
//   );

//   // Data for the main FlatList
//   const sections = [
//     { type: "header", id: "header" },
//     { type: "interiorDesign", id: "interiorDesign" },
//     { type: "exteriorDesign", id: "exteriorDesign" },
//     { type: "recentProjects", id: "recentProjects" },
//     { type: "popularStyles", id: "popularStyles" },
//   ];

//   return (
//     <SafeAreaView className="flex-1">
//       <FlatList
//         data={sections}
//         renderItem={renderSection}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// export default DashboardScreen;

// import { EvilIcons, Ionicons } from "@expo/vector-icons";
// import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Exterior from "../../assets/Icon/Exterior.svg";
// import Home from "../../assets/Icon/Home.svg";
// import Visualize from "../../assets/images/Visualize.png";
// import Button from "../../components/ui/Button";
// import { Text14, Text16Bold } from "../../components/ui/Typography";

// // Mock data
// const mockData = {
//   user: {
//     name: "Sheraz",
//     avatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//   },
//   recentProjects: [
//     {
//       id: 1,
//       title: "Modern Living Room",
//       image:
//         "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=100&fit=crop",
//       lastEdited: "Today",
//       style: "Modern",
//     },
//     {
//       id: 2,
//       title: "Scandinavian Kitchen",
//       image:
//         "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=100&fit=crop",
//       lastEdited: "3 days ago",
//       style: "Scandinavian",
//     },
//   ],
//   popularStyles: [
//     {
//       id: 1,
//       name: "Japanese Minimalism",
//       image:
//         "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=100&h=100&fit=crop",
//     },
//     {
//       id: 2,
//       name: "Contemporary",
//       image:
//         "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&h=100&fit=crop",
//     },
//   ],
// };

// const DashboardScreen = ({ navigation }) => {
//   // Render recent project item
//   const renderProjectItem = ({ item }) => (
//     <TouchableOpacity className="p-3 bg-white flex-1 m-2 rounded-xl">
//       <Image
//         source={{ uri: item.image }}
//         className="w-full h-28 rounded-lg mb-2"
//       />
//       <Text
//         className="text-sm font-semibold text-[#464646] mb-1"
//         numberOfLines={1}
//       >
//         {item.title}
//       </Text>
//       <Text className="text-[#A5A5A5] text-[10px] font-normal">
//         Last edited {item.lastEdited}
//       </Text>
//     </TouchableOpacity>
//   );

//   // Render style item (updated to match renderProjectItem)
//   const renderStyleItem = ({ item }) => (
//     <TouchableOpacity className="p-3 bg-white flex-1 m-2 rounded-xl">
//       <Image
//         source={{ uri: item.image }}
//         className="w-full h-28 rounded-lg mb-2"
//       />
//       <Text
//         className="text-sm font-semibold text-[#464646] mb-1"
//         numberOfLines={1}
//       >
//         {item.name}
//       </Text>
//       <Text className="text-[#A5A5A5] text-[10px] font-normal">Style</Text>
//     </TouchableOpacity>
//   );

//   // Render section item for main FlatList
//   const renderSection = ({ item }) => (
//     <View>
//       {item.type === "header" && (
//         <View className="pt-6 pb-4">
//           <View className="flex-row justify-between items-center mb-4">
//             <View>
//               <Text className="text-[#464646] text-[24px] font-bold">
//                 Hi {mockData.user.name}👋
//               </Text>
//               <Text14 className="font-bold">
//                 Ready to visualize your space?
//               </Text14>
//             </View>
//             <View className="flex-row gap-3">
//               <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center">
//                 <EvilIcons name="search" size={24} color="black" />
//               </TouchableOpacity>
//               <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center">
//                 <Ionicons
//                   name="notifications-outline"
//                   size={24}
//                   color="black"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Image
//                   source={{ uri: mockData.user.avatar }}
//                   className="w-10 h-10 rounded-full"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View>
//             <Image source={Visualize} className="w-full rounded-xl" />
//           </View>
//         </View>
//       )}
//       {item.type === "interiorDesign" && (
//         <View className="p-4 bg-white rounded-xl">
//           <View className="flex-row gap-4">
//             <View className="bg-[#E6EFF6] flex-row w-10 h-10 justify-center items-center rounded-lg">
//               <Home />
//             </View>
//             <View className="flex-1">
//               <Text16Bold className="">Interior Design</Text16Bold>
//               <Text14 className="text-[#767C8C] mb-4">
//                 Transform indoor spaces with premium materials
//               </Text14>
//             </View>
//           </View>
//           <Button variant="primary">Start project</Button>
//         </View>
//       )}
//       {item.type === "exteriorDesign" && (
//         <View className="p-4 bg-white mt-4 gap-3 rounded-xl ">
//           <View className="flex-row gap-3">
//             <View className="bg-[#E6EFF6] flex-row w-10 h-10 justify-center items-center rounded-lg">
//               <Exterior />
//             </View>
//             <View className="flex-1">
//               <Text16Bold className="">Exterior Design</Text16Bold>
//               <Text14
//                 numberOfLines={1}
//                 ellipsizeMode="tail"
//                 className="text-[#767C8C] mb-2"
//               >
//                 Enhance your homes facade with beautiful materials
//               </Text14>
//             </View>
//           </View>
//           <Button variant="primary">Start project</Button>
//         </View>
//       )}
//       {item.type === "recentProjects" && (
//         <View className="mt-3 mb-6 ">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text16Bold>Recent Projects</Text16Bold>
//             <TouchableOpacity>
//               <Text className="text-[#0461A6]">View all</Text>
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={mockData.recentProjects}
//             renderItem={renderProjectItem}
//             keyExtractor={(item) => item.id.toString()}
//             numColumns={2}
//             key="recentProjectsGrid"
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 4 }}
//           />
//         </View>
//       )}
//       {item.type === "popularStyles" && (
//         <View className="mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text16Bold>Popular Styles</Text16Bold>
//             <TouchableOpacity>
//               <Text className="text-[#0461A6]">View all</Text>
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={mockData.popularStyles}
//             renderItem={renderStyleItem}
//             keyExtractor={(item) => item.id.toString()}
//             numColumns={2}
//             key="popularStylesGrid"
//             contentContainerStyle={{ paddingHorizontal: 4 }}
//           />
//         </View>
//       )}
//     </View>
//   );

//   // Data for the main FlatList
//   const sections = [
//     { type: "header", id: "header" },
//     { type: "interiorDesign", id: "interiorDesign" },
//     { type: "exteriorDesign", id: "exteriorDesign" },
//     { type: "recentProjects", id: "recentProjects" },
//     { type: "popularStyles", id: "popularStyles" },
//   ];

//   return (
//     <SafeAreaView className="flex-1">
//       <FlatList
//         data={sections}
//         renderItem={renderSection}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// export default DashboardScreen;

import { EvilIcons, FontAwesome5, Ionicons } from "@expo/vector-icons"; // Add FontAwesome5
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Exterior from "../../assets/Icon/Exterior.svg";
import Home from "../../assets/Icon/Home.svg";
import Visualize from "../../assets/images/Visualize.png";
import Button from "../../components/ui/Button";
import { Text14, Text16Bold } from "../../components/ui/Typography";

// Mock data
const mockData = {
  user: {
    name: "Sheraz",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  recentProjects: [
    {
      id: 1,
      title: "Modern Living Room",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=100&fit=crop",
      lastEdited: "Today",
      style: "Modern",
    },
    {
      id: 2,
      title: "Scandinavian Kitchen",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=100&fit=crop",
      lastEdited: "3 days ago",
      style: "Scandinavian",
    },
  ],
  popularStyles: [
    {
      id: 1,
      name: "Japanese Minimalism",
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Contemporary",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&h=100&fit=crop",
    },
  ],
};

const DashboardScreen = () => {
  // Render recent project item
  const navigation = useNavigation();
  const renderProjectItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile/ProfileScreen")}
      className="p-3 bg-white flex-1 m-2 rounded-xl"
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-28 rounded-lg mb-2"
        />
        <TouchableOpacity className="absolute top-1 right-2">
          <View className="bg-white/40 flex-row items-center justify-center p-2 rounded-full">
            <FontAwesome5 name="heart" size={14} color="#000000" />
          </View>
        </TouchableOpacity>
      </View>
      <Text
        className="text-sm font-semibold text-[#464646] mb-1"
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <Text className="text-[#A5A5A5] text-[10px] font-normal">
        Last edited {item.lastEdited}
      </Text>
    </TouchableOpacity>
  );

  // Render style item
  const renderStyleItem = ({ item }) => (
    <TouchableOpacity className="p-3 bg-white flex-1 m-2 rounded-xl">
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-28 rounded-lg mb-2"
        />
        <TouchableOpacity className="absolute top-1 right-2">
          <View className="bg-white/40 flex-row items-center justify-center p-2 rounded-full">
            <FontAwesome5 name="heart" size={14} color="#000000" />
          </View>
        </TouchableOpacity>
      </View>
      <Text
        className="text-sm font-semibold text-[#464646] mb-1"
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text className="text-[#A5A5A5] text-[10px] font-normal">Style</Text>
    </TouchableOpacity>
  );

  // Render section item for main FlatList
  const renderSection = ({ item }) => (
    <View>
      {item.type === "header" && (
        <View className="pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-[#464646] text-[24px] font-bold">
                Hi {mockData.user.name}👋
              </Text>
              <Text14 className="font-bold">
                Ready to visualize your space?
              </Text14>
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center">
                <EvilIcons name="search" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Pages/Notification")}
                className="w-10 h-10 rounded-full bg-white justify-center items-center"
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Pages/ProfileScreen")}
              >
                <Image
                  source={{ uri: mockData.user.avatar }}
                  className="w-10 h-10 rounded-full"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Image source={Visualize} className="w-full rounded-xl" />
          </View>
        </View>
      )}
      {item.type === "interiorDesign" && (
        <View className="p-4 bg-white rounded-xl">
          <View className="flex-row gap-4">
            <View className="bg-[#E6EFF6] flex-row w-10 h-10 justify-center items-center rounded-lg">
              <Home />
            </View>
            <View className="flex-1">
              <Text16Bold className="">Interior Design</Text16Bold>
              <Text14 className="text-[#767C8C] mb-4">
                Transform indoor spaces with premium materials
              </Text14>
            </View>
          </View>
          <Button
            onPress={() => navigation.navigate("Pages/InteriorDesign")}
            variant="primary"
          >
            Start project
          </Button>
        </View>
      )}
      {item.type === "exteriorDesign" && (
        <View className="p-4 bg-white mt-4 gap-3 rounded-xl ">
          <View className="flex-row gap-3">
            <View className="bg-[#E6EFF6] flex-row w-10 h-10 justify-center items-center rounded-lg">
              <Exterior />
            </View>
            <View className="flex-1">
              <Text16Bold className="">Exterior Design</Text16Bold>
              <Text14
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-[#767C8C] mb-2"
              >
                Enhance your homes facade with beautiful materials
              </Text14>
            </View>
          </View>
          <Button
            onPress={() => navigation.navigate("Pages/ExteriorDesign")}
            variant="primary"
          >
            Start project
          </Button>
        </View>
      )}
      {item.type === "recentProjects" && (
        <View className="mt-3 mb-6 ">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>Recent Projects</Text16Bold>
            <TouchableOpacity
              onPress={() => navigation.navigate("Pages/MyProjectsScreen")}
            >
              <Text className="text-[#0461A6]">View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockData.recentProjects}
            renderItem={renderProjectItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            key="recentProjectsGrid"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
          />
        </View>
      )}
      {item.type === "popularStyles" && (
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>Popular Styles</Text16Bold>
            <TouchableOpacity
              onPress={() => navigation.navigate("Pages/MyProjectsScreen")}
            >
              <Text className="text-[#0461A6]">View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockData.popularStyles}
            renderItem={renderStyleItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            key="popularStylesGrid"
            contentContainerStyle={{ paddingHorizontal: 4 }}
          />
        </View>
      )}
    </View>
  );

  // Data for the main FlatList
  const sections = [
    { type: "header", id: "header" },
    { type: "interiorDesign", id: "interiorDesign" },
    { type: "exteriorDesign", id: "exteriorDesign" },
    { type: "recentProjects", id: "recentProjects" },
    { type: "popularStyles", id: "popularStyles" },
  ];

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
