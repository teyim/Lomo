import {z} from "zod"

export const deleteBackgroundSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Background ID is required",
      invalid_type_error: "Background ID must be a string",
    }).min(1, "Background ID cannot be empty")
  })
});