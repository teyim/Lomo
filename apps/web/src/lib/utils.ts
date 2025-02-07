import { lexend, lekton } from "@/app/layout";
import { canvasDimensions } from "@/constants";
import { useBlogThumbnailStore } from "@/store";
import { SupportedFonts } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { Canvas } from "fabric";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

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

export const scaleCanvas = (canvas: Canvas, scaleFactor: { canvas: number, text: number }) => {
  // Scale each object on the canvas
  canvas.forEachObject((obj: any) => {
    console.log(obj)
    obj.scaleX *= scaleFactor.text;
    obj.scaleY *= scaleFactor.text;
    obj.left *= scaleFactor.text;
    obj.top *= scaleFactor.text;

    if ('fontSize' in obj) {
      obj.set({
        fontSize: (obj.fontSize as number) * scaleFactor.text,
        width: (obj.width as number) * scaleFactor.text,
        height: (obj.height as number) * scaleFactor.text,
      });
    }

    obj.setCoords();
  });

  // Scale the canvas dimensions
  canvas.width = canvas.getWidth() * scaleFactor.canvas
  canvas.height = canvas.getHeight() * scaleFactor.canvas

  canvas.renderAll();
};


// Function to calculate scale factor based on screen width
export const calculateScaleFactor = (screenWidth: number) => {
  const largeScreenBreakpoint = 1300; // Adjust as needed
  if (screenWidth >= largeScreenBreakpoint) {
    return { canvas: 1, text: 1 }
  }
  else if (screenWidth >= canvasDimensions.width && screenWidth <= largeScreenBreakpoint) {
    return { canvas: 0.8, text: 0.9 }
  }

  return { canvas: 0.6, text: 0.8 }

};

export const constainsSubstring = (substring: string, mainString: string) => {
  const regex = new RegExp(substring, 'i');
  return regex.test(mainString);
}



