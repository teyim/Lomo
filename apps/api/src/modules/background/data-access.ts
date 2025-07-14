import { Background } from '@prisma/client';
import { getDataAccessErrorMessage } from '../../utils/errors';
import { ENV_variables, HttpStatusCode } from '../../constants';
import { deleteSupabaseObject } from '../../utils';
import { ErrorWithStatus } from '../../types/error';
import { prisma } from '@repo/db';

export const addBackground = async (
  name: string,
  imgUrl: string,
  imgkey: string,
  recommendedColors: string
) => {
  try {
    const existingBackground = await prisma.background.findUnique({ where: { name } });

    if (existingBackground?.id) {
      const isDeleted = await deleteSupabaseObject('images', imgkey);

      if (!!isDeleted) {
        throw new ErrorWithStatus(
          `Background with name: "${existingBackground.name}" already exists`,
          HttpStatusCode.Conflict
        );
      } else {
        throw new ErrorWithStatus('Failed to delete S3 object', HttpStatusCode.InternalServerError);
      }
    }
    // Validate and parse recommendedColors
    let parsedColors = {};
    if (recommendedColors) {
      try {
        parsedColors = JSON.parse(recommendedColors);
        console.log(parsedColors);
      } catch (parseError: any) {
        throw new ErrorWithStatus(
          `Invalid recommendedColors format: ${parseError?.message}`,
          HttpStatusCode.BadRequest
        );
      }
    }

    const background = await prisma.background.create({
      data: { name: name, imageUrl: imgUrl, imgKey: imgkey, recommendedColors: parsedColors },
    });
    return background;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      if (error.message.startsWith('Background with name')) {
        console.error(`Duplicate entry: ${error.message}`);
        throw new ErrorWithStatus(error?.message, error.status);
      }

      if (error.message.startsWith('Invalid recommendedColors')) {
        console.error(`JSON Parse Error: ${error.message}`);
        throw new Error(
          'Invalid color format. Please provide valid JSON format for recommended colors'
        );
      }
    }

    // Generic error handling
    console.error(getDataAccessErrorMessage('background', 'create'), error);
    throw new Error(getDataAccessErrorMessage('background', 'create'));
  }
};

export const getBackgroundByIdWithTemplates = async (id: string): Promise<Background | null> => {
  try {
    const background = await prisma.background.findUnique({
      where: { id },
    });
    return background;
  } catch (error) {
    console.error(getDataAccessErrorMessage('background', 'get'), error);
    throw new Error(getDataAccessErrorMessage('background', 'get'));
  }
};

export const getAllBackgrounds = async (): Promise<Background[] | null> => {
  try {
    const backgrounds = await prisma.background.findMany();
    return backgrounds;
  } catch (error) {
    console.error(getDataAccessErrorMessage('background', 'get'), error);
    throw new Error(getDataAccessErrorMessage('background', 'get'));
  }
};

export const deleteBackgroundById = async (id: string): Promise<void> => {
  try {
    await prisma.background.delete({ where: { id } });
  } catch (error) {
    console.error(getDataAccessErrorMessage('background', 'delete'), error);
    throw new Error(getDataAccessErrorMessage('background', 'delete'));
  }
};

export const updateBackground = async (
  id: string,
  name: string,
  newImgUrl: string,
  newImgKey: string,
  recommendedColors: string
) => {
  try {
    // Get existing background
    const existingBackground = await prisma.background.findUnique({ where: { id } });

    if (!existingBackground) {
      throw new ErrorWithStatus('Background not found', HttpStatusCode.NotFound);
    }

    // Delete existing image from Supabase
    const isDeleted = await deleteSupabaseObject('images', existingBackground.imgKey);

    // Validate and parse recommendedColors
    let parsedColors = {};
    if (recommendedColors) {
      try {
        parsedColors = JSON.parse(recommendedColors);
        console.log(parsedColors);
      } catch (parseError: any) {
        throw new ErrorWithStatus(
          `Invalid recommendedColors format: ${parseError?.message}`,
          HttpStatusCode.BadRequest
        );
      }
    }

    if (!!isDeleted) {
      // Update background with new image
      const updatedBackground = await prisma.background.update({
        where: { id },
        data: {
          name: name,
          imageUrl: newImgUrl,
          imgKey: newImgKey,
          recommendedColors: parsedColors,
        },
      });
      return updatedBackground;
    } else {
      throw new ErrorWithStatus(
        'Failed to delete old image from S3',
        HttpStatusCode.InternalServerError
      );
    }
  } catch (error) {
    console.error(getDataAccessErrorMessage('background', 'update'), error);
    throw new Error(getDataAccessErrorMessage('background', 'update'));
  }
};
