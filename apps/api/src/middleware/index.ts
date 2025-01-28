import { PrismaClient } from "@repo/db";
import { NextFunction,Request,Response } from "express";
import { HttpStatusCode } from "../constants";

const prisma = new PrismaClient();

export const checkBackgroundExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body)
    const { name } = req.body;

    if (!name) {
      res.status(HttpStatusCode.BadRequest).json({ success: false, message: "Name is required" });
      return
    }

    const existingBackground = await prisma.background.findUnique({
      where: { name },
    });

    if (existingBackground) {
      res
        .status(HttpStatusCode.BadRequest)
        .json({ success: false, message: `Background with name '${name}' already exists` });
        return
    }

    // Proceed to the next middleware if no background exists
    next();
  } catch (error:any) {
    console.error("Error checking background existence:", error.message);
    next(error); // Pass the error to the global error handler
  }
};