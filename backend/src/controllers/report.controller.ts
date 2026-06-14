import { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

import {
  createReport,
  getAllReports,
} from "../services/report.service";

export const createNewReport = async (
  req: Request,
  res: Response
) => {
  try {

    const files =
      req.files as Express.Multer.File[];

    const image1 =
      files?.[0]?.filename || null;

    const image2 =
      files?.[1]?.filename || null;

    const image3 =
      files?.[2]?.filename || null;

    const report =
      await createReport({
        ...req.body,
        image1,
        image2,
        image3,
      });
<<<<<<< HEAD

    const personId = `person_${report.id}`;
    const aiServiceUrl =
      process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

    if (files?.[0]) {

      try {

        const formData =
          new FormData();

        formData.append(
          "person_id",
          personId
        );

        formData.append(
          "image",
          fs.createReadStream(
            path.join(
              "uploads",
              files[0].filename
            )
          )
        );

        const aiResponse =
          await axios.post(
            `${aiServiceUrl}/api/upload-person`,
            formData,
            {
              headers:
                formData.getHeaders(),
            }
          );

        console.log(
          "AI REGISTERED:",
          aiResponse.data
        );

      } catch (err) {

        console.error(
          "AI REGISTER ERROR:",
          err
        );

      }

    }

    return res.status(201).json({
      success: true,
      data: report,
      personId,
=======
if (files?.[0]) {

  try {

    const formData =
      new FormData();

    formData.append(
      "person_id",
      "person1"
    );

    formData.append(
      "image",
      fs.createReadStream(
        path.join(
          "uploads",
          files[0].filename
        )
      )
    );

    const aiResponse =
      await axios.post(
        "http://127.0.0.1:8000/api/upload-person",
        formData,
        {
          headers:
            formData.getHeaders(),
        }
      );

    console.log(
      "AI REGISTERED:",
      aiResponse.data
    );

  } catch (err) {

    console.error(
      "AI REGISTER ERROR:",
      err
    );

  }

}
    return res.status(201).json({
      success: true,
      data: report,
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed To Create Report",
    });
  }
};

export const getReports = async (
  req: Request,
  res: Response
) => {
  try {

    const reports =
      await getAllReports();

    return res.json({
      success: true,
      data: reports,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
    });
  }
};