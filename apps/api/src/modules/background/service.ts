import { addBackground } from "./data-access";
import { ErrorWithStatus } from "../../types/error";
import { getBackgroundByIdWithTemplates, deleteBackgroundById } from "./data-access";

import { ENV_variables, ErrorMessages, HttpStatusCode } from "../../constants";
import { handleError } from "../../utils/errors";
import { deleteS3Object, getS3Key } from "../../utils";

export const addBackgroundService = async (
  name: string,
  imgUrl: string,
  recommendedColors: any
) => {
  try {
    const background = await addBackground(name, imgUrl, recommendedColors);
    return background;
  } catch (error) {
    handleError(error)
  }
};


export const deleteBackgroundService = async (id: string): Promise<void> => {
  try {
    // Check if background exists and get associated templates
    const background = await getBackgroundByIdWithTemplates(id);
    console.log(background)
    if (!background) {
      throw new ErrorWithStatus(ErrorMessages.BACKGROUND.NOT_FOUND, HttpStatusCode.NotFound);
    }

    // Prevent deletion if templates exist
    if (background.templates.length > 0) {
      throw new ErrorWithStatus(ErrorMessages.BACKGROUND.DELETE_WITH_TEMPLATES, HttpStatusCode.BadRequest);
    }

    // Extract S3 key from image URL
    const key = getS3Key(background.imageUrl, ENV_variables.AWS_S3_BUCKET);

    // Delete from S3 and database
    await deleteS3Object(ENV_variables.AWS_S3_BUCKET, key);
    await deleteBackgroundById(id);
  } catch (error:any) {
    if (error instanceof ErrorWithStatus) throw error;
    throw new ErrorWithStatus("Error deleting background: " + error.message, 500);
  }
};


