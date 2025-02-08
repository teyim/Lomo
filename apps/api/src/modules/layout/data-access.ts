import { PrismaClient, Layout } from "@prisma/client";
import { getDataAccessErrorMessage } from "../../utils/errors";
const prisma = new PrismaClient();

export const fetchAllLayouts = async () => {
  try {
    const layouts = await prisma.layout.findMany({
      include: { elements: true },
    });
    return layouts;
  } catch (error) {
    console.error(getDataAccessErrorMessage("layouts", "get"), error);
    throw new Error(getDataAccessErrorMessage("layouts", "get"));
  }
};
