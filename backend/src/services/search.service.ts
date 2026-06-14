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

<<<<<<< HEAD
    const aiServiceUrl =
      process.env.AI_SERVICE_URL || "http://localhost:8000";

    const response =
      await axios.post(
        `${aiServiceUrl}/api/analyze-frame`,
=======
    const response =
      await axios.post(
        "http://localhost:8000/api/analyze-frame",
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
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