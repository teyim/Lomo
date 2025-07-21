import { Asset } from '@prisma/client';
import { ENV_variables, HttpStatusCode } from '../../constants';
import { ErrorWithStatus } from '../../types/error';
import { deleteSupabaseObject } from '../../utils';
import { getDataAccessErrorMessage } from '../../utils/errors';
import { prisma } from '../../constants';

export const addAsset = async (
  name: string,
  imgUrl: string,
  imgKey: string,
  categoryId: string
) => {
  try {
    const existingAsset = await prisma.asset.findUnique({ where: { name: name } });

    if (existingAsset) {
      const isDeleted = await deleteSupabaseObject('images', imgKey);

      if (!!isDeleted) {
        throw new ErrorWithStatus(
          `Asset with name: "${existingAsset.name}" already exists`,
          HttpStatusCode.Conflict
        );
      } else {
        throw new ErrorWithStatus('Failed to delete S3 object', HttpStatusCode.InternalServerError);
      }
    }

    const asset = await prisma.asset.create({ data: { name, imgUrl, imgKey, categoryId } });
    return asset;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      if (error.message.startsWith('Asset with name')) {
        console.error(`Duplicate entry: ${error.message}`);
        throw new ErrorWithStatus(error?.message, error.status);
      }
    }

    // Generic error handling
    console.error(getDataAccessErrorMessage('asset', 'create'), error);
    throw new Error(getDataAccessErrorMessage('asset', 'create'));
  }
};

export const getAllAssets = async (): Promise<Asset[] | null> => {
  try {
    const assets = await prisma.asset.findMany();
    return assets;
  } catch (error) {
    console.error(getDataAccessErrorMessage('asset', 'get'), error);
    throw new Error(getDataAccessErrorMessage('asset', 'get'));
  }
};

export const getAssetsByCategory = async (categoryId: string): Promise<Asset[] | null> => {
  try {
    const assets = await prisma.asset.findMany({ where: { categoryId: categoryId } });
    return assets;
  } catch (error) {
    console.error(getDataAccessErrorMessage('asset', 'get'), error);
    throw new Error(getDataAccessErrorMessage('asset', 'get'));
  }
};

export const deleteAsset = async (id: string) => {
  try {
    const asset = await prisma.asset.findUnique({ where: { id } });

    if (!asset) {
      throw new ErrorWithStatus('Asset not found', HttpStatusCode.NotFound);
    }

    const isDeleted = await deleteSupabaseObject('images', asset.imgKey);

    if (!isDeleted) {
      throw new ErrorWithStatus('Failed to delete S3 object', HttpStatusCode.InternalServerError);
    }

    await prisma.asset.delete({ where: { id } });
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      if (error.message === 'Asset not found') {
        console.error('Asset not found');
        throw new ErrorWithStatus(error.message, error.status);
      }
    }

    console.error(getDataAccessErrorMessage('asset', 'delete'), error);
    throw new Error(getDataAccessErrorMessage('asset', 'delete'));
  }
};

export const updateAsset = async (
  id: string,
  name: string,
  imgUrl: string,
  imgKey: string,
  categoryId: string
) => {
  try {
    const asset = await prisma.asset.findUnique({ where: { id } });

    if (!asset) {
      throw new ErrorWithStatus('Asset not found', HttpStatusCode.NotFound);
    }

    const isDeleted = await deleteSupabaseObject('images', asset.imgKey);

    if (!isDeleted) {
      throw new ErrorWithStatus('Failed to delete S3 object', HttpStatusCode.InternalServerError);
    }

    const updatedAsset = await prisma.asset.update({
      where: { id },
      data: { name, imgUrl, imgKey, categoryId },
    });

    return updatedAsset;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      if (error.message === 'Asset not found') {
        console.error('Asset not found');
        throw new ErrorWithStatus(error.message, error.status);
      }
    }

    console.error(getDataAccessErrorMessage('asset', 'update'), error);
    throw new Error(getDataAccessErrorMessage('asset', 'update'));
  }
};
