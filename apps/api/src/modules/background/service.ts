import { addBackground } from "./data-access";

export const addBackgroundService = async (
  name: string,
  imgUrl: string,
  recommendedColors: any
) => {
  try {
    const background = await addBackground(name, imgUrl, recommendedColors);
    return background;
  } catch (error) {
    throw new Error("Error adding background in service layer");
  }
};
