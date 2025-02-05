import { Router } from "express";
import { getLayoutsController } from "./controller";

const router = Router();

router.get("/", getLayoutsController);

export default router;