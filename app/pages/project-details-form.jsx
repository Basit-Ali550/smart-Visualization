import Slider from "@react-native-community/slider";
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Easing,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Ai from "../../assets/Icon/Ai.svg";
import Button from "../../components/ui/Button";
import { Text14, Text16Bold, Text20 } from "../../components/ui/Typography";
import apiClient from "../../hooks/apiClient";

const AI_INVENTIONS = [
  { label: "Very Low", value: 1 },
  { label: "Low", value: 2 },
  { label: "Mid", value: 3 },
  { label: "Extreme", value: 4 },
  { label: "Extreme", value: 5 },
];

const HOUSE_ANGLES = [
  { label: "Front View", value: "Front of House" },
  { label: "Back View", value: "Back of House" },
  { label: "Side View", value: "Side of House" },
];

const DESIGN_COUNTS = [
  { label: "1 Design", value: 1 },
  { label: "2 Designs", value: 2 },
  { label: "3 Designs", value: 3 },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ProjectDetailsForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    path,
    roomType,
    elementName,
    selectedStyle,
    photo,
  } = params;
  
  const style = selectedStyle ? JSON.parse(selectedStyle) : null;
  const uploadedPhoto = photo ? JSON.parse(photo) : null;
  
  const [projectName, setProjectName] = useState("");
  const [selectedAngle, setSelectedAngle] = useState(null);
  const [aiInvention, setAiInvention] = useState(3);
  const [designCount, setDesignCount] = useState(3);
  const [openDesignCount, setOpenDesignCount] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(-50))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  const isExterior = path === "exterior";

  const getFixedUri = (uri) => {
    if (!uri) return uri;
    if (Platform.OS === 'android') {
      return uri.startsWith('file://') ? uri : `file://${uri}`;
    }
    return uri;
  };

  useEffect(() => {
    if (aiLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [aiLoading]);

  useEffect(() => {
    if (showAIRecommendations) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(-50);
    }
  }, [showAIRecommendations]);

  const getAIRecommendations = async () => {
    if (!uploadedPhoto?.uri) {
      Alert.alert("Error", "Photo is required for AI recommendations");
      return;
    }

    setAiLoading(true);
    setShowAIRecommendations(false);
    setSelectedRecommendation(null);

    try {
      console.log("Starting AI analysis...");
      
      // Convert image to base64
      const response = await fetch(getFixedUri(uploadedPhoto.uri));
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      
      const blob = await response.blob();
      console.log("Image blob created, size:", blob.size);

      const base64data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const result = reader.result;
          if (result) {
            const base64 = result.split(',')[1];
            console.log("Base64 data length:", base64.length);
            resolve(base64);
          } else {
            reject(new Error("Failed to convert image to base64"));
          }
        };
        reader.onerror = () => reject(new Error("FileReader error"));
      });

      const payload = {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: uploadedPhoto.mimeType || "image/jpeg",
                  data: base64data
                }
              },
              {
                text: `Analyze the attached image of an ${isExterior ? "Exterior" : "Interior"} ${roomType || elementName || "space"}. Based on the visual elements, generate a list of 5 design style recommendations.\n\nInstructions:\n1. ONLY select styles from the following list. Do not use any style not listed.\n2. Rank the recommendations from the most suitable (highest percentage) to the least suitable.\n3. Express the suitability as a whole number percentage (e.g., 85) in the 'suitability_percentage' field.\n\nAllowed Styles: Modern, Mediterranean, International, Moody Colors, Wood Accents, Bohemian, Industrial, Retreat, Elegant, Painted Brick, Red Brick, Modern Blend, Stone Clad, Glass House, Ranch, Modern Farm House, Portuguese, Traditional, Craftsman, Tudor, Prairie, Chalet, Colonial, Dutch Colonial, Georgian, Green, Contemporary, Christmas, Cottage, Farmhouse, French Country, Futuristic, Gothic, Greek Revival, Mansion, Townhouse, Victorian, Corporate Building, Baroque, Art Deco, Neo Classical, Mission Revival, Bauhaus, Rustic Modern, Tropical, Beach House, Urban Industrial, Victorian Gothic, Italianate, Spanish Colonial Revival, Desert Modern, Log Cabin, Eco Friendly, Alpine, Dutch Gable, A Frame, Shingle Style, Regency, Vernacular, Neo Tudor, Southwestern, Cape Cod, Federal, French Eclectic, Renaissance Revival, Split Level, Cuban Colonial, Modern Scandinavian`
              }
            ]
          }
        ],
        systemInstruction: {
          parts: [
            {
              text: "You are a highly constrained, expert Interior and exterior design recommender. You strictly adhere to all output formatting and style constraints provided by the user."
            }
          ]
        },
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              recommendations: {
                type: "array",
                description: "A list of 5 design style recommendations, ranked by suitability from 1 to 5.",
                items: {
                  type: "object",
                  properties: {
                    style_name: {
                      type: "string",
                      description: "The name of the design style, selected ONLY from the provided allowed list."
                    },
                    suitability_percentage: {
                      type: "integer",
                      description: "The suitability percentage for this style (e.g., 85), as a whole number between 60 and 100."
                    }
                  },
                  required: ["style_name", "suitability_percentage"]
                }
              }
            },
            required: ["recommendations"]
          }
        }
      };

      console.log("Sending AI request to Gemini API...");

      const aiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyAKx6GienYoifGEEbR2gA67BSFmBxJhyBE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("AI API response status:", aiResponse.status);

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error("AI API error response:", errorText);
        throw new Error(`AI API failed: ${aiResponse.status} - ${errorText}`);
      }

      const data = await aiResponse.json();
      console.log("AI API success response received");
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const recommendationsText = data.candidates[0].content.parts[0].text;
        console.log("Raw AI response:", recommendationsText);
        
        const parsedData = JSON.parse(recommendationsText);
        const recommendations = parsedData.recommendations || [];
        
        console.log("Parsed recommendations:", recommendations);
        setAiRecommendations(recommendations);
        setShowAIRecommendations(true);
      } else {
        console.error("Invalid AI response format:", data);
        throw new Error("Invalid response format from AI");
      }
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      Alert.alert("AI Error", "Failed to get design recommendations. Please try again.");
    } finally {
      console.log("AI loading completed, setting aiLoading to false");
      setAiLoading(false);
    }
  };

  const handleRecommendationSelect = (recommendation) => {
    setSelectedRecommendation(recommendation);
    Alert.alert(
      "Style Selected",
      `You selected: ${recommendation.style_name} (${recommendation.suitability_percentage}% match)`,
      [
        {
          text: "Use This Style",
          onPress: () => {
            console.log("Selected style:", recommendation.style_name);
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  const handleSubmit = async () => {
    if (!projectName.trim()) {
      Alert.alert("Error", "Please enter project name");
      return;
    }
    if (isExterior && !selectedAngle) {
      Alert.alert("Error", "Please select house angle");
      return;
    }
    if (!uploadedPhoto?.uri) {
      Alert.alert("Error", "Photo is missing!");
      return;
    }

    // Log the complete payload before making the API call
    console.log("🚀 ========== FINAL SUBMISSION PAYLOAD ========== 🚀");
    
    // Use selected AI recommendation if available, otherwise use original style
    const selectedStyleName = selectedRecommendation 
      ? selectedRecommendation.style_name 
      : (style?.name || "Modern");
    
    const aiInterventionLevel = ["Very Low", "Low", "Mid", "Extreme", "Extreme"][aiInvention - 1];
    
    // Log all form data
    console.log("📋 FORM DATA:");
    console.log("Project Name:", projectName.trim());
    console.log("Design Type:", isExterior ? "Exterior" : "Interior");
    console.log("Room Type:", !isExterior ? (roomType || elementName || "Unknown") : "N/A");
    console.log("House Angle:", isExterior ? selectedAngle : "N/A");
    console.log("Design Style:", selectedStyleName);
    console.log("AI Intervention Level:", aiInterventionLevel);
    console.log("Number of Designs:", designCount);
    console.log("Keep Structural Elements:", "false");
    console.log("Photo URI:", getFixedUri(uploadedPhoto.uri));
    console.log("Photo MIME Type:", uploadedPhoto.mimeType || "image/jpeg");
    console.log("Photo File Name:", uploadedPhoto.fileName || `design_${Date.now()}.jpg`);
    
    console.log("🎯 SELECTED AI RECOMMENDATION:", selectedRecommendation);
    console.log("==============================================");

    setLoading(true);
    const formData = new FormData();
    formData.append("name", projectName.trim());
    formData.append("design_type", isExterior ? "Exterior" : "Interior");
    if (!isExterior) {
      formData.append("room_type", roomType || elementName || "Unknown");
    }
    if (isExterior) {
      formData.append("house_angle", selectedAngle);
    }
    
    formData.append("design_style", selectedStyleName);
    formData.append("ai_intervention", aiInterventionLevel);
    formData.append("no_designs", designCount);
    formData.append("keep_structural_elements", "false");
    
    // Image append with proper structure
    formData.append("image", {
      uri: getFixedUri(uploadedPhoto.uri),
      type: uploadedPhoto.mimeType || "image/jpeg",
      name: uploadedPhoto.fileName || `design_${Date.now()}.jpg`,
    });

    // Log FormData content
    console.log("📦 FORM DATA OBJECT:");
    console.log("FormData entries:");
    // Note: FormData entries can't be directly logged, but we can log what we added
    console.log("- name:", projectName.trim());
    console.log("- design_type:", isExterior ? "Exterior" : "Interior");
    if (!isExterior) console.log("- room_type:", roomType || elementName || "Unknown");
    if (isExterior) console.log("- house_angle:", selectedAngle);
    console.log("- design_style:", selectedStyleName);
    console.log("- ai_intervention:", aiInterventionLevel);
    console.log("- no_designs:", designCount);
    console.log("- keep_structural_elements:", "false");
    console.log("- image: [File object]");
    console.log("==============================================");
    
    try {
      const response = await apiClient.post("/api/v1/design/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 120000,
      });
      
      Alert.alert("Success", "Your AI designs are being generated!", [
        {
          text: "View Projects",
          onPress: () => {
            router.replace({
              pathname: "/pages/compare-result",
              params: {
                project: JSON.stringify(response.data),
              },
            });
          },
        },
      ]);
    } catch (error) {
      let message = "Failed to create project. Please try again.";
      if (error.message?.includes("Network")) {
        message = "No internet connection. Check your network.";
      } else if (error.response?.status === 401) {
        message = "Session expired. Please login again.";
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  const getCreativityInfo = (value) => {
    const labels = ["Very Low", "Low", "Medium", "High", "Extreme"];
    const colors = ["#FF6B6B", "#FFA726", "#29B6F6", "#7E57C2", "#EC407A"];
    const emojis = ["😴", "😊", "💡", "🚀", "🔥"];
    return { label: labels[value - 1], color: colors[value - 1], emoji: emojis[value - 1] };
  };

  const calculateThumbPosition = () => {
    if (sliderWidth === 0) return 0;
    const stepWidth = sliderWidth / 4;
    return (aiInvention - 1) * stepWidth;
  };

  const creativityInfo = getCreativityInfo(aiInvention);

  return (
    <SafeAreaView className="flex-1 bg-[#F5F6FA]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text20 className="text-center font-bold text-[#333] mb-4">
          Complete Your Project
        </Text20>
   

        {/* AI Recommendation Button with Gradient */}
        <View className="mb-6 rounded-2xl">
          <Animated.View>
          
              <LinearGradient
                colors={['#0461A6', '#034372']}
              
                style={{
               
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 16,
                  paddingHorizontal:16,
                  borderRadius:16,
                  opacity: aiLoading ? 0.7 : 1
                }}
              
              >
                  <View className="flex-row w-full  justify-between gap-3 mb-2">
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
                        <Text className="text-[#F5F6FA] text-sm font-normal my-4 ">
          Our AI has analyzed your room's dimensions, lighting, architectural
          features, and existing elements to recommend styles that would work
          best for your space.
        </Text>
                  <TouchableOpacity
              onPress={getAIRecommendations}
              disabled={aiLoading}
              className="rounded-2xl w-full mx-4 bg-white p-4 flex flex-row justify-center shadow-lg overflow-hidden"
            >
                {aiLoading ? (
                  <>
                    <ActivityIndicator color="white" size="small" style={{ marginRight: 8 }} />
                    <Text className="text-[#034372] text-base font-semibold">
                      Analyzing Your Photo...
                    </Text>
                  </>
                ) : (
                  <>
                    <Text className="text-white text-lg font-bold mr-2">✨</Text>
                    <Text className="text-[#034372]  text-base font-semibold">
                      Get AI Style Recommendations
                    </Text>
                  </>
                )}
            </TouchableOpacity>
              </LinearGradient>
          </Animated.View>
          
          {aiLoading && (
            <View className="mt-3 bg-blue-50 rounded-lg p-3">
              <Text className="text-blue-800 text-sm text-center">
                🔍 AI is analyzing your photo and generating style recommendations...
              </Text>
              <Text className="text-blue-600 text-xs text-center mt-1">
                This may take a few seconds
              </Text>
            </View>
          )}
        </View>

        {/* AI Recommendations */}
        {showAIRecommendations && (
          <Animated.View 
            style={{ 
              opacity: fadeAnim, 
              transform: [{ translateY: slideAnim }] 
            }}
            className="mb-6 mx-4"
          >
            <View className="bg-white rounded-2xl p-5 shadow-lg">
              <View className="flex-row items-center justify-between mb-4">
                <Text16Bold className="text-[#0461A6]">
                  🎯 AI Style Recommendations
                </Text16Bold>
                <TouchableOpacity onPress={() => setShowAIRecommendations(false)}>
                  <Text className="text-gray-500 text-lg">✕</Text>
                </TouchableOpacity>
              </View>
              
              <Text14 className="text-gray-600 mb-4">
                Tap on any style to select it for your project
              </Text14>
              
              {aiRecommendations.map((rec, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleRecommendationSelect(rec)}
                  className={`flex-row justify-between items-center py-3 border-b border-gray-100 ${
                    selectedRecommendation?.style_name === rec.style_name 
                      ? 'bg-blue-50 rounded-lg mx-2 px-2' 
                      : ''
                  }`}
                >
                  <View className="flex-row items-center flex-1">
                    <View className={`w-8 h-8 rounded-full justify-center items-center mr-3 ${
                      selectedRecommendation?.style_name === rec.style_name 
                        ? 'bg-[#0461A6]' 
                        : 'bg-blue-50'
                    }`}>
                      <Text className={`font-bold text-sm ${
                        selectedRecommendation?.style_name === rec.style_name 
                          ? 'text-white' 
                          : 'text-[#0461A6]'
                      }`}>
                        {index + 1}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className={`font-medium ${
                        selectedRecommendation?.style_name === rec.style_name 
                          ? 'text-[#0461A6] font-bold' 
                          : 'text-gray-800'
                      }`}>
                        {rec.style_name}
                      </Text>
                      {selectedRecommendation?.style_name === rec.style_name && (
                        <Text className="text-[#0461A6] text-xs mt-1">
                          ✓ Selected for your project
                        </Text>
                      )}
                    </View>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${
                    rec.suitability_percentage >= 80 ? 'bg-green-50' :
                    rec.suitability_percentage >= 70 ? 'bg-yellow-50' : 'bg-orange-50'
                  }`}>
                    <Text className={`text-sm font-bold ${
                      rec.suitability_percentage >= 80 ? 'text-green-700' :
                      rec.suitability_percentage >= 70 ? 'text-yellow-700' : 'text-orange-700'
                    }`}>
                      {rec.suitability_percentage}%
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              
              {selectedRecommendation && (
                <View className="mt-4 p-3 bg-green-50 rounded-lg">
                  <Text className="text-green-800 text-sm text-center">
                    Selected: <Text className="font-bold">{selectedRecommendation.style_name}</Text> will be used for your project
                  </Text>
                </View>
              )}
              
              <Text14 className="text-gray-500 mt-3 text-center">
                Based on analysis of your photo • Tap to select any style
              </Text14>
            </View>
          </Animated.View>
        )}

        {/* Rest of your form components remain the same */}
        <View className="mb-6">
          <Text16Bold>Project Name</Text16Bold>
          <TextInput
            value={projectName}
            onChangeText={setProjectName}
            placeholder="e.g. My Dream Bedroom"
            className="bg-white rounded-xl px-4 py-4 mt-2 border border-gray-200"
          />
        </View>

        {isExterior && (
          <View className="mb-6 bg-white rounded-xl p-5 mx-4">
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
                <Text className="text-gray-700 text-base">{angle.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="mb-6 bg-white rounded-2xl p-6 shadow-sm ">
          <View className="flex-row justify-between items-center mb-4">
            <Text16Bold>AI Creativity Level</Text16Bold>
            <View className="px-3 py-1 rounded-full" style={{ backgroundColor: `${creativityInfo.color}15` }}>
              <Text className="text-xs font-bold" style={{ color: creativityInfo.color }}>
                {creativityInfo.emoji} {creativityInfo.label}
              </Text>
            </View>
          </View>
          <View className="relative mb-8" onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}>
            <View className="h-2 bg-gray-100 rounded-full">
              <View
                className="h-2 rounded-full absolute"
                style={{ width: `${(aiInvention - 1) * 25}%`, backgroundColor: creativityInfo.color }}
              />
            </View>
            <View className="absolute top-[-12px] w-8 h-8 justify-center items-center" style={{ left: calculateThumbPosition() - 14 }}>
              <View
                className="w-7 h-7 rounded-full justify-center items-center"
                style={{
                  backgroundColor: creativityInfo.color,
                  shadowColor: creativityInfo.color,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <View className="w-2 h-2 bg-white rounded-full" />
              </View>
            </View>
            <View className="flex-row justify-between mt-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <TouchableOpacity key={step} className="items-center" onPress={() => setAiInvention(step)}>
                  <View
                    className={`w-3 h-3 rounded-full ${step <= aiInvention ? 'border-2 border-white' : ''}`}
                    style={{ backgroundColor: step <= aiInvention ? creativityInfo.color : '#D1D5DB' }}
                  />
                  <Text
                    className={`text-xs mt-1 ${step === aiInvention ? 'font-bold' : 'text-gray-500'}`}
                    style={{ color: step === aiInvention ? creativityInfo.color : '#6B7280' }}
                  >
                    {step}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Slider
              style={{ height: 40, position: 'absolute', width: '100%', top: -15, opacity: 0 }}
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
          <View className="bg-blue-50 rounded-xl p-3 mt-2">
            <Text className="text-xs text-blue-800 text-center">
              {aiInvention === 1 && "Predictable • Safe • Traditional"}
              {aiInvention === 2 && "Balanced • Reliable • Subtle Innovation"}
              {aiInvention === 3 && "Creative Mix • Modern • Balanced"}
              {aiInvention === 4 && "Bold • Unique • Highly Innovative"}
              {aiInvention === 5 && "Extreme • Revolutionary • Maximum Creativity"}
            </Text>
          </View>
        </View>

        <View className="mb-8 z-50">
          <Text16Bold className="mb-2">Number of Designs</Text16Bold>
          <DropDownPicker
            open={openDesignCount}
            value={designCount}
            items={DESIGN_COUNTS}
            setOpen={setOpenDesignCount}
            setValue={setDesignCount}
            placeholder="Select number of designs"
            style={{ backgroundColor: "white", borderColor: "#ddd", borderRadius: 12, borderWidth: 1 }}
            dropDownContainerStyle={{ backgroundColor: "white", borderColor: "#ddd", borderRadius: 12 }}
            zIndex={5000}
            zIndexInverse={4000}
          />
        </View>

        <View className="mb-10">
          <Button
            onPress={handleSubmit}
            variant="primary"
            disabled={loading || !projectName.trim() || (isExterior && !selectedAngle)}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              `Generate AI Designs ${selectedRecommendation ? `with ${selectedRecommendation.style_name}` : ''}`
            )}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectDetailsForm;