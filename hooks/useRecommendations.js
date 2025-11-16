// Halper/api.js
export const getDesignRecommendations = async (photoData, designType, roomType = "", elementName = "") => {
  try {
    const API_KEY = "AIzaSyAKx6GienYoifGEEbR2gA67BSFmBxJhyBE";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    // Determine the prompt based on design type
    const isExterior = designType === "exterior";
    
    const prompt = isExterior 
      ? `Analyze the attached image of an **Exterior ${elementName || "Building"}**. Based on the visual elements, generate a list of **5** design style recommendations.

**Instructions:**
1. **ONLY** select styles from the following list. Do not use any style not listed.
2. Rank the recommendations from the most suitable (highest percentage) to the least suitable.
3. Express the suitability as a whole number percentage (e.g., 85) in the 'suitability_percentage' field.

**Allowed Styles:** No Style, Modern, Mediterranean, International, Moody Colors, Wood Accents, Bohemian, Industrial, Retreat, Elegant, Painted Brick, Red Brick, Modern Blend, Stone Clad, Glass House, Ranch, Modern Farm House, Portuguese, Traditional, Craftsman, Tudor, Prairie, Chalet, Colonial, Dutch Colonial, Georgian, Green, Contemporary, Christmas, Cottage, Farmhouse, French Country, Futuristic, Gothic, Greek Revival, Mansion, Townhouse, Victorian, Corporate Building, Baroque, Art Deco, Neo Classical, Mission Revival, Bauhaus, Rustic Modern, Tropical, Beach House, Urban Industrial, Victorian Gothic, Italianate, Spanish Colonial Revival, Desert Modern, Log Cabin, Eco Friendly, Alpine, Dutch Gable, A Frame, Shingle Style, Regency, Vernacular, Neo Tudor, Southwestern, Cape Cod, Federal, French Eclectic, Renaissance Revival, Split Level, Cuban Colonial, Modern Scandinavian`
      
      : `Analyze the attached image of an **Interior ${roomType || "Room"}**. Based on the visual elements, generate a list of **5** design style recommendations.

**Instructions:**
1. **ONLY** select styles from the following list. Do not use any style not listed.
2. Rank the recommendations from the most suitable (highest percentage) to the least suitable.
3. Express the suitability as a whole number percentage (e.g., 85) in the 'suitability_percentage' field.

**Allowed Styles:** Modern, Mediterranean, International, Moody Colors, Wood Accents, Bohemian, Industrial, Retreat, Elegant, Painted Brick, Red Brick, Modern Blend, Stone Clad, Glass House, Ranch, Modern Farm House, Portuguese, Traditional, Craftsman, Tudor, Prairie, Chalet, Colonial, Dutch Colonial, Georgian, Green, Contemporary, Christmas, Cottage, Farmhouse, French Country, Futuristic, Gothic, Greek Revival, Mansion, Townhouse, Victorian, Corporate Building, Baroque, Art Deco, Neo Classical, Mission Revival, Bauhaus, Rustic Modern, Tropical, Beach House, Urban Industrial, Victorian Gothic, Italianate, Spanish Colonial Revival, Desert Modern, Log Cabin, Eco Friendly, Alpine, Dutch Gable, A Frame, Shingle Style, Regency, Vernacular, Neo Tudor, Southwestern, Cape Cod, Federal, French Eclectic, Renaissance Revival, Split Level, Cuban Colonial, Modern Scandinavian`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: photoData
              }
            },
            {
              text: prompt
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
              description: `A list of 5 design style recommendations, ranked by suitability from 1 to 5.`,
              items: {
                type: "object",
                properties: {
                  style_name: {
                    type: "string",
                    description: `The name of the design style, selected ONLY from the provided allowed list.`
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

    console.log("Sending API request...");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API response error:", errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("API response received:", data);
    
    // Extract the JSON response from the text
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const responseText = data.candidates[0].content.parts[0].text;
      const jsonResponse = JSON.parse(responseText);
      return jsonResponse.recommendations;
    } else {
      throw new Error("Invalid API response format");
    }

  } catch (error) {
    console.error("Error getting design recommendations:", error);
    
    // Return mock data as fallback based on design type
    const isExterior = designType === "exterior";
    return isExterior 
      ? [
          { style_name: "Modern", suitability_percentage: 94 },
          { style_name: "Traditional", suitability_percentage: 87 },
          { style_name: "Craftsman", suitability_percentage: 82 },
          { style_name: "Farmhouse", suitability_percentage: 78 },
          { style_name: "Contemporary", suitability_percentage: 72 }
        ]
      : [
          { style_name: "Modern", suitability_percentage: 94 },
          { style_name: "Contemporary", suitability_percentage: 87 },
          { style_name: "Minimalist", suitability_percentage: 82 },
          { style_name: "Scandinavian", suitability_percentage: 78 },
          { style_name: "Industrial", suitability_percentage: 72 }
        ];
  }
};