import { Router } from "express";
import { addBackgroundController, deleteBackgroundController } from "./controller";
import upload from "../../utils/upload";
import { checkBackgroundExists } from "../../middleware";

const router = Router();

// add background
router.post("/", upload.single("background"), addBackgroundController);
// delete background
router.delete("/:id", deleteBackgroundController); 

export default router;
