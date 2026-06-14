import { Request, Response } from "express";

export const analyzeFrame = async (
  req: Request,
  res: Response
) => {
  try {

    const image = req.file;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No frame received"
      });
    }

    return res.json({
      success: true,
      message: "Frame received",
      filename: image.filename
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false
    });
  }
};