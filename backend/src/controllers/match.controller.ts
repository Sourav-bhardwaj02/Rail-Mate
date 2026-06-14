import { Request, Response } from "express";
import { getAllMatches } from "../services/match.service";

export const getMatches = async (
  req: Request,
  res: Response
) => {
  try {
    const matches =
      await getAllMatches();

    res.json({
      success: true,
      data: matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};