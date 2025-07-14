import { handleError } from '../../utils/errors';
import { addBackground } from '../background/data-access';
import {
  addAsset,
  deleteAsset,
  getAllAssets,
  getAssetsByCategory,
  updateAsset,
} from './data-access';
import { deleteSupabaseObject } from '../../utils';

export const addAssetService = async (
  name: string,
  imgUrl: string,
  imgKey: string,
  categoryId: string
) => {
  try {
    const asset = await addAsset(name, imgUrl, imgKey, categoryId);
    return asset;
  } catch (error) {
    handleError(error);
  }
};

export const getAllAssetsService = async () => {
  try {
    const assets = await getAllAssets();
    return assets;
  } catch (error) {
    handleError(error);
  }
};

export const getAssetsByCategoryService = async (categoryId: string) => {
  try {
    const assets = await getAssetsByCategory(categoryId);
    return assets;
  } catch (error) {
    handleError(error);
  }
};

export const deleteAssetService = async (id: string) => {
  try {
    await deleteAsset(id);
  } catch (error) {
    handleError(error);
  }
};

// update asset service
export const updateAssetService = async (
  id: string,
  name: string,
  imgUrl: string,
  imgKey: string,
  categoryId: string
) => {
  try {
    const asset = await updateAsset(id, name, imgUrl, imgKey, categoryId);
    return asset;
  } catch (error) {
    handleError(error);
  }
};
