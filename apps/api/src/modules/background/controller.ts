import { NextFunction, Response, Request } from "express";
import { ErrorWithStatus } from "../../types";
import { addBackgroundService, deleteBackgroundService, getAllBackgroundsService, updateBackgroundService } from "./service";
import { HttpStatusCode } from "../../constants";

// add new background controller
export const addBackgroundController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      const error: ErrorWithStatus = new Error("No file uploaded");
      error.status = 400;
      return next(error);
    }

    const { recommendedColors, name } = req.body;
    const imgUrl = (req.file as Express.MulterS3.File)?.location;
    const imgKey = (req.file as Express.MulterS3.File)?.key;

    const background = await addBackgroundService(
      name,
      imgUrl,
      imgKey,
      recommendedColors,
    );

    res.status(201).json({ success: true, background });
  } catch (error) {
    return next(error);
  }
};


export const deleteBackgroundController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      const error: ErrorWithStatus = new Error("No id providedd");
      error.status = HttpStatusCode.BadRequest;
      return next(error);
    }
    await deleteBackgroundService(id);
    res.status(204).json({ message: "background deleted" });
  } catch (error) {
    next(error);
  }
};

export const getAllBackgroundsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { recommendedColors, name } = req.body;

    if (!id) {
      const error: ErrorWithStatus = new Error("No id provided");
      error.status = HttpStatusCode.BadRequest;
      return next(error);
    }

    const { file } = req;
    if (!file) {
      const error: ErrorWithStatus = new Error("No file uploaded");
      error.status = HttpStatusCode.BadRequest;
      return next(error);
    }

    const newImgUrl = (file as Express.MulterS3.File)?.location;
    const newImgKey = (file as Express.MulterS3.File)?.key;

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
