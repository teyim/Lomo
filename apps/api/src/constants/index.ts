import { DatabaseActions } from '../types';
import { PrismaClient } from '@repo/db';

import dotenv from 'dotenv';

dotenv.config();

export const prisma = new PrismaClient();

export const crudErrorMessages: Record<DatabaseActions, string> = {
  get: 'fetching',
  create: 'creating',
  update: 'updating',
  delete: 'deleting',
};

// src/constants/errorMessages.ts
export const ErrorMessages = {
  BACKGROUND: {
    NOT_FOUND: 'Background not found',
    DELETE_WITH_TEMPLATES: 'Cannot delete background with associated templates',
    INVALID_IMAGE: 'Invalid image file format',
  },
  ASSET_CATEGORY: {
    EXIST: (name: string) => `asset category with name "${name}" already exist`,
    NOT_FOUND: 'asset category not found',
  },
  DATABASE: { CONNECTION: 'Database connection error', OPERATION: 'Database operation failed' },
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
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
};


