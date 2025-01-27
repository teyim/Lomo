import { HttpStatusCode } from "../constants";
import { ErrorWithStatus } from "../types/error";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.status || HttpStatusCode.InternalServerError;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
