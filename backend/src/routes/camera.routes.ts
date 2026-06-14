import { Router } from "express";

<<<<<<< HEAD
import { upload } from "../middleware/upload.middleware";
=======
import { upload } from "../../../../backend/src/middleware/upload.middleware";
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98

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