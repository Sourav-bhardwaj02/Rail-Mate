import { Request, Response, NextFunction } from "express";

export const validateReport = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    fullName,
    reporterName,
    reporterPhone,
  } = req.body;

  if (
    !fullName ||
    !reporterName ||
    !reporterPhone
  ) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }

  next();
};