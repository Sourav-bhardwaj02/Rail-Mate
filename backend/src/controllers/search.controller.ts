import { Request, Response } from "express";
import { comparePerson } from "../services/search.service";

export const searchPerson = async (
  req: Request,
  res: Response
) => {

  console.log(
    "FRAME RECEIVED"
  );

  try {

    const result =
      await comparePerson(
        req.body.profile,
        req.body.frame
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