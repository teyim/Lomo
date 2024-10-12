import { PrismaClient } from "@prisma/client";
import { rgbToHex } from "../utils";
import { templates } from "../templates/templates"; // Import the templates array

const prisma = new PrismaClient();

// Extract text data from the Figma frame
const extractTextData = (frame: any): any[] => {
  return frame.children
    .filter((child: any) => child.type === "TEXT")
    .map((text: any) => ({
      type: "TEXT",
      label: text.name,
      positionX: text.x,
      positionY: text.y,
      width: text.width,
      height: text.height,
      defaultText: text.characters,
      fontSize: text.fontSize,
      color: text.fills[0]?.color
        ? rgbToHex(
            text.fills[0].color.r,
            text.fills[0].color.g,
            text.fills[0].color.b
          )
        : null,
      fontFamily: text.fontName?.family,
      fontWeight: text.fontName?.style,
    }));
};

// Get category ID by name
const getCategoryId = async (categoryName: string): Promise<string | null> => {
  try {
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });
    return category ? category.id : null;
  } catch (error) {
    console.error(`Error fetching category '${categoryName}':`, error);
    return null;
  }
};

// Seed categories into the database
const seedCategories = async (categories: string[]): Promise<void> => {
  try {
    for (const categoryName of categories) {
      await prisma.category.upsert({
        where: { name: categoryName },
        update: {},
        create: { name: categoryName },
      });
      console.log(`Created or found category: ${categoryName}`);
    }
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};

// Create a template with its assets (text elements)
const createTemplate = async (
  frameData: any,
  textData: any[]
): Promise<void> => {
  try {
    const categoryId = await getCategoryId(frameData.category);
    if (!categoryId)
      throw new Error(`Category not found: ${frameData.category}`);

    const template = await prisma.template.create({
      data: {
        name: frameData.name,
        width: frameData.width,
        height: frameData.height,
        img: "https://lomo-bucket.s3.eu-north-1.amazonaws.com/Frame+5.jpg", // You might want to update this
        backgroundColor: frameData.backgroundColor,
        categoryId: categoryId,
        assets: {
          create: textData,
        },
      },
    });
    console.log("Saved Template:", template);
  } catch (error) {
    console.error("Error creating template:", error);
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    const categories = ["Simple", "Catchy", "Vox"];

    // Seed categories
    await seedCategories(categories);

    // Process and save each template
    for (const figmaData of templates) {
      const frameData = {
        name: figmaData.name,
        width: figmaData.width,
        height: figmaData.height,
        backgroundColor: figmaData.fills[0]?.color
          ? rgbToHex(
              figmaData.fills[0].color.r,
              figmaData.fills[0].color.g,
              figmaData.fills[0].color.b
            )
          : null,
        category: figmaData.category,
      };

      const textData = extractTextData(figmaData);
      await createTemplate(frameData, textData);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the seeding process
seedDatabase().catch((error) => {
  console.error("Unexpected error during seeding:", error);
  process.exit(1);
});