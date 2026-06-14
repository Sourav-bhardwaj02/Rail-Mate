import { Router } from "express";

<<<<<<< HEAD
import { upload } from "../middleware/upload.middleware";
=======
import { upload } from "../../../../backend/src/middleware/upload.middleware";
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98

import {
  analyzePerson,
} from "../controllers/gemini.controller";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  analyzePerson
);

export default router;