import { NextFunction, Response, Request } from "express";
import { ErrorWithStatus } from "../../types";
import { createAssetCategorySchema } from "../../schemas/assetCategory";
import { HttpStatusCode } from "../../constants";
import {
  addAssetCategoryService,
  deleteAssetCategoryService,
  getAssetCategoriesService,
  updateAssetCategoryService,
} from "./service";
export const addAssetCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name } = req.body;

    const assetCategory = await addAssetCategoryService(name);

    res.status(HttpStatusCode.Created).json({ success: true, assetCategory });
  } catch (error) {
    return next(error);
  }
};

export const getAssetCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const assetCategories = await getAssetCategoriesService();
    res.status(HttpStatusCode.OK).json({ success: true, assetCategories });
  } catch (error) {
    return next(error);
  }
};

export const updateAssetCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await updateAssetCategoryService(id, name);
    res.status(HttpStatusCode.OK).json({ success: true, updatedCategory });
  } catch (error) {
    return next(error);
  }
};

export const deleteAssetCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedCategory = await deleteAssetCategoryService(id);
    res.status(HttpStatusCode.OK).json({ success: true, deletedCategory });
  } catch (error) {
    return next(error);
  }
};
