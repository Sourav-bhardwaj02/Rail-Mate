import axios from "axios";

export const comparePerson = async (
  profile: string,
  frame: string
) => {

  try {

    console.log(
      "FRAME RECEIVED"
    );

    console.log(
      "SENDING TO AI"
    );

    const aiServiceUrl =
      process.env.AI_SERVICE_URL || "http://localhost:8000";

    const response =
      await axios.post(
        `${aiServiceUrl}/api/analyze-frame`,
        {
          frame
        }
      );

    console.log(
      "AI RESPONSE:",
      response.data
    );

    return response.data;

  } catch (error: any) {

    console.error(
      "AI SERVICE ERROR:",
      error?.response?.data ||
      error.message
    );

    return {
      found: false,
      confidence: 0
    };
  }
};