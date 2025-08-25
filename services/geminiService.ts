
import { GoogleGenAI, Type } from "@google/genai";
import type { NftMetadata } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("Image generation failed, no images returned.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image. The model may have refused the prompt. Please try a different description.");
  }
};

export const generateMetadata = async (prompt: string): Promise<NftMetadata> => {
  try {
    const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
       contents: `Based on this user prompt for an NFT image, generate metadata for it: "${prompt}"`,
       config: {
         systemInstruction: "You are an expert in creating compelling and creative metadata for NFTs. Generate a unique name, an engaging description, and 3-5 interesting attributes for the NFT. The name should be catchy and memorable. The description should be evocative and tell a story about the artwork. The attributes should be relevant and add to the NFT's lore.",
         responseMimeType: "application/json",
         responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: 'The creative and unique name of the NFT.',
              },
              description: {
                type: Type.STRING,
                description: 'An engaging and story-driven description for the NFT.',
              },
              attributes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    trait_type: {
                        type: Type.STRING,
                        description: "The category or type of the attribute (e.g., 'Background', 'Power', 'Style')."
                    },
                    value: {
                        type: Type.STRING,
                        description: "The specific value of the attribute (e.g., 'Cosmic', 'Starlight', 'Abstract')."
                    }
                  }
                },
                description: 'A list of traits and their values for the NFT.',
              },
            },
            required: ["name", "description", "attributes"]
          },
       },
    });

    const jsonStr = response.text.trim();
    const metadata = JSON.parse(jsonStr) as NftMetadata;
    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    throw new Error("Failed to generate NFT metadata. Please try again.");
  }
};
