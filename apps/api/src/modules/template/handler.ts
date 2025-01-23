import { Router } from "express";
import {
  getTemplateByIdController,
  getTemplatesController,
} from "./controller";

const router = Router();

// get all templates handler
router.get("/", getTemplatesController);

// get template by ID handler
router.get("/:id", getTemplateByIdController);

export default router;
