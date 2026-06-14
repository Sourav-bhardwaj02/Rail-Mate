import { Request, Response } from "express";

export const uploadImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];

    const imagePaths = files.map(
      (file) => file.path
    );

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      imagePaths,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload Failed",
    });
  }
};