import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ai from "../../assets/Icon/Ai.svg";
import Back from "../../assets/images/back.svg";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { Text12, Text16Bold } from "../../components/ui/Typography";

const RecommendedStyles = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  const { path, roomType, elementName, photo } = params;
  const parsedPhoto = photo ? JSON.parse(photo) : null;
  const isExterior = path === "exterior";

  // Helper function to fix URI for Android
  const getFixedUri = (uri) => {
    if (!uri) return uri;
    if (Platform.OS === "android") {
      return uri.startsWith("file://") ? uri : `file://${uri}`;
    }
    return uri;
  };

  useEffect(() => {
    fetchAIRecommendations();
  }, []);

  const fetchAIRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Photo data:", parsedPhoto?.uri);

      // Check if we have photo data
      if (!parsedPhoto?.uri) {
        console.log("No photo data available, using mock data");
        setAiRecommendations(getMockRecommendations());
        setLoading(false);
        return;
      }

      console.log("Starting AI analysis...");

      // Convert image to base64 - SAME APPROACH AS ProjectDetailsForm
      const response = await fetch(getFixedUri(parsedPhoto.uri));
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      console.log("Image blob created, size:", blob.size);

      const base64data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const result = reader.result;
          if (result) {
            const base64 = result.split(",")[1];
            console.log("Base64 data length:", base64.length);
            resolve(base64);
          } else {
            reject(new Error("Failed to convert image to base64"));
          }
        };
        reader.onerror = () => reject(new Error("FileReader error"));
      });

      const apiKey = "AIzaSyAKx6GienYoifGEEbR2gA67BSFmBxJhyBE";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      // Define allowed styles based on interior/exterior
      const allowedStyles = isExterior
        ? "No Style, Modern, Mediterranean, International, Moody Colors, Wood Accents, Bohemian, Industrial, Retreat, Elegant, Painted Brick, Red Brick, Modern Blend, Stone Clad, Glass House, Ranch, Modern Farm House, Portuguese, Traditional, Craftsman, Tudor, Prairie, Chalet, Colonial, Dutch Colonial, Georgian, Green, Contemporary, Christmas, Cottage, Farmhouse, French Country, Futuristic, Gothic, Greek Revival, Mansion, Townhouse, Victorian, Corporate Building, Baroque, Art Deco, Neo Classical, Mission Revival, Bauhaus, Rustic Modern, Tropical, Beach House, Urban Industrial, Victorian Gothic, Italianate, Spanish Colonial Revival, Desert Modern, Log Cabin, Eco Friendly, Alpine, Dutch Gable, A Frame, Shingle Style, Regency, Vernacular, Neo Tudor, Southwestern, Cape Cod, Federal, French Eclectic, Renaissance Revival, Split Level, Cuban Colonial, Modern Scandinavian"
        : "Modern, Mediterranean, International, Moody Colors, Wood Accents, Bohemian, Industrial, Retreat, Elegant, Painted Brick, Red Brick, Modern Blend, Stone Clad, Glass House, Ranch, Modern Farm House, Portuguese, Traditional, Craftsman, Tudor, Prairie, Chalet, Colonial, Dutch Colonial, Georgian, Green, Contemporary, Christmas, Cottage, Farmhouse, French Country, Futuristic, Gothic, Greek Revival, Mansion, Townhouse, Victorian, Corporate Building, Baroque, Art Deco, Neo Classical, Mission Revival, Bauhaus, Rustic Modern, Tropical, Beach House, Urban Industrial, Victorian Gothic, Italianate, Spanish Colonial Revival, Desert Modern, Log Cabin, Eco Friendly, Alpine, Dutch Gable, A Frame, Shingle Style, Regency, Vernacular, Neo Tudor, Southwestern, Cape Cod, Federal, French Eclectic, Renaissance Revival, Split Level, Cuban Colonial, Modern Scandinavian";

      const promptText = isExterior
        ? `Analyze the attached image of an **Exterior ${
            elementName || "Building"
          }**. Based on the visual elements, generate a list of **5** design style recommendations.\n\n**Instructions:**\n1. **ONLY** select styles from the following list. Do not use any style not listed.\n2. Rank the recommendations from the most suitable (highest percentage) to the least suitable.\n3. Express the suitability as a whole number percentage (e.g., 85) in the 'suitability_percentage' field.\n\n**Allowed Styles:** ${allowedStyles}`
        : `Analyze the attached image of an **Interior ${
            roomType || "Living Room"
          }**. Based on the visual elements, generate a list of **5** design style recommendations.\n\n**Instructions:**\n1. **ONLY** select styles from the following list. Do not use any style not listed.\n2. Rank the recommendations from the most suitable (highest percentage) to the least suitable.\n3. Express the suitability as a whole number percentage (e.g., 85) in the 'suitability_percentage' field.\n\n**Allowed Styles:** ${allowedStyles}`;

      const payload = {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64data,
                },
              },
              {
                text: promptText,
              },
            ],
          },
        ],
        systemInstruction: {
          parts: [
            {
              text: "You are a highly constrained, expert Interior and exterior design recommender. You strictly adhere to all output formatting and style constraints provided by the user.",
            },
          ],
        },
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              recommendations: {
                type: "array",
                description:
                  "A list of 5 design style recommendations, ranked by suitability from 1 to 5.",
                items: {
                  type: "object",
                  properties: {
                    style_name: {
                      type: "string",
                      description:
                        "The name of the design style, selected ONLY from the provided allowed list.",
                    },
                    suitability_percentage: {
                      type: "integer",
                      description:
                        "The suitability percentage for this style (e.g., 85), as a whole number between 60 and 100.",
                    },
                  },
                  required: ["style_name", "suitability_percentage"],
                },
              },
            },
            required: ["recommendations"],
          },
        },
      };

      console.log("Sending AI request to Gemini API...");

      const aiResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("AI API response status:", aiResponse.status);

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error("AI API error response:", errorText);
        throw new Error(`AI API failed: ${aiResponse.status}`);
      }

      const data = await aiResponse.json();
      console.log("AI API success response received");

      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const recommendationsText = data.candidates[0].content.parts[0].text;
        console.log("Raw AI response:", recommendationsText);

        const parsedData = JSON.parse(recommendationsText);
        const recommendations = parsedData.recommendations || [];

        console.log("Parsed recommendations:", recommendations);

        // Add IDs to recommendations for selection
        const recommendationsWithIds = recommendations.map((rec, index) => ({
          ...rec,
          id: index + 1,
        }));

        setAiRecommendations(recommendationsWithIds);
        setError(null);
      } else {
        console.error("Invalid AI response format:", data);
        throw new Error("Invalid response format from AI");
      }
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      setError("Failed to get AI recommendations. Using demo data instead.");
      // Fallback to mock recommendations
      setAiRecommendations(getMockRecommendations());
    } finally {
      console.log("AI loading completed");
      setLoading(false);
    }
  };

  // Mock recommendations for demo purposes
  const getMockRecommendations = () => {
    const interiorStyles = [
      { style_name: "Modern", suitability_percentage: 94, id: 1 },
      { style_name: "Contemporary", suitability_percentage: 87, id: 2 },
      { style_name: "Minimalist", suitability_percentage: 82, id: 3 },
      { style_name: "Scandinavian", suitability_percentage: 78, id: 4 },
      { style_name: "Industrial", suitability_percentage: 72, id: 5 },
    ];

    const exteriorStyles = [
      { style_name: "Modern", suitability_percentage: 92, id: 1 },
      { style_name: "Traditional", suitability_percentage: 85, id: 2 },
      { style_name: "Contemporary", suitability_percentage: 80, id: 3 },
      { style_name: "Craftsman", suitability_percentage: 75, id: 4 },
      { style_name: "Farmhouse", suitability_percentage: 70, id: 5 },
    ];

    return isExterior ? exteriorStyles : interiorStyles;
  };

  const handleSelect = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleContinue = () => {
    if (!selectedId) return;

    const selectedStyle = aiRecommendations.find(
      (item) => item.id === selectedId
    );

    router.push({
      pathname: "/pages/project-details-form",
      params: {
        path,
        roomType: roomType || "",
        elementName: elementName || "",
        selectedStyle: JSON.stringify(selectedStyle),
        photo: photo || "",
      },
    });
  };

  const handleBackToStyles = () => {
    router.back();
  };

  const retryAIRecommendations = () => {
    setLoading(true);
    setError(null);
    fetchAIRecommendations();
  };

  return (
    <View className="flex-1">
      <View className="mt-6">
        <Header
          left={<Back />}
          onLeftPress={() => router.back()}
          title="AI Style Recommendations"
          right={""}
          rightWidth={60}
        />
      </View>
      <Text16Bold className="mt-4">AI Style Recommendations</Text16Bold>
      <Text12 className="text-gray-600 mb-4">
        Our AI has analyzed your {isExterior ? "exterior" : "room"} and suggests
        these styles
      </Text12>
      <View className="bg-[#0461A6] p-4 my-4 rounded-2xl">
        <View className="flex-row justify-between gap-3 mb-2">
          <View className="flex-row gap-3">
            <Ai />
            <Text className="text-[#FFFFFF] text-[16px] font-semibold mt-2">
              AI Analysis
            </Text>
          </View>
          <View>
            <Text className="text-[#FFFFFF] text-right text-[18px] font-semibold">
              {aiRecommendations[0]?.suitability_percentage || 94}%{" "}
            </Text>
            <Text className="text-[#F5F6FA] text-right text-[14px]">
              Match Confidence
            </Text>
          </View>
        </View>
        <Text className="text-[#F5F6FA] text-sm font-normal">
          Our AI has analyzed your{" "}
          {isExterior
            ? "exterior dimensions, architectural features"
            : "room's dimensions, lighting, architectural features"}{" "}
          and existing elements to recommend styles that would work best for
          your space.
        </Text>

        {error && (
          <View className="mt-3">
            <Text className="text-[#FFBABA] text-sm font-normal mb-2">
              {error}
            </Text>
            <TouchableOpacity
              onPress={retryAIRecommendations}
              className="bg-white px-4 py-2 rounded-lg self-start"
            >
              <Text className="text-[#0461A6] font-semibold">
                Retry AI Analysis
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {loading && (
          <Text className="text-[#F5F6FA] text-sm font-normal mt-2">
            🔍 Analyzing your image with AI...
          </Text>
        )}
      </View>

      {/* Recommended Styles */}
      <ScrollView className="mt-4 flex-1">
        {loading ? (
          <View className="py-8">
            <Text className="text-center text-gray-600 mb-4">
              🔍 Analyzing your space with AI...
            </Text>
            <Text className="text-center text-gray-500 text-xs">
              This may take a few seconds
            </Text>
          </View>
        ) : (
          aiRecommendations.map((item, index) => {
            const isSelected = selectedId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={1}
                onPress={() => handleSelect(item.id)}
                className={`flex-row p-4 rounded-xl mb-3 bg-[#FFFFFF] border ${
                  isSelected ? "border-[#0461A6] " : "border-gray-200"
                }`}
              >
                {/* Style Number */}
                <View className="w-12 h-12 rounded-lg mr-3 bg-gray-100 justify-center items-center">
                  <Text className="font-bold text-gray-600">#{index + 1}</Text>
                </View>

                {/* Texts */}
                <View className="flex-1">
                  <Text className="font-semibold text-[14px] text-[#000000]">
                    {item.style_name}
                  </Text>
                  <Text className="text-[13px] text-[#A5A5A5]">
                    AI recommended based on your space analysis
                  </Text>
                  <Text className="text-[#20C375] text-[12px] font-medium">
                    {item.suitability_percentage}% Match
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
          })
        )}
      </ScrollView>
      <View className="flex-row justify-between mt-4">
        <View className="flex-1 mr-2">
          <Button variant="beta" onPress={handleBackToStyles}>
            Back to Styles
          </Button>
        </View>
        <View className="flex-1 ml-2">
          <Button
            variant="primary"
            onPress={handleContinue}
            disabled={!selectedId || loading}
          >
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
};

export default RecommendedStyles;
