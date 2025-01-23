import { Router } from "express";
import { addBackgroundController } from "./controller";
import upload from "../../utils/upload";

const router = Router();

// add background
router.post("/", upload.single("background"), addBackgroundController);

export default router;
