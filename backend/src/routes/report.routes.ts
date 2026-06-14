import { Router } from "express";

import {
  createNewReport,
  getReports,
} from "../controllers/report.controller";

import { upload } from "../middleware/upload.middleware";

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