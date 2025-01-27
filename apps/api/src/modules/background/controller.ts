import { NextFunction, Response, Request } from "express";
import { ErrorWithStatus } from "../../types";
import { addBackgroundService, deleteBackgroundService } from "./service";
import { HttpStatusCode } from "../../constants";

// add new background controller
export const addBackgroundController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      const error: ErrorWithStatus = new Error("No file uploaded");
      error.status = 400;
      return next(error);
    }

    const { recommendedColors, name } = req.body;
    const imgUrl = (req.file as Express.MulterS3.File)?.location;
    
    console.log(imgUrl)

    console.log("file", req.file);

    console.log("imgurl", imgUrl);

    const background = await addBackgroundService(
      name,
      imgUrl,
      recommendedColors
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
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      const error: ErrorWithStatus = new Error("No id providedd");
      error.status = HttpStatusCode.BadRequest;
      return next(error);
    }
    await deleteBackgroundService(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};