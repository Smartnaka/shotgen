import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-image';

const generateImageFromApi = async (base64Data: string, mimeType: string, prompt: string): Promise<string> => {
    const fullPrompt = `You are an expert headshot photographer. Your task is to edit the provided selfie into a professional headshot.
Style request: "${prompt}"

**CRITICAL INSTRUCTIONS:**
1.  **PRESERVE IDENTITY:** The final image must be of the **exact same person**. Do NOT alter their facial features, bone structure, skin tone, eye color, or unique characteristics.
2.  **EDIT, DO NOT REPLACE:** You are only changing the background, lighting, and clothing to match the style request. You are NOT generating a new person. The result must be a photorealistic edit of the original individual.`;
    
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Data,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: fullPrompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart && firstPart.inlineData) {
            return firstPart.inlineData.data;
        } else {
            throw new Error('No image data found in the API response.');
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate image with Gemini API.");
    }
}

export const generateHeadshot = async (base64Image: string, mimeType: string, stylePrompt: string): Promise<string> => {
    // The base64 string from file reader includes the mime type prefix, which we need to remove.
    const pureBase64 = base64Image.split(',')[1];
    return generateImageFromApi(pureBase64, mimeType, stylePrompt);
};

export const editHeadshot = async (base64Image: string, mimeType: string, editPrompt: string): Promise<string> => {
    // This base64 string is already pure.
    return generateImageFromApi(base64Image, mimeType, editPrompt);
};