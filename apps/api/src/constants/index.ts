import { DatabaseActions } from "../types";

import dotenv from "dotenv";

dotenv.config();

export const crudErrorMessages: Record<DatabaseActions, string> = {
  get: "fetching",
  create: "creating",
  update: "updating",
  delete: "deleting",
};

// src/constants/errorMessages.ts
export const ErrorMessages = {
  BACKGROUND: {
    NOT_FOUND: "Background not found",
    DELETE_WITH_TEMPLATES: "Cannot delete background with associated templates",
    INVALID_IMAGE: "Invalid image file format",
  },
  ASSET_CATEGORY: {
    EXIST: (name: string) => `asset category with name "${name}" already exist`,
    NOT_FOUND: "asset category not found",
  },
  DATABASE: {
    CONNECTION: "Database connection error",
    OPERATION: "Database operation failed",
  },
  AWS: {
    S3_UPLOAD: "Failed to upload file to S3",
    S3_DELETE: "Failed to delete file from S3",
  },
} as const;

export enum HttpStatusCode {
  // Success
  OK = 200,
  Created = 201,
  NoContent = 204,

  // Client Errors
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,

  // Server Errors
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export const ENV_variables = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_REGION: process.env.AWS_REGION || "",
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || "",
};
