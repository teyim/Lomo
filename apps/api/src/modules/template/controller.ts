/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { getTemplatesService } from './service';
import { fetchTemplateById } from './data-access';
import { ErrorWithStatus } from '../../types/index';

// get all templates controller
export const getTemplatesController = async (
  req,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const templates = await getTemplatesService();
    res.status(200).json(templates);
  } catch (error) {
    return next(error);
  }
};

export const getTemplateByIdController = async (
  req,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const template = await fetchTemplateById(id);

  // If template not found, propagate a 404 error
  if (!template) {
    const error: ErrorWithStatus = new Error('Template not found');
    error.status = 404;
    return next(error);
  }

  // If template found, return it
  res.status(200).json(template);
};
