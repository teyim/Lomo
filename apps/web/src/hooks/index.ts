import { useRouter } from "next/navigation";
import { CanvasOptions, RouteParams } from "@/types";
import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { getFontWeight } from "@/lib/utils";

export const useDynamicNavigation = () => {
  const router = useRouter();

  const navigateToRoute = ({ slug, dynamicRouteName }: RouteParams) => {
    const url = `${dynamicRouteName}/${slug}`;
    router.push(url);
  };

  return { navigateToRoute };
};

export const useFabricCanvas = ({
  originalWidth,
  originalHeight,
  scaleFactor,
  backgroundColor,
}: CanvasOptions) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: backgroundColor,
      width: originalWidth,
      height: originalHeight,
      preserveObjectStacking: true,
      renderOnAddRemove: false,
    });

    canvasRef.current = canvas;

    // Cleanup canvas on unmount
    return () => {
      canvas.dispose();
    };
  }, [originalWidth, originalHeight]);

  // Function to add scaled objects to canvas
  const addScaledText = (
    text: string,
    fontSize: number,
    left: number,
    top: number,
    width: number,
    height: number,
    color: string,
    fontFamily: string,
    fontWeight: string
  ) => {
    if (!canvasRef.current) return;

    const scaledText = new fabric.Textbox(text, {
      fontSize: fontSize,
      left: left,
      top: top,
      width: width,
      height: height,
      fill: color,
      fontFamily: fontFamily,
      fontWeight: getFontWeight(fontWeight),
      textAlign: "center",
    });

    console.log(scaledText);
    canvasRef.current.add(scaledText);

    canvasRef.current.renderAll();
  };

  // Function to export canvas at original scale
  const exportCanvas = (): string | null => {
    if (!canvasRef.current) return null;

    const dataURL = canvasRef.current.toDataURL({
      format: "jpeg",
      quality: 1,
      multiplier: 1,
    });

    return dataURL;
  };

  return { canvasRef, addScaledText, exportCanvas };
};
