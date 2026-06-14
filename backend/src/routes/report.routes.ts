import { Router } from "express";

import {
  createNewReport,
  getReports,
} from "../controllers/report.controller";

<<<<<<< HEAD
import { upload } from "../middleware/upload.middleware";
=======
import { upload } from "../../../../backend/src/middleware/upload.middleware";
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98

const router = Router();

router.post(
  "/",
  upload.array("images", 3),
  createNewReport
);

router.get(
  "/",
  getReports
);

export default router;