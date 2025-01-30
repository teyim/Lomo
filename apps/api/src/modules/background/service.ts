import { addBackground } from "./data-access";
import { ErrorWithStatus } from "../../types/error";
import {
  getBackgroundByIdWithTemplates,
  deleteBackgroundById,
} from "./data-access";

import { ENV_variables, ErrorMessages, HttpStatusCode } from "../../constants";
import { handleError } from "../../utils/errors";
import { deleteS3Object } from "../../utils";

export const addBackgroundService = async (
  name: string,
  imgUrl: string,
  imgKey: string,
  recommendedColors: any,
) => {
  try {
    const background = await addBackground(name, imgUrl, imgKey, recommendedColors);
    return background;
  } catch (error) {
    handleError(error);
  }
};

export const deleteBackgroundService = async (id: string): Promise<void> => {
  try {
    // Check if background exists and get associated templates
    const background = await getBackgroundByIdWithTemplates(id);

    if (!background) {
      throw new ErrorWithStatus(
        ErrorMessages.BACKGROUND.NOT_FOUND,
        HttpStatusCode.NotFound,
      );
    }

    // Prevent deletion if templates exist
    if (background.templates.length > 0) {
      throw new ErrorWithStatus(
        ErrorMessages.BACKGROUND.DELETE_WITH_TEMPLATES,
        HttpStatusCode.BadRequest,
      );
    }


    // Delete from S3 and database
    const isDeleted = await deleteS3Object(ENV_variables.AWS_S3_BUCKET, background.imgKey);
    if (!!isDeleted) {
      await deleteBackgroundById(id);
    }
    else {
      throw new ErrorWithStatus(
        "Error deleting background in S3 Bucket ",
        500,
      );
    }

  } catch (error: any) {
    if (error instanceof ErrorWithStatus) throw error;
    throw new ErrorWithStatus(
      "Error deleting background: " + error.message,
      500,
    );
  }
};
