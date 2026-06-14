import { Router } from "express";

import {
  searchPerson,
} from "../controllers/search.controller";

const router = Router();

router.post(
  "/",
  searchPerson
);

export default router;