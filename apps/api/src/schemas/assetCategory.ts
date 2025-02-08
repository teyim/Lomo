
import { z } from "zod";

export const createAssetCategorySchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name cannot exceed 100 characters")
        .transform((val) => val.trim()),
});

export const deleteAssetCategorySchema = z.object({
    id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Must be a valid MongoDB ObjectId")
        .transform((val) => val.trim()),
});

export type CreateAssetCategoryInput = z.infer<typeof createAssetCategorySchema>;