import { PrismaClient, Template } from "@prisma/client";
import { Background } from "@prisma/client";
import { getDataAccessErrorMessage } from "../../utils/errors";

const prisma = new PrismaClient();

export const addBackground = async (
  name: string,
  imgUrl: string,
  recommendedColors: string
) => {
  try {
    const background = await prisma.background.create({
      data: {
        name: name,
        imageUrl: imgUrl,
        recommendedColors: recommendedColors
          ? JSON.parse(recommendedColors)
          : {},
      },
    });
    return background;
  } catch (error) {
    console.error(getDataAccessErrorMessage("background", "create"), error);
    throw new Error(getDataAccessErrorMessage("background", "create"));
  }
};

export const getBackgroundByIdWithTemplates = async (
  id: string
): Promise<(Background & { templates: Template[] }) | null> => {
  try {
    const background = await prisma.background.findUnique({
      where: { id },
      include: { templates: true },
    });
    return background
  } catch (error) {
    console.error(getDataAccessErrorMessage("background", "get"), error);
    throw new Error(getDataAccessErrorMessage("background", "get"));
  }
};

export const deleteBackgroundById = async (id: string): Promise<void> => {
  try {
    await prisma.background.delete({ where: { id } });
  } catch (error) {
    console.error(getDataAccessErrorMessage("background", "delete"), error);
    throw new Error(getDataAccessErrorMessage("background", "delete"));
  }
};
