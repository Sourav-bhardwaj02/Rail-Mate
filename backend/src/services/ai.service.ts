import axios from "axios";

const AI_URL = "http://localhost:8000/api";

export const sendImageToAI = async (
  imagePath: string
) => {
  try {
    const response = await axios.post(
      `${AI_URL}/upload-person`,
      {
        imagePath,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "AI Service Error:",
      error
    );

    return null;
  }
};