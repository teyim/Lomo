export const baseUrl =
  process.env.NEXT_PUBLIC_API_HOST ?? "http://localhost:3001";

export const thumbnailCategories = [
  { label: "Simple", value: "simple" },
  { label: "Catchy", value: "catchy" },
  { label: "Vox", value: "vox" },
];

export const defaultScaleFactor = { canvas: 1, text: 1 }


export const canvasDimensions = {
  width: 1000,
  height: 420
}

export const supportedFonts = ["lekton", "lexend"] as const;
