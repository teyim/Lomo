import { prisma } from "@repo/db";
import { handleError } from "../../utils/errors";
import { ErrorMessages, HttpStatusCode } from "../../constants";
import { ErrorWithStatus } from "../../types/error";
import {
  addAssetCategory,
  fetchAllAssetCategories,
  updateAssetCategory,
  deleteAssetCategory,
} from "./data-access";

export const addAssetCategoryService = async (name: string) => {
  try {
    const existingCategory = await prisma.assetCategory.findUnique({
      where: { name: name },
    });

    if (existingCategory) {
      throw new ErrorWithStatus(
        ErrorMessages.ASSET_CATEGORY.EXIST(existingCategory.name),
        HttpStatusCode.Conflict,
      );
    }

    const background = await addAssetCategory(name);
    return background;
  } catch (error) {
    handleError(error);
  }
};

export const getAssetCategoriesService = async () => {
  try {
    const assetCategories = await fetchAllAssetCategories();
    return assetCategories;
  } catch (error) {
    handleError(error);
  }
};

export const updateAssetCategoryService = async (
  id: string,
  newName: string,
) => {
  try {
    const updatedCategory = await updateAssetCategory(id, newName);
    return updatedCategory;
  } catch (error) {
    handleError(error);
  }
};

export const deleteAssetCategoryService = async (id: string) => {
  try {
    const deletedCategory = await deleteAssetCategory(id);
    return deletedCategory;
  } catch (error) {
    handleError(error);
  }
};
