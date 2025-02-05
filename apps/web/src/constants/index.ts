export const baseUrl =
  process.env.NEXT_PUBLIC_API_HOST ?? "http://localhost:3001";

export const thumbnailCategories = [
  { label: "Simple", value: "simple" },
  { label: "Catchy", value: "catchy" },
  { label: "Vox", value: "vox" },
];

export const canvasScaleFactor = 0.7;

export const canvasDimensions = {
  width: 1000 * canvasScaleFactor,
  height: 420 * canvasScaleFactor
}
