import { ErrorWithStatus } from "../types/index";
import { Request, Response } from "express";

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response
): void => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR]: ${message} - Status Code: ${statusCode}`);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
