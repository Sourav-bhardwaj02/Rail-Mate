import { Request, Response } from "express";

import { saveProfile } from "../services/profile.service";

export const createProfile = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      reportId
    } = req.body;

    const dummyProfile = {
      age: "20-25",
      gender: "Male",
      clothing: "Black T-Shirt",
      hair: "Short Black Hair",
      features: "Beard"
    };

    const result =
      await saveProfile(
        Number(reportId),
        dummyProfile
      );

    return res.json({
      success: true,
      profile: result
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false
    });
  }
};