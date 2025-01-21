import { DatabaseActions } from "../types";

import dotenv from "dotenv";

dotenv.config();

// Map actions to error messages
export const errorMessages: Record<DatabaseActions, string> = {
  get: "fetching",
  create: "creating",
  update: "updating",
  delete: "deleting",
};

export const ENV_variables = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_REGION: process.env.AWS_REGION || "",
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || "",
};
