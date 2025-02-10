import { handleError } from '../../utils/errors';
import { addBackground } from '../background/data-access';
import { addAsset, getAllAssets, getAssetsByCategory } from './data-access';

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
