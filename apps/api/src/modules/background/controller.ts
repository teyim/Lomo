import { NextFunction, Response, Request } from "express";
import { ErrorWithStatus } from "../../types";
import { addBackgroundService, deleteBackgroundService } from "./service";
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

//delete background by id
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
