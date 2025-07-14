import { NextFunction, Response, Request } from "express";
import { ErrorWithStatus } from '../../types/error';
import {
  addBackgroundService,
  deleteBackgroundService,
  getAllBackgroundsService,
  updateBackgroundService,
} from './service';
import { HttpStatusCode } from '../../constants';
import { supabase } from '../../supabaseConfig';

// add new background controller
export const addBackgroundController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      const error = new ErrorWithStatus('No file uploaded', 400);
      return next(error);
    }

    const { recommendedColors, name } = req.body;
    // Upload to Supabase Storage
    const file = req.file;
    const filePath = `backgrounds/${Date.now()}-${file.originalname}`;
    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file.buffer, { contentType: file.mimetype });
    if (uploadError) {
      return next(new ErrorWithStatus(uploadError.message, 500));
    }
    const imgKey = data.path;
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(imgKey);
    const imgUrl = publicUrlData.publicUrl;

    const background = await addBackgroundService(name, imgUrl, imgKey, recommendedColors);

    res.status(201).json({ success: true, background });
  } catch (error) {
    return next(error);
  }
};

export const deleteBackgroundController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new ErrorWithStatus('No id provided', HttpStatusCode.BadRequest);
      return next(error);
    }
    await deleteBackgroundService(id);
    res.status(204).json({ message: 'background deleted' });
  } catch (error) {
    next(error);
  }
};

export const getAllBackgroundsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const backgrounds = await getAllBackgroundsService();
    res.status(200).json({ success: true, backgrounds });
  } catch (error) {
    next(error);
  }
};

export const updateBackgroundController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { recommendedColors, name } = req.body;

    if (!id) {
      const error = new ErrorWithStatus('No id provided', HttpStatusCode.BadRequest);
      return next(error);
    }

    const { file } = req;
    if (!file) {
      const error = new ErrorWithStatus('No file uploaded', HttpStatusCode.BadRequest);
      return next(error);
    }

    // Upload new file to Supabase Storage
    const filePath = `backgrounds/${Date.now()}-${file.originalname}`;
    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file.buffer, { contentType: file.mimetype });
    if (uploadError) {
      return next(new ErrorWithStatus(uploadError.message, 500));
    }
    const newImgKey = data.path;
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(newImgKey);
    const newImgUrl = publicUrlData.publicUrl;

    const updatedBackground = await updateBackgroundService(
      id,
      name,
      newImgUrl,
      newImgKey,
      recommendedColors
    );

    res.status(200).json({ success: true, updatedBackground });
  } catch (error) {
    next(error);
  }
};
