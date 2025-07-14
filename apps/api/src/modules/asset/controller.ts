import { Request, Response, NextFunction } from 'express';
import { supabase } from '../../supabaseConfig';
import { ErrorWithStatus } from '../../types/error';
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
      const error = new ErrorWithStatus('No file uploaded', 400);
      return next(error);
    }

    const { name, categoryId } = req.body;
    // Upload to Supabase Storage
    const file = req.file;
    const filePath = `assets/${Date.now()}-${file.originalname}`;
    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file.buffer, { contentType: file.mimetype });
    if (uploadError) {
      return next(new ErrorWithStatus(uploadError.message, 500));
    }
    const imgKey = data.path;
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(imgKey);
    const imgUrl = publicUrlData.publicUrl;

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
      const error = new ErrorWithStatus('No category id provided', HttpStatusCode.BadRequest);
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
      const error = new ErrorWithStatus('No asset id provided', HttpStatusCode.BadRequest);
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
      const error = new ErrorWithStatus('No asset id provided', 400);
      return next(error);
    }

    if (!req.file) {
      const error = new ErrorWithStatus('No file uploaded', 400);
      return next(error);
    }

    const { name, categoryId } = req.body;
    // Upload to Supabase Storage
    const file = req.file;
    const filePath = `assets/${Date.now()}-${file.originalname}`;
    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file.buffer, { contentType: file.mimetype });
    if (uploadError) {
      return next(new ErrorWithStatus(uploadError.message, 500));
    }
    const imgKey = data.path;
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(imgKey);
    const imgUrl = publicUrlData.publicUrl;

    const asset = await updateAssetService(id, name, imgUrl, imgKey, categoryId);

    res.status(HttpStatusCode.OK).json({ success: true, asset });
  } catch (error) {
    next(error);
  }
};