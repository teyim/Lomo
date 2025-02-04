import { Router } from "express";
import {
  addBackgroundController,
  deleteBackgroundController,
  getAllBackgroundsController,
  updateBackgroundController,
} from "./controller";
import upload from "../../utils/upload";

const router = Router();

// add background
router.post("/", upload.single("background"), addBackgroundController);
// delete background
router.delete("/:id", deleteBackgroundController);
// get all backgrounds
router.get("/", getAllBackgroundsController);
//update background
router.put("/:id", upload.single("background"), updateBackgroundController);

export default router;
