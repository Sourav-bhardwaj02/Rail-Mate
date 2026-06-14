import { Request, Response } from "express";
import fs from "fs";

import { analyzeImage } from "../services/gemini.service";

export const analyzePerson =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const file =
        req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
        });
      }

      const image =
        fs.readFileSync(
          file.path
        );

      const base64 =
        image.toString(
          "base64"
        );

      const result =
        await analyzeImage(
          base64
        );

      res.json({
        success: true,
        result,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };