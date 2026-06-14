import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const analyzeImage = async (
  base64Image: string
) => {
  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
        `
        Analyze this person.

        Return:
        age estimate,
        gender,
        clothing,
        hair,
        notable features
        `,
      ],
    });

  return response.text;
};