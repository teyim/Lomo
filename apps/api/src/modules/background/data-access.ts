import { PrismaClient } from "@prisma/client";
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
