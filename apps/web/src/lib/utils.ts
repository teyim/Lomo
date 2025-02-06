import { lexend, lekton } from "@/app/layout";
import { SupportedFonts } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOptimisedFontFamilyByName = (fontName: SupportedFonts): string => {
  const fontFamilyMap = {
    lexend: lexend.style.fontFamily,
    lekton: lekton.style.fontFamily,
  };
  console.log(fontFamilyMap[fontName])
  return fontFamilyMap[fontName] || 'sans-serif'; // Fallback to a generic font family
};



