import { Request, Response, NextFunction } from 'express';
import { ErrorWithStatus } from '../../types';
import { addBackgroundService } from '../background/service';
import {
  addAssetService,
  deleteAssetService,
  getAllAssetsService,
  getAssetsByCategoryService,
  updateAssetService,
} from './service';
import { HttpStatusCode } from '../../constants';

export const addAssetController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      const error: ErrorWithStatus = new Error('No file uploaded');
      error.status = 400;
      return next(error);
    }

    const { name, categoryId } = req.body;
    const imgUrl = (req.file as Express.MulterS3.File)?.location;
    const imgKey = (req.file as Express.MulterS3.File)?.key;

    const background = await addAssetService(name, imgUrl, imgKey, categoryId);

    res.status(201).json({ success: true, background });
  } catch (error) {
    return next(error);
  }
};

export const getAllAssetsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const assets = await getAllAssetsService();
    res.status(200).json({ success: true, assets });
  } catch (error) {
    next(error);
  }
};

export const getAssetByCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      const error: ErrorWithStatus = new Error('No category id provided');
      error.status = HttpStatusCode.BadRequest;
      return next(error);
    }
    const assets = await getAssetsByCategoryService(categoryId);
    res.status(HttpStatusCode.OK).json({ success: true, assets });
  } catch (error) {
    next(error);
  }
};

// delete asset controller
export const deleteAssetController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      const error: ErrorWithStatus = new Error('No asset id provided');
      error.status = HttpStatusCode.BadRequest;
      return next(error);
    }
    await deleteAssetService(id);
    res.status(HttpStatusCode.OK).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const updateAssetController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      const error: ErrorWithStatus = new Error('No asset id provided');
      error.status = HttpStatusCode.BadRequest;
      return next(error);
    }

    if (!req.file) {
      const error: ErrorWithStatus = new Error('No file uploaded');
      error.status = HttpStatusCode.BadRequest;
      return next(error);
    }

    const { name, categoryId } = req.body;
    const imgUrl = (req.file as Express.MulterS3.File)?.location;
    const imgKey = (req.file as Express.MulterS3.File)?.key;

    const asset = await updateAssetService(id, name, imgUrl, imgKey, categoryId);

    res.status(HttpStatusCode.OK).json({ success: true, asset });
  } catch (error) {
    next(error);
  }
};