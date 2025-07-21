import { NextFunction, Response, Request } from "express";
import { ErrorWithStatus } from "../../types";
import { createAssetCategorySchema } from "../../schemas/assetCategory";
import { HttpStatusCode } from "../../constants";
import {
  addAssetCategoryService,
  deleteAssetCategoryService,
  getAssetCategoriesService,
  updateAssetCategoryService,
} from './service';

export const addAssetCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new Error('Category name is required');
    }
    const assetCategory = await addAssetCategoryService(name);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'asset category created successfully',
      assetCategory,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAssetCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      throw new Error('Category id is required');
    }
    if (!name) {
      throw new Error('Category name is required');
    }

    const updatedCategory = await updateAssetCategoryService(id, name);
    res.status(HttpStatusCode.OK).json({ success: true, updatedCategory });
  } catch (error) {
    return next(error);
  }
};

export const deleteAssetCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('Category id is required');
    }
    await deleteAssetCategoryService(id);
    res
      .status(HttpStatusCode.OK)
      .json({ success: true, message: 'asset category deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
