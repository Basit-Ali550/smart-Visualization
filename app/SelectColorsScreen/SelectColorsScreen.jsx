import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import Back from "../../assets/images/back.svg";
import Plus from "../../assets/images/Plus.svg";
import SelectColor from "../../assets/images/SelectColor.jpg";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text14, Text16Bold } from "../../components/ui/Typography";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";

// --- 1. Data Structure & Setup ---

const MOCK_PALETTES = [
  {
    id: "p1",
    name: "Modern Living Room",
    colors: ["#ADD8E6", "#87CEFA", "#4169E1", "#00008B"], // Blue palette
    lastEdited: "Today",
  },
  {
    id: "p2",
    name: "Modern Living Room",
    colors: ["#E6E6FA", "#DCDCDC", "#A9A9A9", "#2F4F4F"], // Gray palette (Selected in reference image)
    lastEdited: "Today",
  },
  {
    id: "p3",
    name: "Modern Living Room",
    colors: ["#8B0000", "#B22222", "#CD5C5C", "#D2B48C"], // Red/Brown palette
    lastEdited: "Today",
  },
  {
    id: "p4",
    name: "Modern Living Room",
    colors: ["#008B8B", "#20B2AA", "#48D1CC", "#80CBC4"], // Teal palette
    lastEdited: "Today",
  },
  {
    id: "p5",
    name: "Modern Living Room",
    colors: ["#FFFFE0", "#FFD700", "#FFA500", "#FF8C00"], // Yellow/Orange palette
    lastEdited: "Today",
  },
  {
    id: "p6",
    name: "Modern Living Room",
    colors: ["#483D8B", "#6A5ACD", "#9370DB", "#DDA0DD"], // Purple palette
    lastEdited: "Today",
  },
];

// Set the default selected palette to the one shown in the image (Gray)
const DEFAULT_SELECTED_PALETTE = MOCK_PALETTES[1];

const screenWidth = Dimensions.get("window").width;
// Calculate width for two columns with padding (p-4 for the container) and margin (m-1 for the block)
const paletteContainerWidth = (screenWidth - 40) / 2;

// --- 2. Components ---

// A. Header Icon Component
const HeaderIcon = () => (
  <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center mr-2">
    <Image source={SelectColor} className="w-full h-full rounded-xl" />
  </View>
);

// B. PaletteBlock Component (FINAL CORRECTED TWO-COLUMN VERSION)
const PaletteBlock = ({ palette, isSelected, onSelect }) => {
  const displayColors = palette.colors.slice(0, 4);

  return (
    <TouchableOpacity
      className="w-full h-48 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-md"
      style={{
        borderWidth: isSelected ? 2 : 1, // Highlight border when selected
        borderColor: isSelected ? "#3b82f6" : "#e5e7eb",
        // Optional: Adding a subtle shadow matching the Figma reference
        shadowColor: isSelected ? "#3b82f6" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isSelected ? 0.3 : 0.05,
        shadowRadius: 3.84,
        elevation: isSelected ? 5 : 1,
      }}
      onPress={() => onSelect(palette)}
    >
      {/* Top Color Strip - Takes up most of the visual space */}
      <View className="flex-row w-full flex-1">
        {displayColors.map((color, index) => (
          <View
            key={index}
            style={{
              backgroundColor: color,
              width: `${100 / displayColors.length}%`,
            }}
          />
        ))}
      </View>

      {/* Bottom Text Area */}
      <View className="p-3 w-full">
        <Text className="font-semibold text-sm">{palette.name}</Text>
        <Text className="text-xs text-gray-500">
          Last edited: {palette.lastEdited}
        </Text>
      </View>

      {/* Checkmark (ABSOLUTE POSITIONING over the color strip) */}
      {isSelected && (
        <View className="absolute top-2 right-2 p-1 rounded-full bg-blue-600">
          <MaterialCommunityIcons name="check" size={16} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

// C. SelectedPaletteBar Component
const SelectedPaletteBar = ({ colors }) => {
  const displayColors = colors.slice(0, 4);

  return (
    <View className="flex flex-col gap-2">
      <Text className="font-semibold text-gray-700 mb-2">Selected Palette</Text>
      <View className="p-4 bg-white rounded-t-lg">
        <View className="flex-row justify-start gap-4">
          {displayColors.map((color, index) => (
            <View
              key={index}
              style={{ backgroundColor: color }}
              className="w-10 h-10 rounded-xl  "
            />
          ))}
        </View>
      </View>
    </View>
  );
};

// --- 3. Main Screen ---

const SelectColorsScreen = () => {
  const [selectedPalette, setSelectedPalette] = useState(
    DEFAULT_SELECTED_PALETTE
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newColorHex, setNewColorHex] = useState("#3a86ff");
  const router = useRouter();

  const handleSelectPalette = (palette) => {
    setSelectedPalette(palette);
  };

  const handleNext = () => {
    if (selectedPalette) {
      // 🔑 AI Data Note: The array of hex codes is the data you pass to your AI
      console.log("Colors to send to AI:", selectedPalette.colors);
      Alert.alert(
        "AI Input Ready",
        `Sending ${selectedPalette.colors.length} colors to the AI engine.`
      );
    } else {
      Alert.alert(
        "Selection Required",
        "Please select a color palette to proceed."
      );
    }
  };

  const handleAddCustomColor = () => {
    const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/i;
    if (!hexRegex.test(newColorHex)) {
      Alert.alert(
        "Error",
        "Please enter a valid hex color code (e.g., #RRGGBB)."
      );
      return;
    }

    const newPalette = {
      id: `custom-${Date.now()}`,
      name: "Custom Palette",
      colors: [newColorHex, "#CCCCCC", "#999999", "#333333"],
      lastEdited: "Just now",
    };

    setSelectedPalette(newPalette);
    MOCK_PALETTES.push(newPalette)
    setIsModalVisible(false);
    setNewColorHex("#3a86ff");
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Expo Router Header Configuration */}

      <Header
        left={<Back />}
        onLeftPress={() => router.back()}
        title="Select Colors"
        right={<Plus />}
        onRightPress={() => setIsModalVisible(true)}
        rightWidth={60}
      />

      {/* Top Header Section */}
      <View className="p-4 bg-white rounded-xl flex-row gap-3 mb-5 items-center">
        <HeaderIcon />
        <View>
          <Text className="text-lg font-bold">Japanese Minimalism</Text>
          <Text className="text-sm text-gray-500">
            Clean, simple, and natural elements
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text16Bold>Color Palettes</Text16Bold>

        <Text14 className=" my-3">
          Choose a color palette that matches your style
        </Text14>

        {/* Color Palette Grid (Two Column) */}
        <View className="flex-row flex-wrap gap-3 justify-between">
          {MOCK_PALETTES.map((palette) => (
            <View key={palette.id} style={{ width: paletteContainerWidth }}>
              <PaletteBlock
                palette={palette}
                isSelected={selectedPalette?.id === palette.id}
                onSelect={handleSelectPalette}
              />
            </View>
          ))}
        </View>
        <View className="h-10" />
      </ScrollView>

      {/* Selected Palette Bar */}
      <SelectedPaletteBar colors={selectedPalette?.colors || []} />

      {/* Next Button */}
      <View>
        <Button variant="primary" onPress={handleNext}>
          Next
        </Button>
      </View>

      {/* Add Color Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className="w-full bg-white rounded-xl p-6 shadow-2xl">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold">Create Custom Palette</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <Text className="text-base text-gray-600 mb-4">
              Is this the photo you want to use for visualization?
            </Text>

            <TextInput
              className="border border-gray-300 p-3 rounded-lg mb-6 text-lg"
              placeholder="#3a86ff"
              value={newColorHex}
              onChangeText={setNewColorHex}
              autoCapitalize="none"
              style={{ borderLeftWidth: 10, borderLeftColor: newColorHex }}
            />

            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="px-6 py-3 rounded-lg border border-gray-300"
              >
                <Text className="text-gray-700 font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddCustomColor}
                className="bg-blue-600 px-6 py-3 rounded-lg"
              >
                <Text className="text-white font-semibold">Add color</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SelectColorsScreen;
