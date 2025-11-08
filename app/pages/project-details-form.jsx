
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Dimensions,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// // CORRECT IMPORTS
// import Slider from "@react-native-community/slider";
// import DropDownPicker from "react-native-dropdown-picker";

// import Button from "../../components/ui/Button";
// import { Text14, Text16Bold, Text20 } from "../../components/ui/Typography";

// const AI_INVENTIONS = [
//   { label: "Very Low", value: 1 },
//   { label: "Low", value: 2 },
//   { label: "Medium", value: 3 },
//   { label: "High", value: 4 },
//   { label: "Extreme", value: 5 },
// ];

// const HOUSE_ANGLES = [
//   { label: "Front View", value: "front" },
//   { label: "Back View", value: "back" },
//   { label: "Left Side", value: "left" },
//   { label: "Right Side", value: "right" },
//   { label: "Bird's Eye", value: "top" },
// ];

// const DESIGN_COUNTS = [
//   { label: "1 Design", value: 1 },
//   { label: "2 Designs", value: 2 },
//   { label: "3 Designs", value: 3 },
//   { label: "5 Designs", value: 5 },
//   { label: "10 Designs", value: 10 },
// ];

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// const ProjectDetailsForm = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();

//   const { path, roomType, elementName, selectedStyle } = params;
//   const style = selectedStyle ? JSON.parse(selectedStyle) : null;

//   const [projectName, setProjectName] = useState("");
//   const [selectedAngle, setSelectedAngle] = useState(null);
//   const [aiInvention, setAiInvention] = useState(3);
//   const [designCount, setDesignCount] = useState(3);
//   const [openDesignCount, setOpenDesignCount] = useState(false);
//   const [sliderWidth, setSliderWidth] = useState(0);

//   const isExterior = path === "exterior";

//   useEffect(() => {
//     console.log("Form received:", { path, roomType, elementName, style: style?.name });
//   }, []);

//   const handleSubmit = () => {
//     if (!projectName.trim()) {
//       Alert.alert("Error", "Please enter project name");
//       return;
//     }
//     if (isExterior && !selectedAngle) {
//       Alert.alert("Error", "Please select house angle");
//       return;
//     }

//     const formData = {
//       projectName,
//       roomType: roomType || elementName,
//       style: style?.name,
//       angle: isExterior ? selectedAngle : null,
//       aiInventionLevel: aiInvention,
//       numberOfDesigns: designCount,
//       isExterior,
//     };

//     router.push({
//       pathname: "/Pages/FinalVisualization",
//       params: { formData: JSON.stringify(formData) },
//     });
//   };

//   // Get creativity label and color based on value
//   const getCreativityInfo = (value) => {
//     const labels = ["Very Low", "Low", "Medium", "High", "Extreme"];
//     const colors = ["#FF6B6B", "#FFA726", "#29B6F6", "#7E57C2", "#EC407A"];
//     const emojis = ["😴", "😊", "💡", "🚀", "🔥"];
    
//     return {
//       label: labels[value - 1],
//       color: colors[value - 1],
//       emoji: emojis[value - 1]
//     };
//   };

//   // Calculate thumb position
//   const calculateThumbPosition = () => {
//     if (sliderWidth === 0) return 0;
    
//     const stepWidth = sliderWidth / 4; // 4 gaps between 5 points
//     const position = (aiInvention - 1) * stepWidth;
//     return position;
//   };

//   const creativityInfo = getCreativityInfo(aiInvention);

//   return (
//     <SafeAreaView className="flex-1 bg-[#F5F6FA]">
//       <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
//         <Text20 className="text-center font-bold text-[#333] mb-2">
//           Complete Your Project
//         </Text20>
//         <Text14 className="text-center text-gray-600 mb-8">
//           Add details to generate AI designs
//         </Text14>

//         {/* Project Name */}
//         <View className="mb-6">
//           <Text16Bold>Project Name</Text16Bold>
//           <TextInput
//             value={projectName}
//             onChangeText={setProjectName}
//             placeholder="e.g. My Dream Home"
//             className="bg-white rounded-xl px-4 py-4 mt-2 border border-gray-200"
//           />
//         </View>

//         {/* House Angle - Only Exterior */}
//         {isExterior && (
//           <View className="mb-6 bg-white rounded-xl p-5">
//             <Text16Bold className="mb-4">Select House Angle</Text16Bold>
//             {HOUSE_ANGLES.map((angle) => (
//               <TouchableOpacity
//                 key={angle.value}
//                 onPress={() => setSelectedAngle(angle.value)}
//                 className="flex-row items-center mb-3"
//               >
//                 <View
//                   className={`w-6 h-6 rounded-full border-2 mr-3 ${
//                     selectedAngle === angle.value
//                       ? "border-[#0461A6] bg-[#0461A6]"
//                       : "border-gray-400"
//                   } justify-center items-center`}
//                 >
//                   {selectedAngle === angle.value && (
//                     <View className="w-3 h-3 bg-white rounded-full" />
//                   )}
//                 </View>
//                 <Text className="text-gray-700">{angle.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}

//         {/* AI Creativity Slider - FIXED POSITION */}
//         <View className="mb-6 bg-white rounded-2xl p-6 shadow-sm">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text16Bold>AI Creativity Level</Text16Bold>
//             <View 
//               className="px-3 py-1 rounded-full"
//               style={{ backgroundColor: `${creativityInfo.color}15` }}
//             >
//               <Text 
//                 className="text-xs font-bold"
//                 style={{ color: creativityInfo.color }}
//               >
//                 {creativityInfo.emoji} {creativityInfo.label}
//               </Text>
//             </View>
//           </View>

//           {/* Custom Slider Track - FIXED LAYOUT */}
//           <View 
//             className="relative mb-8"
//             onLayout={(event) => {
//               const { width } = event.nativeEvent.layout;
//               setSliderWidth(width);
//             }}
//           >
//             {/* Background Track */}
//             <View className="h-2 bg-gray-100 rounded-full">
//               {/* Colored Progress Track */}
//               <View 
//                 className="h-2 rounded-full absolute"
//                 style={{ 
//                   width: `${(aiInvention - 1) * 25}%`,
//                   backgroundColor: creativityInfo.color
//                 }}
//               />
//             </View>
            
//             {/* Custom Thumb with Absolute Positioning */}
//             <View 
//               className="absolute top-[-12px] w-8 h-8 justify-center items-center"
//               style={{ 
//                 left: calculateThumbPosition() - 14, // Center the thumb
//               }}
//             >
//               <View 
//                 className="w-7 h-7 rounded-full justify-center items-center"
//                 style={{
//                   backgroundColor: creativityInfo.color,
//                   shadowColor: creativityInfo.color,
//                   shadowOffset: { width: 0, height: 4 },
//                   shadowOpacity: 0.3,
//                   shadowRadius: 8,
//                   elevation: 6,
//                 }}
//               >
//                 <View className="w-2 h-2 bg-white rounded-full" />
//               </View>
//             </View>

//             {/* Step Indicators */}
//             <View className="flex-row justify-between mt-2">
//               {[1, 2, 3, 4, 5].map((step) => (
//                 <TouchableOpacity 
//                   key={step} 
//                   className="items-center"
//                   onPress={() => setAiInvention(step)}
//                 >
//                   <View 
//                     className={`w-3 h-3 rounded-full ${
//                       step <= aiInvention ? 'border-2 border-white' : ''
//                     }`}
//                     style={{
//                       backgroundColor: step <= aiInvention ? creativityInfo.color : '#D1D5DB'
//                     }}
//                   />
//                   <Text 
//                     className={`text-xs mt-1 ${
//                       step === aiInvention ? 'font-bold' : 'text-gray-500'
//                     }`}
//                     style={{
//                       color: step === aiInvention ? creativityInfo.color : '#6B7280'
//                     }}
//                   >
//                     {step}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* Hidden Slider for Actual Interaction */}
//             <Slider
//               style={{ 
//                 height: 40, 
//                 position: 'absolute', 
//                 width: '100%',
//                 top: -15,
//                 opacity: 1, // Keep it visible but behind custom thumb
//               }}
//               minimumValue={1}
//               maximumValue={5}
//               step={1}
//               value={aiInvention}
//               onValueChange={setAiInvention}
//               minimumTrackTintColor="transparent"
//               maximumTrackTintColor="transparent"
//               thumbTintColor="transparent" // Make native thumb transparent
//             />
//           </View>

//           {/* Creativity Description */}
//           <View className="bg-blue-50 rounded-xl p-3 mt-2">
//             <Text className="text-xs text-blue-800 text-center">
//               {aiInvention === 1 && "✓ Predictable designs • Traditional patterns • Safe choices"}
//               {aiInvention === 2 && "✓ Balanced creativity • Some innovation • Reliable results"}
//               {aiInvention === 3 && "✓ Creative mix • Modern twists • Good balance"}
//               {aiInvention === 4 && "✓ Highly innovative • Bold ideas • Unique concepts"}
//               {aiInvention === 5 && "✓ Extreme creativity • Revolutionary designs • Maximum innovation"}
//             </Text>
//           </View>
//         </View>

//         {/* Number of Designs */}
//         <View className="mb-8 z-50">
//           <Text16Bold className="mb-2">Number of Designs</Text16Bold>
//           <DropDownPicker
//             open={openDesignCount}
//             value={designCount}
//             items={DESIGN_COUNTS}
//             setOpen={setOpenDesignCount}
//             setValue={setDesignCount}
//             placeholder="Select number of designs"
//             style={{ 
//               backgroundColor: "white", 
//               borderColor: "#ddd",
//               borderRadius: 12,
//               borderWidth: 1,
//             }}
//             dropDownContainerStyle={{ 
//               backgroundColor: "white",
//               borderColor: "#ddd",
//               borderRadius: 12,
//             }}
//           />
//         </View>

//         {/* Summary */}
//         <View className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
//           <Text className="font-bold text-[#0461A6] mb-2">Summary</Text>
//           <Text className="text-sm mb-1">• Type: {isExterior ? "Exterior" : "Interior"}</Text>
//           <Text className="text-sm mb-1">• Room: {roomType || elementName}</Text>
//           <Text className="text-sm">• Style: {style?.name || "Not selected"}</Text>
//         </View>

//         <Button
//           onPress={handleSubmit}
//           variant="primary"
//           className="mb-10"
//           disabled={!projectName || (isExterior && !selectedAngle)}
//         >
//           Generate AI Designs
//         </Button>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ProjectDetailsForm;
// Pages/ProjectDetailsForm.jsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  PanResponder,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// CORRECT IMPORTS
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";

import Button from "../../components/ui/Button";
import { Text14, Text16Bold, Text20 } from "../../components/ui/Typography";

const AI_INVENTIONS = [
  { label: "Very Low", value: 1 },
  { label: "Low", value: 2 },
  { label: "Medium", value: 3 },
  { label: "High", value: 4 },
  { label: "Extreme", value: 5 },
];

const HOUSE_ANGLES = [
  { label: "Front View", value: "front" },
  { label: "Back View", value: "back" },
  { label: "Left Side", value: "left" },
  { label: "Right Side", value: "right" },
  { label: "Bird's Eye", value: "top" },
];

const DESIGN_COUNTS = [
  { label: "1 Design", value: 1 },
  { label: "2 Designs", value: 2 },
  { label: "3 Designs", value: 3 },
  { label: "5 Designs", value: 5 },
  { label: "10 Designs", value: 10 },
];

const ProjectDetailsForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { path, roomType, elementName, selectedStyle } = params;
  const style = selectedStyle ? JSON.parse(selectedStyle) : null;

  const [projectName, setProjectName] = useState("");
  const [selectedAngle, setSelectedAngle] = useState(null);
  const [aiInvention, setAiInvention] = useState(3);
  const [designCount, setDesignCount] = useState(3);
  const [openDesignCount, setOpenDesignCount] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const isExterior = path === "exterior";

  useEffect(() => {
    console.log("Form received:", { path, roomType, elementName, style: style?.name });
  }, []);

  // PanResponder for custom thumb drag
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      setIsSliding(true);
      handleSliderMove(evt.nativeEvent.locationX);
    },
    onPanResponderMove: (evt) => {
      handleSliderMove(evt.nativeEvent.locationX);
    },
    onPanResponderRelease: () => {
      setIsSliding(false);
    },
  });

  const handleSliderMove = (xPosition) => {
    if (sliderWidth === 0) return;

    // Calculate the percentage of the slider width
    let percentage = (xPosition / sliderWidth) * 100;
    percentage = Math.max(0, Math.min(100, percentage)); // Clamp between 0-100

    // Convert percentage to value (1-5)
    let newValue;
    if (percentage <= 12.5) {
      newValue = 1;
    } else if (percentage <= 37.5) {
      newValue = 2;
    } else if (percentage <= 62.5) {
      newValue = 3;
    } else if (percentage <= 87.5) {
      newValue = 4;
    } else {
      newValue = 5;
    }

    if (newValue !== aiInvention) {
      setAiInvention(newValue);
    }
  };

  const handleTrackPress = (evt) => {
    handleSliderMove(evt.nativeEvent.locationX);
  };

  const handleSubmit = () => {
    if (!projectName.trim()) {
      Alert.alert("Error", "Please enter project name");
      return;
    }
    if (isExterior && !selectedAngle) {
      Alert.alert("Error", "Please select house angle");
      return;
    }

    const formData = {
      projectName,
      roomType: roomType || elementName,
      style: style?.name,
      angle: isExterior ? selectedAngle : null,
      aiInventionLevel: aiInvention,
      numberOfDesigns: designCount,
      isExterior,
    };

    router.push({
      pathname: "/Pages/FinalVisualization",
      params: { formData: JSON.stringify(formData) },
    });
  };

  // Get creativity label and color based on value
  const getCreativityInfo = (value) => {
    const labels = ["Very Low", "Low", "Medium", "High", "Extreme"];
    const colors = ["#FF6B6B", "#FFA726", "#29B6F6", "#7E57C2", "#EC407A"];
    const emojis = ["😴", "😊", "💡", "🚀", "🔥"];
    
    return {
      label: labels[value - 1],
      color: colors[value - 1],
      emoji: emojis[value - 1]
    };
  };

  // Calculate thumb position
  const calculateThumbPosition = () => {
    if (sliderWidth === 0) return 0;
    
    const stepWidth = sliderWidth / 4; // 4 gaps between 5 points
    const position = (aiInvention - 1) * stepWidth;
    return Math.max(0, Math.min(sliderWidth - 28, position - 14)); // Center the thumb and clamp
  };

  const creativityInfo = getCreativityInfo(aiInvention);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1pt-6" showsVerticalScrollIndicator={false}>
        <Text20 className="text-center font-bold text-[#333] mb-2">
          Complete Your Project
        </Text20>
        <Text14 className="text-center text-gray-600 mb-8">
          Add details to generate AI designs
        </Text14>

        {/* Project Name */}
        <View className="mb-6">
          <Text16Bold>Project Name</Text16Bold>
          <TextInput
            value={projectName}
            onChangeText={setProjectName}
            placeholder="e.g. My Dream Home"
            className="bg-white rounded-xl px-4 py-4 mt-2 border border-gray-200"
          />
        </View>

        {/* House Angle - Only Exterior */}
        {isExterior && (
          <View className="mb-6 bg-white rounded-xl p-5">
            <Text16Bold className="mb-4">Select House Angle</Text16Bold>
            {HOUSE_ANGLES.map((angle) => (
              <TouchableOpacity
                key={angle.value}
                onPress={() => setSelectedAngle(angle.value)}
                className="flex-row items-center mb-3"
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 mr-3 ${
                    selectedAngle === angle.value
                      ? "border-[#0461A6] bg-[#0461A6]"
                      : "border-gray-400"
                  } justify-center items-center`}
                >
                  {selectedAngle === angle.value && (
                    <View className="w-3 h-3 bg-white rounded-full" />
                  )}
                </View>
                <Text className="text-gray-700">{angle.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* AI Creativity Slider - FULLY FUNCTIONAL */}
        <View className="mb-6 bg-white rounded-2xl p-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>AI Creativity Level</Text16Bold>
            <View 
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: `${creativityInfo.color}15` }}
            >
              <Text 
                className="text-xs font-bold"
                style={{ color: creativityInfo.color }}
              >
                {creativityInfo.emoji} {creativityInfo.label}
              </Text>
            </View>
          </View>

          {/* Custom Slider Track with Touch Handling */}
          <View 
            className="relative mb-8"
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              setSliderWidth(width);
            }}
          >
            {/* Background Track - Clickable */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleTrackPress}
              className="h-2 bg-gray-100 rounded-full"
            >
              {/* Colored Progress Track */}
              <View 
                className="h-2 rounded-full absolute"
                style={{ 
                  width: `${(aiInvention - 1) * 25}%`,
                  backgroundColor: creativityInfo.color
                }}
              />
            </TouchableOpacity>
            
            {/* Custom Thumb with Drag Handling */}
            <View 
              className="absolute top-[-12px] w-8 h-8 justify-center items-center"
              style={{ 
                left: calculateThumbPosition(),
                zIndex: 10,
              }}
              {...panResponder.panHandlers}
            >
              <View 
                className="w-7 h-7 rounded-full justify-center items-center"
                style={{
                  backgroundColor: creativityInfo.color,
                  shadowColor: creativityInfo.color,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: isSliding ? 0.6 : 0.3,
                  shadowRadius: isSliding ? 12 : 8,
                  elevation: isSliding ? 8 : 6,
                  transform: [{ scale: isSliding ? 1.1 : 1 }],
                }}
              >
                <View className="w-2 h-2 bg-white rounded-full" />
              </View>
            </View>

            {/* Step Indicators - Also Clickable */}
            <View className="flex-row justify-between mt-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <TouchableOpacity 
                  key={step} 
                  className="items-center"
                  onPress={() => setAiInvention(step)}
                >
                  <View 
                    className={`w-3 h-3 rounded-full ${
                      step <= aiInvention ? 'border-2 border-white' : ''
                    }`}
                    style={{
                      backgroundColor: step <= aiInvention ? creativityInfo.color : '#D1D5DB'
                    }}
                  />
                  <Text 
                    className={`text-xs mt-1 ${
                      step === aiInvention ? 'font-bold' : 'text-gray-500'
                    }`}
                    style={{
                      color: step === aiInvention ? creativityInfo.color : '#6B7280'
                    }}
                  >
                    {step}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Hidden Native Slider for Backup */}
            <Slider
              style={{ 
                height: 40, 
                position: 'absolute', 
                width: '100%',
                top: -15,
                opacity: 0.01, // Almost transparent but still functional
              }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={aiInvention}
              onValueChange={setAiInvention}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor="transparent"
            />
          </View>

          {/* Creativity Description */}
          <View className="bg-blue-50 rounded-xl p-3 mt-2">
            <Text className="text-xs text-blue-800 text-center">
              {aiInvention === 1 && "✓ Predictable designs • Traditional patterns • Safe choices"}
              {aiInvention === 2 && "✓ Balanced creativity • Some innovation • Reliable results"}
              {aiInvention === 3 && "✓ Creative mix • Modern twists • Good balance"}
              {aiInvention === 4 && "✓ Highly innovative • Bold ideas • Unique concepts"}
              {aiInvention === 5 && "✓ Extreme creativity • Revolutionary designs • Maximum innovation"}
            </Text>
          </View>
        </View>

        {/* Number of Designs */}
        <View className="mb-8 z-50">
          <Text16Bold className="mb-2">Number of Designs</Text16Bold>
          <DropDownPicker
            open={openDesignCount}
            value={designCount}
            items={DESIGN_COUNTS}
            setOpen={setOpenDesignCount}
            setValue={setDesignCount}
            placeholder="Select number of designs"
            style={{ 
              backgroundColor: "white", 
              borderColor: "#ddd",
              borderRadius: 12,
              borderWidth: 1,
            }}
            dropDownContainerStyle={{ 
              backgroundColor: "white",
              borderColor: "#ddd",
              borderRadius: 12,
            }}
          />
        </View>

        {/* Summary */}
        <View className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
          <Text className="font-bold text-[#0461A6] mb-2">Summary</Text>
          <Text className="text-sm mb-1">• Type: {isExterior ? "Exterior" : "Interior"}</Text>
          <Text className="text-sm mb-1">• Room: {roomType || elementName}</Text>
          <Text className="text-sm">• Style: {style?.name || "Not selected"}</Text>
        </View>

        <Button
          onPress={handleSubmit}
          variant="primary"
          className="mb-10"
          disabled={!projectName || (isExterior && !selectedAngle)}
        >
          Generate AI Designs
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectDetailsForm;