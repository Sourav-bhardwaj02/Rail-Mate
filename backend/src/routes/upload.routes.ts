import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { uploadImages } from "../controllers/upload.controller";

const router = Router();

router.post(
  "/",
  upload.array("images", 3),
  uploadImages
);

export default router;