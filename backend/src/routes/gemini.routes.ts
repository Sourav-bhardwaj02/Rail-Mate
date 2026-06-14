import { Router } from "express";

import { upload } from "../middleware/upload.middleware";

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