import { canvasAspectRatio, canvasDimensions } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFontWeight(fontWeightName: string): number {
  const fontWeightMap: { [key: string]: number } = {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  };

  return fontWeightMap[fontWeightName.toLowerCase()] || 400;
}



