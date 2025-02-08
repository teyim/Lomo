// src/routes/assetCategoryRoutes.ts
import { Router } from 'express';
import { validateData } from '../../middleware/validation';
import { createAssetCategorySchema, deleteAssetCategorySchema } from '../../schemas/assetCategory';
import { addAssetCategoryController, deleteAssetCategoryController, getAssetCategoriesController, updateAssetCategoryController } from './Controller';


const router = Router();

router.post("/", validateData(createAssetCategorySchema), addAssetCategoryController)
router.get("/", getAssetCategoriesController);
router.put("/:id", validateData(createAssetCategorySchema), updateAssetCategoryController);
router.delete("/:id", validateData(deleteAssetCategorySchema), deleteAssetCategoryController);

export default router;