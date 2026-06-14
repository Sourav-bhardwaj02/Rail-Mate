import { Router } from "express";

import { upload } from "../middleware/upload.middleware";

import {
  analyzeFrame
} from "../controllers/camera.controller";

const router = Router();

router.post(
  "/frame",
  upload.single("frame"),
  analyzeFrame
);

export default router;